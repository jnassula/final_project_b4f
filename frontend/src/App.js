import './App.css';
import { Formik, Field } from 'formik';
import React, { useEffect } from 'react';


function App() {
  const [listaDeItens, updateLista] = React.useState([])

useEffect(() => {
  console.log(listaDeItens)
}, [listaDeItens])


  async function adicionarItem(item){
    updateLista(prevState => {
      const novoState = prevState.concat(item)
      return novoState
    })
    console.log("Adicionar item executado")
  }
  // Esta função assíncrona vai adicionarItem, recebendo o item. Chama o updateLista, com o estado anterior e fazemos concat ao item recebido pelo POST
  // Returnamos o novo estado, com o item adicionado.
  // Esta função é chamada onSubmit (o Formik faz a comunicação)



  return (
    <div className="App">
      <Formik
        initialValues={{descricao: "", quantidade: "", tipo: ""}}
        onSubmit={(values) => {
        fetch("/itens", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json"
          }
        }).then(res => res.json()
        .then(json => adicionarItem(json)))
      }}
      >
      
      {
        ({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Field name="descricao" />
            <Field name="quantidade" type="number" />
            <Field as="select" name="tipo">
             <option value="kg">KG</option>
             <option value="un">UN</option>
             <option value="lt">LT</option>
             </Field>
            <button type = "submit">Adicionar item</button>
          </form>
        )
      }

      
      </Formik>
        <div>
          <p>
            <button type = "submit">Vou às compras</button>
          </p>
        </div>
    </div>
  );
}

export default App;
