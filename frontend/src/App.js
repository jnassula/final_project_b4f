
import React from 'react';
import {Switch, Route} from "react-router-dom" ;
import Objetivo from './pages/Objetivos';
import Lista from './pages/Lista';
import Login from './pages/Login';
import InicioButton from './components/Inicio';
import Compras from './pages/Compras';

function App() {
  return (
    <div className="App">
      <InicioButton/>
    <Switch>
      <Route exact path="/">
        <Login />
      </Route>
      <Route exact path="/lista">
        <Compras />
        </Route>
      <Route path="/lista/:id">
        <Lista />
      </Route>
      <Route path="/objetivo">
        <Objetivo />
      </Route>

    </Switch>


    </div>
      

  );
}

export default App;
