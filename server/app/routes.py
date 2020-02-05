from flask import request, render_template, make_response
from datetime import datetime
from flask import current_app as app
from .models import db, Cidade, Pais
from .service import get_previsoes_tempo

""" Banco adicionar Previsão e previsão itens """

@app.route('/api/previsao/consultar', methods=['GET'])
def entry(municipio='Cianorte', pais='br'):

    # res = get_previsoes_tempo(municipio, pais)
    # print(res)

    # Cria Ou Otem Pais Cadastrado
    novo_pais = Pais(pais)
    pais_cadastrado = db.session.query(Pais).filter(
        Pais.nome == novo_pais.nome).first()
    if (pais_cadastrado == None):
        db.session.add(novo_pais)
        db.session.commit()

    # ts_nascer_sol = 1580721015
    # ts_por_sol = 1580768284

    # dt_nascer = datetime.fromtimestamp(ts_nascer_sol).strftime('%Y-%m-%d %H:%M:%S')
    # dt_por_sol = datetime.fromtimestamp(ts_por_sol).strftime('%Y-%m-%d %H:%M:%S')

    # new_cidade = Cidade(12345,'Cianorte','-23.6633','-52.605',55994,-10800, dt_nascer, dt_por_sol, novo_pais.id)

    # print(new_cidade)

    # db.session.add(new_cidade)

    # db.session.commit()

    return make_response("Cidade e Pais Criados")


@app.route('/api/previsao/listar_todos', methods=['GET'])
def entry(municipio='Cianorte', pais='br'):
    pass