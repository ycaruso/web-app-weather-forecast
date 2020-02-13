import axios from "axios";
import moment from "moment";

const apiPython = axios.create({
  baseURL: "http://localhost:5000"
});

const previsaoService = {
  /**
   * Salvar Consulta previsao
   * @param {consultaPrevisao} consultaPrevisao consulta para salvar no backend
   * @returns {msg} retorna mensagem previsao salva
   */
  async salvarConsultaPrevisao(consultaPrevisao) {
    try {
      const res = await apiPython.post("/api/previsao", consultaPrevisao);
      return { msg: "sucesso", data: res.data };
    } catch (err) {
      return { msg: "erro", err: err.response || `${err}` };
    }
  },

  async obterTodasConsultasPrevisao() {
    try {
      const res = await apiPython.get("/api/previsoes");
      console.log(res);
      return { msg: "sucesso", data: res.data };
    } catch (err) {
      return { msg: "erro", err: err.response };
    }
  },
  async obterDetalhesConsultaPorId(id) {
    try {
      const res = await apiPython.get(`/api/previsao/`, {
        params: { id: id }
      });

      let resData = res.data.data;

      // console.log(resData);

      let data = makeResultModelAPI(resData);
      // console.log(data);

      return { msg: "sucesso", data: data };
    } catch (err) {
      return { msg: "erro", err: err.response };
    }
  }
};

export default previsaoService;

function makeResultModelAPI(resData) {
  let data = {};
  data.cnt = resData[0].cnt;
  data.city = {};
  data.city.name = resData[0].cidade;
  data.city.country = resData[0].sigla;
  data.city.sunrise = moment(resData[0].dt_nascer_sol)
    .add("hour", 3)
    .utc()
    .unix();
  data.city.sunset = moment(resData[0].dt_por_sol)
    .add("hour", 3)
    .utc()
    .unix();

  data.list = [];

  resData.forEach(elem => {
    let item = {};
    item.dt = moment(elem.dt_hora_previsao).unix();
    item.dt_txt = moment(elem.dt_hora_dados)
      .add("hour", 3)
      .toDate();

    item.main = {};
    item.main.temp = elem.temp_atual;
    item.main.temp_min = elem.temp_min;
    item.main.temp_max = elem.temp_max;
    item.main.humidity = elem.umidade;
    item.weather = [];
    item.weather.push({ description: elem.descricao, icon: elem.icon });

    item.clouds = {};
    item.clouds.all = elem.percent_nuvens;
    item.wind = {};
    item.wind.speed = elem.veloc_vento;
    item.rain = {};
    item.rain["3h"] = elem.vol_chuva_3h;
    data.list.push(item);
  });
  return data;
}
