from fastapi import APIRouter, UploadFile, File, Form
from app.core.scoring import calculate_trust_score

router = APIRouter()

@router.post("/run")
async def verify_submission(
    product_name: str = Form(...),
    nafdac_no: str = Form(...),
    price: float = Form(...),
    vendor_name: str = Form(...),
    image: UploadFile = File(...)
):
    # Simple mock validation
    is_nafdac_valid = nafdac_no.startswith("A7")

    mock_product_data = {
        "is_nafdac_valid": is_nafdac_valid,
        "price": price,
        "market_avg": 5000,
        "expiry_status": "active"
    }

    mock_vendor_data = {
        "years_in_business": 2,
        "complaint_count": 0,
        "is_cac_registered": True
    }

    analysis = calculate_trust_score(
        mock_product_data,
        mock_vendor_data
    )

    return {
        "id": "TRC-DEMO",
        "product_name": product_name,
        "vendor_name": vendor_name,
        "analysis": analysis.dict()
    }