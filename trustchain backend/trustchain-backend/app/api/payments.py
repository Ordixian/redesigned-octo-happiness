# app/api/payments.py

from fastapi import APIRouter, HTTPException, Form
import httpx
from app.core.config import settings

router = APIRouter()

SQUAD_URL = f"{settings.SQUAD_BASE_URL}/transaction/initiate"


@router.post("/initiate")
async def initiate_payment(
    email: str = Form(...),
    amount: float = Form(...),
    verification_id: str = Form(...)
):
    if not settings.SQUAD_SECRET_KEY:
        raise HTTPException(
            status_code=500,
            detail="Squad API key missing"
        )

    headers = {
        "Authorization": f"Bearer {settings.SQUAD_SECRET_KEY}",
        "Content-Type": "application/json",
    }

    payload = {
        "amount": int(amount * 100),
        "email": email,
        "currency": "NGN",
        "initiate_type": "inline",
        "metadata": {
            "verification_id": verification_id
        },
    }

    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                SQUAD_URL,
                json=payload,
                headers=headers,
                timeout=30.0
            )

        response_data = response.json()

        if response.status_code not in [200, 201]:
            raise HTTPException(
                status_code=response.status_code,
                detail=response_data
            )

        return response_data

    except httpx.RequestError as e:
        raise HTTPException(
            status_code=500,
            detail=f"Payment gateway connection failed: {str(e)}"
        )