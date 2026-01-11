from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

API_KEY = "56bb8c78d92cf7590d539b001d15bb93"

@app.route("/weather")
def weather():
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City required"}), 400

    url = "https://api.openweathermap.org/data/2.5/weather"
    params = {"q": city, "appid": API_KEY, "units": "metric"}
    data = requests.get(url, params=params).json()

    if data.get("cod") != 200:
        return jsonify({"error": "City not found"}), 404

    return jsonify({
        "city": city,
        "temperature": data["main"]["temp"],
        "humidity": data["main"]["humidity"],
        "wind": data["wind"]["speed"],
        "condition": data["weather"][0]["description"]
    })

if __name__ == "__main__":
    app.run(debug=True)