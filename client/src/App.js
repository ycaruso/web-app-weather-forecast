import React from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ConsultaPrevisao from "./pages/ConsultaPrevisao";
import Home from "./pages/Home";
import HistoricoConsulta from "./pages/HistoricoConsulta";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/consulta" exact component={ConsultaPrevisao} />
          <Route path="/historico" exact component={HistoricoConsulta} />
          <Route
            render={() => {
              return <div>Página não encontrada.</div>;
            }}
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
