import os
import time
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from dotenv import load_dotenv

from app.api import verify, payments

load_dotenv()

app = FastAPI(
    title="TrustChain AI Core",
    description="Product & Vendor Verification Engine",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.middleware("http")
async def add_process_time_header(request: Request, call_next):
    start_time = time.time()
    response = await call_next(request)
    process_time = time.time() - start_time
    response.headers["X-Process-Time"] = str(process_time)
    return response

@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=500,
        content={
            "error": "Internal Server Error",
            "message": str(exc),
            "path": request.url.path
        }
    )

app.include_router(verify.router, prefix="/api/v1/verify", tags=["Verification"])
app.include_router(payments.router, prefix="/api/v1/payments", tags=["Payments"])

@app.get("/", tags=["System"])
async def health_check():
    squad_status = "Active" if os.getenv("SQUAD_SECRET_KEY") else "Key Missing"
    return {
        "project": "TrustChain AI",
        "status": "Operational",
        "squad_gateway": squad_status,
        "timestamp": time.time()
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)