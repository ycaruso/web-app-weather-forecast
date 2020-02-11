import os

class Config:

    # General
    FLASK_DEBUG = True

    # Database
    SQLALCHEMY_DATABASE_URI = 'postgresql://postgres:223468@127.0.0.1:5432/previsao_tempo'