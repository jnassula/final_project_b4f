
import React from 'react';
import {Switch, Route} from "react-router-dom" ;
import Objetivo from './pages/objetivos';
import Lista from './pages/lista';
import Login from './pages/login';
import InicioButton from './components/Inicio';
import Compras from './pages/compras';

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
