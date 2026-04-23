from fastapi import FastAPI
from model import predict

app = FastAPI()

@app.post("/predict")
def get_prediction(data: dict):
    try:
        food_type = float(data["food_type"])
        temperature = float(data["temperature"])

        result = predict(food_type, temperature)

        return {"prediction": result}

    except Exception as e:
        return {"error": str(e)}