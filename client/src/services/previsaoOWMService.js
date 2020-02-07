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
            return { msg: "successo", data: res.data };
        } catch (err) {
            return { msg: "erro", err: err.response };
        }
    },
    makeArrayPrevisaoResumido(res) {

        let dados = [];
        // cria data de hoje as 12:00hrs
        let meio_dia = moment()
        .utcOffset(0)
        .set({ hour: 12, minute: 0, millisecond: 0 });

        let now = moment();
        // Se a data atual for maior que meio dia utiliza ela
        if (now.isAfter(meio_dia)) {
        dados.push(makePrevisaoData(res.data.list.shift()));
        }

        // filtra somente os horários das 12hrs
        res.data.list.filter(
        x =>
            moment
            .unix(x.dt)
            .utc()
            .format("HH") === "12" && dados.push(makePrevisaoData(x))
        );
        return dados;
    }
}

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