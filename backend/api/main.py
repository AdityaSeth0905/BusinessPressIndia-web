from fastapi import FastAPI, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from models import ContactForm
from email_utils import send_email_notification
from db import collection

app = FastAPI()

# Allow frontend access
origins = ["https://www.businesspressindia.com", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/submit-form")
async def submit_form(request: Request):
    form_data = await request.form()

    try:
        data = ContactForm(
            name=form_data["name"],
            email=form_data["email"],
            message=form_data["message"]
        )
    except Exception as e:
        return JSONResponse(content={"success": False, "message": str(e)}, status_code=422)

    # Save to MongoDB
    try:
        await collection.insert_one(data.dict())
    except Exception as e:
        return JSONResponse(content={"success": False, "message": f"DB Error: {str(e)}"}, status_code=500)

    # Send email
    try:
        send_email_notification(data.name, data.email, data.message)
    except Exception as e:
        return JSONResponse(content={"success": False, "message": f"Email Error: {str(e)}"}, status_code=500)

    return {"success": True, "message": "Form submitted and stored successfully!"}
