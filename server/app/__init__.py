from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():

    app = Flask( __name__ , instance_relative_config=False)
    cors = CORS(app, resources={r"/api/*": {"origins": "*"}})

    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_ECHO"] = True
    app.config.from_object('config.Config')
    db.init_app(app)

    with app.app_context():
        from . import routes
        db.create_all()

        return app