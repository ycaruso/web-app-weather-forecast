import requests

def get_previsoes_tempo(municipio, pais):

    url = "http://api.openweathermap.org/data/2.5/forecast"

    payload = {'APPID': 'cb1842be7097fc1a1387f33cb076f453', 
            'q': f"{municipio},{pais}", 
            'units': 'metric', 
            'lang': 'pt_br'}

    response = requests.get(url, params=payload)

    return response.json()