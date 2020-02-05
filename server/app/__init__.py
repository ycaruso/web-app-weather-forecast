from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():

    """ Constrói o Core da App """
    app = Flask( __name__ , instance_relative_config=False)
    
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["SQLALCHEMY_ECHO"] = True
    app.config.from_object('config.Config')
    db.init_app(app)

    with app.app_context():
        from . import routes
        db.create_all()

        return app