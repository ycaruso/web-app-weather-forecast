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
                              nullable=False)

    dt_por_sol = db.Column(db.DateTime,
                           index=False,
                           unique=False,
                           nullable=False)

    id_pais = db.Column(db.Integer,
                        db.ForeignKey('pais.id', ondelete='CASCADE'),
                        nullable=False)

    pais = db.relationship('Pais',
                           backref=db.backref('cidade', lazy='dynamic'))

    def __init__(self, nk_cidade, nome, latitude, longitude,
                 populacao, fuso_horario, dt_nascer_sol, dt_por_sol, pais):
        self.nk_cidade = nk_cidade
        self.nome = nome
        self.latitude = latitude
        self.longitude = longitude
        self.populacao = populacao
        self.fuso_horario = fuso_horario
        self.dt_nascer_sol = dt_nascer_sol
        self.dt_por_sol = dt_por_sol
        self.id_pais = pais.id
        self.pais = pais

    def __repr__(self):
        return f'Cidade {self.nome}'


class Pais(db.Model):

    __tablename__ = 'pais'

    id = db.Column(db.Integer,
                   primary_key=True)

    sigla = db.Column(db.String(2),
                      index=True,
                      unique=True,
                      nullable=False)

    def __init__(self, sigla):
        self.sigla = sigla

    def __repr__(self):
        return f'Pais {self.sigla}'


class Previsao(db.Model):

    __tablename__ = 'previsao'

    id = db.Column(db.Integer,
                   primary_key=True)

    dt_hora_consulta = db.Column(db.DateTime,
                                 index=False,
                                 unique=False,
                                 nullable=False)

    nro_linhas = db.Column(db.Integer,
                           nullable=False)
    cod = db.Column(db.Integer,
                    nullable=False)

    msg = db.Column(db.String(250),
                    nullable=False)

    id_cidade = db.Column(db.Integer,
                          db.ForeignKey('cidade.id', ondelete='CASCADE'),
                          nullable=False)

    cidade = db.relationship('Cidade',
                             backref=db.backref('cidade', lazy='dynamic'))

    def __init__(self, cod, msg, dt_hora_consulta, nro_linhas, cidade):
        self.cod = cod
        self.msg = msg
        self.dt_hora_consulta = dt_hora_consulta
        self.nro_linhas = nro_linhas
        self.cidade = cidade
        self.id_cidade = cidade.id

PrevisaoCondicaoClima = db.Table('previsao_condicao_clima', db.Model.metadata,
    db.Column('previsao_item_id', db.Integer, db.ForeignKey('previsao_item.id')),
    db.Column('condicao_climatica_id', db.Integer, db.ForeignKey('condicao_climatica.id')))

class PrevisaoItem(db.Model):

    __tablename__ = 'previsao_item'

    id = db.Column(db.Integer,
                   primary_key=True)

    dt_hora_previsao = db.Column(db.DateTime,
                                 index=False,
                                 unique=False,
                                 nullable=False)

    temp_atual = db.Column(db.Float,
                           nullable=False)

    sensacao_termica = db.Column(db.Float,
                                 nullable=False)

    temp_min = db.Column(db.Float,
                         nullable=False)

    temp_max = db.Column(db.Float,
                         nullable=False)

    pressao_atm = db.Column(db.Integer,
                            nullable=False)

    pressao_mar = db.Column(db.Integer,
                            nullable=False)

    pressao_solo = db.Column(db.Integer,
                             nullable=False)

    umidade = db.Column(db.Integer,
                         nullable=False)

    percent_nuvens = db.Column(db.Float,
                               nullable=False)

    veloc_vento = db.Column(db.Integer,
                            nullable=False)

    direcao_vento_graus = db.Column(db.Integer,
                                    nullable=False)

    vol_chuva_3h = db.Column(db.Float,
                                 nullable=True)
    
    vol_neve_3h = db.Column(db.Float,
                                 nullable=True)                                 

    dt_hora_dados = db.Column(db.DateTime,
                              index=False,
                              unique=False,
                              nullable=False)

    id_previsao = db.Column(db.Integer,
                            db.ForeignKey('previsao.id', ondelete='CASCADE'),
                            nullable=False)

    previsao = db.relationship('Previsao',
                               backref=db.backref('previsao', lazy='dynamic'))

    condicoes = db.relationship('CondicaoClimatica',
                                secondary=PrevisaoCondicaoClima)

    def __init__(self, dt_hora_previsao, temp_atual, sensacao_termica, temp_min, temp_max, pressao_atm, pressao_mar, pressao_solo, umidade, percent_nuvens,
        veloc_vento, direcao_vento_graus, vol_chuva_3h, vol_neve_3h, dt_hora_dados, previsao):
        self.dt_hora_previsao = dt_hora_previsao
        self.temp_atual = temp_atual
        self.sensacao_termica = sensacao_termica
        self.temp_min = temp_min
        self.temp_max = temp_max
        self.pressao_atm = pressao_atm
        self.pressao_mar = pressao_mar
        self.pressao_solo = pressao_solo
        self.umidade = umidade
        self.percent_nuvens = percent_nuvens
        self.veloc_vento = veloc_vento
        self.direcao_vento_graus = direcao_vento_graus
        self.vol_chuva_3h = vol_chuva_3h
        self.vol_neve_3h = vol_neve_3h
        self.dt_hora_dados = dt_hora_dados
        self.previsao = previsao
        self.id_previsao = previsao.id

class CondicaoClimatica(db.Model):

    __tablename__ = 'condicao_climatica'

    id = db.Column(db.Integer,
                   primary_key=True)
    
    nk_cond_climatica = db.Column(db.Integer,
                   index=True,
                   unique=True,
                   nullable=False)

    grupo = db.Column(db.String(20),
                      nullable=False)

    descricao = db.Column(db.String(100),
                          nullable=False)

    def __init__(self, nk_cond_climatica, grupo, descricao):
        self.nk_cond_climatica = nk_cond_climatica
        self.grupo = grupo
        self.descricao = descricao

