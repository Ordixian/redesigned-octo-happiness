import os
import httpx
from fastapi import APIRouter, Form, HTTPException

router = APIRouter()

# Squad Sandbox URL
SQUAD_URL = "https://sandbox-api-d.squadco.com/transaction/initiate"
# This comes from the Render Environment Variable you set earlier
SQUAD_SECRET_KEY = os.getenv("SQUAD_SECRET_KEY")

@router.post("/initiate")
async def initiate_payment(
    email: str = Form(...),
    amount: float = Form(...),
    verification_id: str = Form(...)
):
    if not SQUAD_SECRET_KEY:
        raise HTTPException(status_code=500, detail="Squad Secret Key not configured")

    headers = {
        "Authorization": f"Bearer {SQUAD_SECRET_KEY}",
        "Content-Type": "application/json"
    }

    # Squad expects the amount in Kobo (multiply by 100)
    payload = {
        "amount": int(amount * 100),
        "email": email,
        "currency": "NGN",
        "initiate_type": "inline",
        "callback_url": "https://trustchain-ai-one.vercel.app/dashboard",
        "metadata": {"verification_id": verification_id}
    }

    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(SQUAD_URL, json=payload, headers=headers)
            res_data = response.json()

            if response.status_code == 200:
                return {
                    "status": 200,
                    "message": "Payment initialized",
                    "data": {
                        "checkout_url": res_data['data']['checkout_url']
                    }
                }
            else:
                raise HTTPException(status_code=400, detail=res_data.get("message", "Squad API Error"))
        
        except Exception as e:
            raise HTTPException(status_code=500, detail=str(e))
