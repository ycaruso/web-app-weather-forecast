from . import db

class Cidade(db.Model):

    __tablename__ = 'cidade'

    id = db.Column(db.Integer,
                   primary_key=True)

    nk_cidade = db.Column(db.Integer,
                          index=True,
                          nullable=False)

    nome = db.Column(db.String(100),
                     index=True,
                     unique=True,
                     nullable=False)

    latitude = db.Column(db.String(12),
                         nullable=False)

    longitude = db.Column(db.String(12),
                          nullable=False)

    populacao = db.Column(db.Integer,
                          nullable=False)

    fuso_horario = db.Column(db.Integer,
                             nullable=False)

    dt_nascer_sol = db.Column(db.DateTime,
                              index=False,
                              unique=False,
                              nullable=False
                              )

    dt_por_sol = db.Column(db.DateTime,
                           index=False,
                           unique=False,
                           nullable=False
                           )

    id_pais = db.Column(db.Integer,
                        db.ForeignKey('pais.id', ondelete='CASCADE'),
                        nullable=False)

    pais = db.relationship('Pais',
                           backref=db.backref('cidade', lazy='dynamic')
                           )

    def __init__(self, nk_cidade, nome, latitude, longitude,
                 populacao, fuso_horario, dt_nascer_sol, dt_por_sol, id_pais):
        self.nk_cidade = nk_cidade
        self.nome = nome
        self.latitude = latitude
        self.longitude = longitude
        self.populacao = populacao
        self.fuso_horario = fuso_horario
        self.dt_nascer_sol = dt_nascer_sol
        self.dt_por_sol = dt_por_sol
        self.id_pais = id_pais

    def __repr__(self):
        return f'Cidade {self.nome}'


class Pais(db.Model):

    __tablename__ = 'pais'

    id = db.Column(db.Integer,
                   primary_key=True
                   )

    nome = db.Column(db.String(60),
                     index=True,
                     unique=True,
                     nullable=False)

    def __init__(self, nome):
        self.nome = nome

    def __repr__(self):
        return f'Pais {self.nome}'
