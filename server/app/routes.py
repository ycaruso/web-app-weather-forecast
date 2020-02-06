from flask import request, render_template, make_response
from flask import current_app as app
from .service import get_previsoes_tempo, get_or_insert_pais, get_or_insert_cidade, insert_previsao, insert_previsao_itens

@app.route('/api/previsao/consultar', methods=['GET'])
def entry(nome_cidade='Cianorte', sigla_pais='br'):

    res = get_previsoes_tempo(nome_cidade, sigla_pais)

    pais_ref = get_or_insert_pais(sigla_pais)

    cidade_ref = get_or_insert_cidade(res, nome_cidade, pais_ref)

    previsao_ref = insert_previsao(res, cidade_ref)
    
    insert_previsao_itens(res, previsao_ref)

    return res


# @app.route('/api/previsao/listar_todos', methods=['GET'])
# def entry(cidade='Cianorte', pais='br'):
#     pass
