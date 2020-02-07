import axios from "axios";

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
      return { msg: "erro", err: err.response };
    }
  },

  async obterTodasConsultasPrevisao() {
    try {
      const res = await apiPython.get("/api/previsao");
      return { msg: "sucesso", data: res.data };
    } catch (err) {
      return { msg: "erro", err: err.response };
    }
  }
};

export default previsaoService;
