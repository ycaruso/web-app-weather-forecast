from .models import db, Cidade, Previsao, PrevisaoItem, CondicaoClimatica, Pais
from datetime import datetime
import pytz
from sqlalchemy import exc


def get_detalhes_consulta_previsao_by_id(id):
    res = db.session.execute(f"""
           select
            p.nro_linhas as cnt,
            c.nome as cidade,
            pa.sigla,
            c.dt_nascer_sol,
            c.dt_por_sol,
            pit.dt_hora_previsao::timestamp,
            pit.dt_hora_dados::timestamp,
            pit.temp_atual,
            pit.temp_min,
            pit.temp_max,
            pit.umidade,
            pit.percent_nuvens,
            pit.veloc_vento,
            pit.vol_chuva_3h,
            co.descricao,
            co.icon
            FROM "public".previsao p
            left join previsao_item pit on (p.id=pit.id_previsao)
            left join previsao_condicao_clima pc on (pc.previsao_item_id=pit.id)
            left join condicao_climatica co on (co.id=pc.condicao_climatica_id)
            left join cidade c on (c.id=p.id_cidade)
            left join pais pa on (pa.id=c.id_pais)
            where p.id={id}
        """,{})
    
    resDict = resultProxyToDict(res)

    if (not resDict):
        return ({ "msg": "Nenhuma consulta de previsão encontrada."})
    else:
        return resDict

# ------------------------------------------------------------------------------------
# Realiza consulta bruta SQL para retornar as consultas
# ------------------------------------------------------------------------------------
def get_all_consultas_previsao():
    res = db.session.execute("""
        select p.id, p.dt_hora_consulta,  
        c.nome as cidade,
        pa.sigla as pais,
        c.populacao,
        c.dt_nascer_sol,
        c.dt_por_sol
        from previsao as p
        left join cidade as c on (c.id=p.id_cidade)
        left join pais as pa on (pa.id=c.id_pais)
        order by id desc
        """)
    
    resDict = resultProxyToDict(res)

    # Se for vazio
    if (not resDict):
        return ({ "msg": "Nenhuma consulta de previsão encontrada." })
    else:
        return resDict


# ------------------------------------------------------------------------------------
# Realiza o cadastro da consulta previsao tempo completa
# ------------------------------------------------------------------------------------

def insert_consulta_previsao(res):

    pais_ref = get_or_insert_pais(res['city']['country'])
    if (type(pais_ref) is dict and "error" in pais_ref):
        return pais_ref


    cidade_ref = get_or_insert_cidade(res, pais_ref)
    if (type(cidade_ref) is dict and "error" in cidade_ref):
        return cidade_ref

    previsao_ref = insert_previsao(res, cidade_ref)
    if (type(previsao_ref) is dict and "error" in previsao_ref):
        return previsao_ref
    
    itens_previsao_ref = insert_previsao_itens(res, previsao_ref)
    if (type(itens_previsao_ref) is dict and "error" in itens_previsao_ref):
        return itens_previsao_ref

    return ({ "msg": "Previsão cadastrada com sucesso" })


# ------------------------------------------------------------------------------------
# Cria Ou Obtem Pais Cadastrado
# ------------------------------------------------------------------------------------


def get_or_insert_pais(sigla_pais):

    try:
        pais_ref = db.session.query(Pais).filter(
            Pais.sigla == sigla_pais).first()

        if (not pais_ref):
            novo_pais = Pais(sigla_pais)
            pais_ref = novo_pais
            db.session.add(novo_pais)
            db.session.commit()
        
        return pais_ref
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return ({ "msg": "Erro ao salvar pais.", "error": f"{e.__dict__['orig']}" })
    
    

# ------------------------------------------------------------------------------------
# Cria Ou Obtem Cidade Cadastrada
# ------------------------------------------------------------------------------------


