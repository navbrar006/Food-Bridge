# 🍱 Smart Food Donation Platform

A full-stack system that connects food donors with NGOs using AI-based shelf-life prediction and smart location-based matching.



## 🚀 Features

- 🍲 Food donation system
- 🤖 ML-based shelf life prediction
- 📍 Location-based NGO matching
- ⚠ Risk classification (Low / Medium / High)
- 📦 Donation tracking & status updates



## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose

### ML Service
- Python
- FastAPI
- Scikit-learn

---

## 📂 Project Structure


smart-food-platform/
│
├── backend/
│ ├── controllers/
│ ├── routes/
│ ├── models/
│ └── server.js
│
├── ml-service/
│ ├── main.py
│ └── model.py
│
└── README.md


---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/smart-food-platform.git
cd smart-food-platform
▶️ Run Backend
cd backend
npm install
nodemon server.js

Backend runs on:
👉 http://localhost:5000

🤖 Run ML Service
cd ml-service
pip install -r requirements.txt
uvicorn main:app --reload --port 8000

ML Service runs on:
👉 http://127.0.0.1:8000

🔗 API Endpoints
Create Donation

POST /api/donations

Get All Donations

GET /api/donations

Get Sorted Donations

GET /api/donations/sorted

Update Status

PUT /api/donations/:id/status