# app/core/config.py

import os
from dotenv import load_dotenv
from pydantic_settings import BaseSettings
from typing import List

# Load environment variables from .env
load_dotenv()


class Settings(BaseSettings):
    # =========================================
    # APP SETTINGS
    # =========================================
    PROJECT_NAME: str = "TrustChain AI"
    VERSION: str = "1.0.0"
    APP_ENV: str = os.getenv("APP_ENV", "development")

    # =========================================
    # SQUAD PAYMENT SETTINGS
    # =========================================
    SQUAD_SECRET_KEY: str = os.getenv("SQUAD_SECRET_KEY", "")
    SQUAD_BASE_URL: str = "https://sandbox-api-d.squadco.com"

    # =========================================
    # DATABASE SETTINGS
    # =========================================
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "sqlite:///./trustchain.db"
    )

    # =========================================
    # FILE UPLOAD SETTINGS
    # =========================================
    MAX_UPLOAD_SIZE: int = 5 * 1024 * 1024  # 5MB

    ALLOWED_EXTENSIONS: List[str] = [
        "jpg",
        "jpeg",
        "png"
    ]

    # =========================================
    # PYDANTIC CONFIG
    # =========================================
    class Config:
        case_sensitive = True


# Global settings object
settings = Settings()