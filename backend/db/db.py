from motor.motor_asyncio import AsyncIOMotorClient
import os

# Replace with your MongoDB URI
MONGO_URI = os.getenv("MONGO_URI", "mongodb+srv://<username>:<password>@cluster.mongodb.net/mydatabase?retryWrites=true&w=majority")

client = AsyncIOMotorClient(MONGO_URI)
db = client["business_press_db"]
collection = db["form_submissions"]
