from flask import Flask, render_template
import os

app = Flask(__name__)

alarm = os.getenv("MODE") != "PRODUCTION"
version = os.getenv("VERSION")


@app.route("/")
def index():
    return render_template("index.html", alarm=alarm, version=version)
