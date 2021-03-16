from flask import Flask
app = Flask(__name__)

@app.route("/", methods=["GET"])
def db():
    return {
        "documentType": "PASSPORT",
        "documentValue": "BU8778728732",
        "names": "John Doe",
        "dateOfDeath": "1990-02-02",
    }
