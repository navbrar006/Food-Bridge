from sklearn.linear_model import LinearRegression
import numpy as np

# Dummy training data
# [food_type, temperature]
X = np.array([
    [1, 30],
    [2, 25],
    [3, 20],
    [1, 35],
    [2, 28],
    [3, 22]
])

# shelf life (hours)
y = np.array([5, 4, 3, 4, 3.5, 2.5])

model = LinearRegression()
model.fit(X, y)

def predict(food_type, temp):
    food_type = float(food_type)   # 🔥 force numeric
    temp = float(temp)

    result = model.predict([[food_type, temp]])
    return float(result[0])