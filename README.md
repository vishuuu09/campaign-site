# LaptopLift - Responsive Marketing Campaign Website

A multi-page, responsive campaign website for a fictional student laptop sale, built to practise full-stack web development.

## Tech Stack
- **Frontend:** HTML5, CSS3 (Flexbox, Grid, media queries), JavaScript
- **Backend:** Python, Flask, REST API
- **Database:** MySQL

## Features
- 4 pages: Home, Offers, About and Contact, built with Jinja2 templates and a shared base layout
- Responsive design for desktop, tablet and mobile, with a mobile navigation menu
- FAQ accordion built with JavaScript
- Contact form with client-side and server-side validation
- Flask REST endpoint `POST /api/leads` that stores messages in MySQL using parameterised queries

## Screenshots
| Home | Offers |
|------|--------|
| ![Home](screenshots/home.png) | ![Offers](screenshots/offers.png) |

| Contact | Mobile |
|---------|--------|
| ![Contact](screenshots/contact.png) | ![Mobile](screenshots/mobile.png) |

## Project Structure
```
campaign-site/
├── app.py
├── schema.sql
├── requirements.txt
├── templates/
│   ├── base.html
│   ├── index.html
│   ├── offers.html
│   ├── about.html
│   └── contact.html
└── static/
    ├── css/style.css
    └── js/main.js
```

## How to Run Locally
1. Install Python and MySQL.
2. Create the database:
   ```
   mysql -u root -p < schema.sql
   ```
3. Create a virtual environment and install dependencies:
   ```
   python -m venv venv
   venv\Scripts\activate
   pip install -r requirements.txt
   ```
4. Set your database password as an environment variable (PowerShell):
   ```
   $env:DB_PASSWORD='your_password'
   ```
5. Run the app:
   ```
   python app.py
   ```
6. Open http://127.0.0.1:5000

## Environment Variables
| Variable | Default |
|----------|---------|
| DB_HOST | localhost |
| DB_USER | root |
| DB_PASSWORD | (empty) |
| DB_NAME | campaign_db |

## What I Learned
- Building responsive layouts with Flexbox, Grid and media queries
- Connecting a JavaScript front end to a Flask API using fetch
- Validating input on both the client and the server
- Storing data safely in MySQL using parameterised queries
