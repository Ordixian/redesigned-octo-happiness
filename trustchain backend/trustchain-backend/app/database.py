from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

load_dotenv()

# We pull the URL from the .env file
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./trustchain.db")

# The engine is the actual connection to the database
# "check_same_thread" is only needed for SQLite
if SQLALCHEMY_DATABASE_URL.startswith("sqlite"):
    engine = create_engine(
        SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
    )
else:
    engine = create_engine(SQLALCHEMY_DATABASE_URL)

# This class will be used to create database sessions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# This is the base class for our database models (the tables)
Base = declarative_base()

# Dependency: This opens a connection when an API call starts and closes it when done
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()