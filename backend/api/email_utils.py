import smtplib
from email.message import EmailMessage

# Set this securely via environment variables in production
EMAIL_ADDRESS = "your_email@gmail.com"
EMAIL_PASSWORD = "your_app_password"

def send_email_notification(name, email, message):
    msg = EmailMessage()
    msg['Subject'] = f'New Form Submission from {name}'
    msg['From'] = EMAIL_ADDRESS
    msg['To'] = 'your_email@gmail.com'

    msg.set_content(
        f"Name: {name}\nEmail: {email}\nMessage:\n{message}"
    )

    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        smtp.send_message(msg)
