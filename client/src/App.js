import React from "react";
import "./App.css";
import ConsultaPrevisao from "./pages/ConsultaPrevisao";
import Home from "./pages/Home";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function App() {
  return (
    <BrowserRouter basename={"/"}>
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/consulta" exact component={ConsultaPrevisao} />
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
