from flask import request, jsonify, make_response
from flask import current_app as app
from flask_cors import cross_origin
from .service import insert_consulta_previsao, get_all_consultas_previsao, get_detalhes_consulta_previsao_by_id
from flask import jsonify


"""
    Salvar consulta completa da previsão
"""
@app.route('/api/previsao', methods=['POST'])
@cross_origin()
def salvar_consulta_previsao():
    data = request.get_json()
    res = insert_consulta_previsao(data)
    # verifica se é dicionário porque 
    # pode falhar na hora de inserir alguma tabela no banco
    # e o retorno é a referência do objeto salvo que não é dict
    if (type(res) is dict and "error" in res):
        return jsonify(res), 400
    else:
        return jsonify({'msg': 'Consulta Salva com sucesso.'}), 200

"""
    Get All previsões
"""
@app.route('/api/previsoes/', methods=['GET'])
@cross_origin()
def listar_todas_consultas_previsao():
    res = get_all_consultas_previsao()
    if ("msg" in res):
        return jsonify(res), 400
    else:
        return jsonify({'data': [dict(row) for row in res]}), 200


"""
    Get Detalhes Previsão
"""
@app.route('/api/previsao/<int:id>', methods=['GET'])
@cross_origin()
def listar_detalhes_consulta_previsao_by_id(id):
    id = request.args['id']
    res = get_detalhes_consulta_previsao_by_id(id)
    return json_response(res, 200)


def json_response(payload, status=200):
    return (json.dumps(payload), status, {'content-type': 'application/json'})
