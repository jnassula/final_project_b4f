import React from 'react';
import { Formik, Field } from 'formik'
import './App.css';

function App() {
  return (
    <div className="App">
      <Formik
        initialValues={{listaDeItens: [
          {descricao: "", quantidade: ""}
        ]
      }}
      onSubmit
      >

      </Formik>

      {({handleSubmit}) => (
        <form onSubmit={handleSubmit}>
          <Field name="descricao" type="text" />
          <Field name="quantidade" type="text" />
        </form>
      )}
      
    </div>
  );
}

export default App;
