import os
import re

from flask import Flask, jsonify, render_template, request

app = Flask(__name__)

DB_CONFIG = {
    "host": os.getenv("DB_HOST", "localhost"),
    "user": os.getenv("DB_USER", "root"),
    "password": os.getenv("DB_PASSWORD", ""),
    "database": os.getenv("DB_NAME", "campaign_db"),
}
EMAIL_RE = re.compile(r"^[^@\s]+@[^@\s]+\.[^@\s]+$")


def get_connection():
    import mysql.connector  # imported here so pages still load without a DB driver
    return mysql.connector.connect(**DB_CONFIG)


@app.get("/")
def home():
    return render_template("index.html", active="home")


@app.get("/offers")
def offers():
    return render_template("offers.html", active="offers")


@app.get("/about")
def about():
    return render_template("about.html", active="about")


@app.get("/contact")
def contact():
    return render_template("contact.html", active="contact")


@app.post("/api/leads")
def create_lead():
    data = request.get_json(silent=True) or {}
    name = (data.get("name") or "").strip()
    email = (data.get("email") or "").strip()
    message = (data.get("message") or "").strip()

    errors = {}
    if len(name) < 2:
        errors["name"] = "Please enter your name."
    if not EMAIL_RE.match(email):
        errors["email"] = "Please enter a valid email."
    if len(message) < 5:
        errors["message"] = "Message must be at least 5 characters."
    if errors:
        return jsonify(errors=errors), 400

    try:
        conn = get_connection()
        cur = conn.cursor()
        cur.execute(
            "INSERT INTO leads (name, email, message) VALUES (%s, %s, %s)",
            (name, email, message),
        )
        conn.commit()
        cur.close()
        conn.close()
    except Exception:
        return jsonify(error="Could not save your message. Please try again."), 500

    return jsonify(message="Thanks! We will get back to you soon."), 201





@app.get("/leads")
def leads():
    try:
        conn = get_connection()
        cur = conn.cursor(dictionary=True)
        cur.execute("SELECT id, name, email, message, created_at FROM leads ORDER BY created_at DESC")
        rows = cur.fetchall()
        cur.close()
        conn.close()
    except Exception:
        rows = []
    return render_template("leads.html", leads=rows, active="")

if __name__ == "__main__":
    app.run(debug=True)
