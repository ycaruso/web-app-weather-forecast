import axios from "axios";
import moment from "moment";
import "moment/locale/pt-br";
import formatarTextoCamelCase from "../helpers/util";

const url = "http://api.openweathermap.org/data/2.5/forecast?";

const previsaoOWMService = {
  async getPrevisoesOWM(cidade_pais) {
    const config = `APPID=cb1842be7097fc1a1387f33cb076f453&q=${cidade_pais}&units=metric&lang=pt_br`;

    try {
      const res = await axios.get(url + config);
      return { msg: "sucesso", data: res.data };
    } catch (err) {
      return { msg: "erro", err: handleError(err) };
    }
  },
  makeDataCity(res) {
    if (!res || res.msg === "erro") return;
    let dados = {};
    dados.cidade = `${res.city.name}, ${res.city.country}`;
    dados.dt = moment
      .unix(res.list[0].dt)
      .utcOffset(0)
      .format("LLLL");
    console.log(dados.dt);
    dados.horaSol = { porSol: res.city.sunset, nascerSol: res.city.sunrise };
    dados.weather = {
      icon: res.list[0].weather[0].icon,
      descricao: formatarTextoCamelCase(res.list[0].weather[0].description)
    };

    let min = res.list[0].main.temp_min;
    let dtMax = moment(res.list[0].dt_txt);

    for (let i = 1; i < res.list.length; i++) {
      const item = res.list[i];
      let dtItem = moment(item.dt_txt);
      if (item.temp_min < min && dtMax.isAfter(dtItem)) {
        min = item.temp_min;
      }
    }

    let max = res.list[0].main.temp_max;
    for (let i = 1; i < res.list.length; i++) {
      const item = res.list[i];
      if (
        item.temp_max < max &&
        dtMax.isAfter(moment(item.dt_txt).utcOffset(0))
      ) {
        max = item.temp_max;
      }
    }
    debugger;
    dados.temp = { temp: res.list[0].main.temp, tempMin: min, tempMax: max };
    return dados;
  },

  makeDataPrevisao5Dias(res) {
    if (!res || res.msg === "erro") return;

    let dados = [];
    // cria data de hoje as 12:00hrs
    let meio_dia = moment().set({
      hour: 12,
      minute: 0,
      second: 0,
      millisecond: 0
    });

    let now = moment();
    // Se a data atual for maior que meio dia remove ela e adiciona na lista
    if (now.isAfter(meio_dia)) {
      dados.push(makePrevisaoData(res.list.shift()));
    }

    // filtra somente os horários das 12hrs
    res.list.filter(
      x =>
        moment
          .unix(x.dt)
          .utc()
          .format("HH") === "12" && dados.push(makePrevisaoData(x))
    );
    return dados;
  },
  makeDataDetalheDia(res, dia) {
    let dia_m = moment(dia, "YYYY-MM-DD").utcOffset(0);

    if (!res || res.msg === "erro") return;
    let dados = [];

    res.list.forEach(item => {
      if (
        moment
          .unix(item.dt)
          .utcOffset(0)
          .isSame(dia_m, "day")
      ) {
        let obj = {};
        obj.dt = moment
          .unix(item.dt)
          .utcOffset(0)
          .format("HH:mm");
        obj.icon = item.weather[0].icon;
        obj.temp = item.main.temp.toFixed(0);
        obj.chuva = item.rain ? item.rain["3h"] : 0;
        obj.umidade = item.main.humidity;
        obj.vento = item.wind.speed;
        obj.percNuvem = item.clouds.all;
        obj.condicao_clima = formatarTextoCamelCase(
          item.weather[0].description
        );
        dados.push(obj);
      }
    });

    return dados;
  }
};

export default previsaoOWMService;

function makePrevisaoData(data) {
  let obj = {};

  obj.dia_semana = moment(data.dt_txt)
    .locale("pt-BR")
    .toDate();
  obj.icon = data.weather[0].icon;
  obj.temp = data.main.temp.toFixed(0);
  obj.condicao_clima = formatarTextoCamelCase(data.weather[0].description);
  return obj;
}

const handleError = err => {
  if (err.response) {
    if (err.response.status === 401) {
      return "Sua chave de API não foi authorizada.";
    } else if (err.response.status === 404) {
      return "Não foi encontrado esta cidade.";
    } else if (err.response.status > 500) {
      return "Ops, Servidor fora do ar, tente novamente.";
    }
  } else {
    return "Ops, falha na conexão.";
  }
};
