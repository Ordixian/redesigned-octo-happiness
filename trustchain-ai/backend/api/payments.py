
from fastapi import APIRouter, Form

router = APIRouter()

@router.post("/initiate")
async def initiate_payment(
    email: str = Form(...),
    amount: float = Form(...),
    verification_id: str = Form(...)
):
    return {
        "status": 200,
        "message": "Payment initialized",
        "data": {
            "checkout_url": "https://sandbox.squadco.com/"
        }
    }
