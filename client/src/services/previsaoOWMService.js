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
    dados.horaSol = { porSol: res.city.sunset, nascerSol: res.city.sunrise };
    dados.weather = {
      icon: res.list[0].weather[0].icon,
      descricao: formatarTextoCamelCase(res.list[0].weather[0].description)
    };

    let min = res.list[0].main.temp_min;
    for (let i = 1; i < res.list.length; i++) {
      let main = res.list[i].main;
      if (main.temp_min < min) {
        min = main.temp_min;
      }
    }

    let max = res.list[0].main.temp_max;
    for (let i = 1; i < res.list.length; i++) {
      let main = res.list[i].main;
      if (main.temp_max > max) {
        max = main.temp_max;
      }
    }
    dados.temp = { temp: res.list[0].main.temp, tempMin: min, tempMax: max };
    return dados;
  },

  makeDataPrevisao5Dias(res) {
    if (!res || res.msg === "erro") return;

    let dados = [];
    // cria data de hoje as 12:00hrs
    let meio_dia = moment()
      .utcOffset(0)
      .set({ hour: 12, minute: 0, millisecond: 0 });

    let now = moment();
    // Se a data atual for maior que meio dia utiliza ela
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
  }
};

export default previsaoOWMService;

function makePrevisaoData(data) {
  let obj = {};

  obj.dia_semana = moment(data.dt_txt)
    .locale("pt-BR")
    .format("dddd")
    .split("-")[0];
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
