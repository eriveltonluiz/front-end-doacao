#!/usr/bin/env python3

from flask import Flask

app = Flask(__name__)

@app.route("/")
def index():
    return "<h1> Index </h1>"

@app.route("/doador")
def doador():
    return "<h1 style='color: red'> Doador </h1>"

@app.route("/solicita")
def solicita():
    return "<h1 style='color: blue'> Solicitações </h1>"

if __name__ == "__main__":
    app.run()
