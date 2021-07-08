import './App.css';
import { Formik, Field } from 'formik';
import React from 'react';



function App() {
  return (
    <div className="App">
      <Formik
      initialValues={{listaDeItems: [{descricao: "", quantidade: ""}]}}
      onSubmit={ (values) => {
        fetch("/teste", {
         
        }).then(res => res.json()
        .then(json => console.log(json)))
      } 
      }
      >
      
      {
        ({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <button type = "submit">Adicionar item</button>
          </form>
        )
      }
      

      </Formik>

    </div>
  );
}

export default App;
