from flask import request, jsonify
from flask import current_app as app
from flask_cors import cross_origin
from .service import insert_consulta_previsao, get_all_consultas_previsao
from flask import jsonify

@app.route('/api/previsao', methods=['POST'])
@cross_origin()
def salvar_consulta_previsao():
    data = request.get_json()
    insert_consulta_previsao(data)
    return 'Salvo OK'

@app.route('/api/previsao/', methods=['GET'])
@cross_origin()
def listar_todas_consultas_previsao():
    res = get_all_consultas_previsao()
    return jsonify({'result': [dict(row) for row in res]})
