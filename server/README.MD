# Servidor Python

### Requisitos:
- Python 3.8 +
- Postgres 9.5
- virtualenv

### Para Executar o projeto, faça os seguintes passos:
- pip install pipenv - instalar o pipenv
- pipenv shell
- pipenv install - para instalar as dependências do projeto
- py run.py  

Pacotes para instalação estão tanto no Pipfile quanto no
requirements.txt

### Os principais módulos desta aplicação foram:
- Flask - para criação servidor http
- SQLAlchemy - para fazer o mapeamento objeto relacional (ORM)
- Flask-SQLAlchemy - middleware para trabalhar com SQLAlchemy
- Flas-Cors - para conceder acesso e autorização nas rotas
- Psycopg2 - driver comunicação com banco postgres

Obs: Lembrar de alterar as configs de conexão com o banco no
arquivo config.py.
