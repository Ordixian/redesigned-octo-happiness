
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

    if not product.get("is_nafdac_valid"):
        score -= 35
        flags.append(
            "Invalid or unverified NAFDAC registration"
        )

    if product.get("price") < (
        product.get("market_avg", 0) * 0.6
    ):
        score -= 20
        flags.append(
            "Price significantly below market average"
        )

    if not vendor.get("is_cac_registered"):
        score -= 20
        flags.append(
            "Vendor not found in CAC registry"
        )

    score = max(0, min(score, 100))

    if score >= 80:
        level = "LOW"
        verdict = "Likely Genuine"
    elif score >= 60:
        level = "MEDIUM"
        verdict = "Proceed with caution"
    else:
        level = "HIGH"
        verdict = "Fraud likely"

    return RiskResult(
        score=score,
        level=level,
        flags=flags,
        verdict=verdict
    )
