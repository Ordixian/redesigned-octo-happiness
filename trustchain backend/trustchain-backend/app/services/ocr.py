import pytesseract
from PIL import Image

def extract_label_text(image_path: str):
    """
    Lightweight OCR using Tesseract (No PyTorch required).
    """
    try:
        # Open the image using Pillow
        img = Image.open(image_path)
        # Extract text
        text = pytesseract.image_to_string(img)
        return text.upper()
    except Exception as e:
        print(f"OCR Error: {e}")
        return ""