def get_or_insert_cidade(res, pais_ref):

    try:
        cidade_ref = db.session.query(Cidade).filter(
            Cidade.nome == res['city']['name']).first()

        if (not cidade_ref):

            dt_nascer = datetime.fromtimestamp(
                res['city']['sunrise']).strftime('%Y-%m-%d %H:%M:%S')
            dt_por_sol = datetime.fromtimestamp(
                res['city']['sunset']).strftime('%Y-%m-%d %H:%M:%S')

            nova_cidade = Cidade(res['city']['id'],
                                res['city']['name'],
                                res['city']['coord']['lat'],
                                res['city']['coord']['lon'],
                                res['city']['population'] if "population" in res['city'] else 0,
                                res['city']['timezone'],
                                dt_nascer,
                                dt_por_sol,
                                pais_ref)
            cidade_ref = nova_cidade
            db.session.add(nova_cidade)
            db.session.commit()

        return cidade_ref
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return ({ "msg": "Erro ao salvar cidade.", "error": f"{e.__dict__['orig']}" })
# ------------------------------------------------------------------------------------
# Cria previsao do tempo
# ------------------------------------------------------------------------------------


def insert_previsao(res, cidade_ref):
    try:
        dt_hora_consulta = datetime.now()
        previsao_ref = Previsao(
            res['cod'], res['message'], dt_hora_consulta, res['cnt'], cidade_ref)
        db.session.add(previsao_ref)
        db.session.commit()
        return previsao_ref
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return ({ "msg": "Erro ao salvar Previsão do tempo.", "error": f"{e.__dict__['orig']}" })

# ------------------------------------------------------------------------------------
# Cria ou obtem condição climatica
# ------------------------------------------------------------------------------------


def get_or_insert_condicao_clima(previsao_item):

    lista_condicoes = []
    for cond in previsao_item['weather']:
        cond_clima_ref = db.session.query(CondicaoClimatica).filter(
            CondicaoClimatica.nk_cond_climatica == cond['id']).first()

        if (not cond_clima_ref):
            cond_clima_ref = CondicaoClimatica(cond['id'], 
                                               cond['main'], 
                                               cond['description'], 
                                               cond['icon'])

        lista_condicoes.append(cond_clima_ref)
    return lista_condicoes

# ------------------------------------------------------------------------------------
# Cria Itens Previsao
# ------------------------------------------------------------------------------------


def insert_previsao_itens(res, previsao_ref):
    
    lista_previsao_item = []

    for previsao in res["list"]:
        previsao_item_ref = PrevisaoItem(datetime.fromtimestamp(previsao['dt'], tz=pytz.utc).strftime('%Y-%m-%d %H:%M:%S'),
            previsao['main']['temp'],
            previsao['main']['feels_like'],
            previsao['main']['temp_min'],
            previsao['main']['temp_max'],
            previsao['main']['pressure'],
            previsao['main']['sea_level'],
            previsao['main']['grnd_level'],
            previsao['main']['humidity'],
            previsao['clouds']['all'],
            previsao['wind']['speed'],
            previsao['wind']['deg'],
            previsao['rain']['3h'] if "rain" in previsao else 0,
            previsao['snow']['3h'] if "snow" in previsao else 0,
            previsao['dt_txt'],
            previsao_ref)

        previsao_item_ref.condicoes = get_or_insert_condicao_clima(
            previsao)

        lista_previsao_item.append(previsao_item_ref)

    try:
        db.session.add_all(lista_previsao_item)
        db.session.commit()
        return lista_previsao_item
    except exc.SQLAlchemyError as e:
        db.session.rollback()
        return ({ "msg": "Erro ao salvar itens da Previsão do Tempo.", "error": f"{e.__dict__['orig']}" })


def resultProxyToDict(res):
    d, a = {}, []
    for rowproxy in res:
        # rowproxy.items() returns an array like [(key0, value0), (key1, value1)]
        for column, value in rowproxy.items():
            # build up the dictionary
            d = {**d, **{column: value}}
        a.append(d)
    return a