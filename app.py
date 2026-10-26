from flask import Flask, render_template, request, jsonify
import requests
 
app = Flask(__name__)
 
@app.route("/")
def home():
    return render_template("index.html")
 
@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
 
    r = requests.post("http://localhost:11434/api/chat", json={
        "model": "gemma3:4b",
        "messages": data["messages"],
        "stream": False
    })
 
    return jsonify({"response": r.json()["message"]["content"]})
 
app.run()
 