from .models import db, Cidade, Previsao, PrevisaoItem, CondicaoClimatica, Pais
from datetime import datetime


# ------------------------------------------------------------------------------------
# Realiza consulta bruta SQL para retornar as consultas
# ------------------------------------------------------------------------------------
def get_all_consultas_previsao():
    res = db.session.execute("""
        select p.id, p.dt_hora_consulta,  
        c.nome,
        pa.sigla,
        c.populacao,
        c.fuso_horario,
        c.dt_nascer_sol,
        c.dt_por_sol
        from previsao as p
        left join cidade as c on (c.id=p.id_cidade)
        left join pais as pa on (pa.id=c.id_pais)
    """,{})
    return res
    

# ------------------------------------------------------------------------------------
# Realiza o cadastro da consulta previsao tempo completa
# ------------------------------------------------------------------------------------

def insert_consulta_previsao(res):

    pais_ref = get_or_insert_pais(res['city']['country'])

    cidade_ref = get_or_insert_cidade(res, pais_ref)

    previsao_ref = insert_previsao(res, cidade_ref)
    
    insert_previsao_itens(res, previsao_ref)

# ------------------------------------------------------------------------------------
# Cria Ou Obtem Pais Cadastrado
# ------------------------------------------------------------------------------------


def get_or_insert_pais(sigla_pais):

    pais_ref = db.session.query(Pais).filter(
        Pais.sigla == sigla_pais).first()

    if (not pais_ref):
        novo_pais = Pais(sigla_pais)
        pais_ref = novo_pais
        db.session.add(novo_pais)
        db.session.commit()
    return pais_ref

# ------------------------------------------------------------------------------------
# Cria Ou Obtem Cidade Cadastrada
# ------------------------------------------------------------------------------------


def get_or_insert_cidade(res, pais_ref):

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
                             res['city']['population'],
                             res['city']['timezone'],
                             dt_nascer,
                             dt_por_sol,
                             pais_ref)
        cidade_ref = nova_cidade
        db.session.add(nova_cidade)
        db.session.commit()

    return cidade_ref

# ------------------------------------------------------------------------------------
# Cria previsao do tempo
# ------------------------------------------------------------------------------------


def insert_previsao(res, cidade_ref):
    dt_hora_consulta = datetime.now()
    previsao_ref = Previsao(
        res['cod'], res['message'], dt_hora_consulta, res['cnt'], cidade_ref)
    db.session.add(previsao_ref)
    db.session.commit()
    return previsao_ref

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

        previsao_item_ref = PrevisaoItem(datetime.fromtimestamp(previsao['dt']).strftime('%Y-%m-%d %H:%M:%S'),
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

    db.session.add_all(lista_previsao_item)
    db.session.commit()

    return lista_previsao_item
