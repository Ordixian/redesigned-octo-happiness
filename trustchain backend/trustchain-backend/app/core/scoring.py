from pydantic import BaseModel
from typing import List

class RiskResult(BaseModel):
    score: int
    level: str
    flags: List[str]
    verdict: str

def calculate_trust_score(product: dict, vendor: dict) -> RiskResult:
    score = 100
    flags = []

    # Product Logic
    if not product.get("is_nafdac_valid"):
        score -= 35
        flags.append("Invalid or unverified NAFDAC registration")
    
    if product.get("price") < (product.get("market_avg", 0) * 0.6):
        score -= 20
        flags.append("Price significantly below market average")
        
    if product.get("expiry_status") == "expired":
        score -= 40
        flags.append("Product is past its expiration date")

    # Vendor Logic
    if vendor.get("years_in_business", 0) < 1:
        score -= 15
        flags.append("Vendor has less than 1 year of verified history")
        
    if vendor.get("complaint_count", 0) > 2:
        score -= 25
        flags.append("Multiple unresolved consumer complaints detected")

    if not vendor.get("is_cac_registered"):
        score -= 20
        flags.append("Vendor not found in CAC business registry")

    # Final Calculation
    score = max(0, min(score, 100))
    
    if score >= 80:
        level = "LOW"
        verdict = "Likely Genuine"
    elif score >= 60:
        level = "MEDIUM"
        verdict = "Suspicious - Proceed with Caution"
    else:
        level = "HIGH"
        verdict = "High Risk - Fraud Likely"

    return RiskResult(score=score, level=level, flags=flags, verdict=verdict)