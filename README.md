# LaptopLift - Responsive Marketing Campaign Website

A multi-page, responsive campaign website for a fictional student laptop sale.

**Tech:** HTML5, CSS3 (Flexbox, Grid, media queries), JavaScript, Python, Flask, MySQL

## Features
- 4 pages: Home, Offers, About, Contact (Jinja2 templates with a shared base)
- Responsive layout for desktop, tablet and mobile
- JavaScript: mobile menu, FAQ accordion, client-side form validation
- Flask REST endpoint `POST /api/leads` with server-side validation
- Leads stored in a MySQL table

## Run locally
1. Install MySQL and run: `mysql -u root -p < schema.sql`
2. `pip install -r requirements.txt`
3. Set DB credentials if needed (defaults: root, empty password):
   - Windows PowerShell: `$env:DB_PASSWORD="yourpassword"`
   - Mac/Linux: `export DB_PASSWORD=yourpassword`
4. `python app.py` and open http://127.0.0.1:5000

## Check saved leads
`SELECT * FROM leads;`

## What I learned
(Write 3-4 points in your own words after you finish.)

## Screenshots
(Add desktop, tablet and mobile screenshots here.)
