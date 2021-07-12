import { Formik, Field } from 'formik';
import React, { useEffect } from 'react';


function Objetivo() {
  const [listaDeObjetivos, updateObjetivos] = React.useState([])

useEffect(() => {
  console.log(listaDeObjetivos)
})


  async function adicionarObjetivo(item) {
    updateObjetivos(prevState => {
      const novoState = prevState.concat(item)
      return novoState
    })
    console.log("Adicionar objetivo executado")
  }
  // Esta função assíncrona vai adicionarItem, recebendo o item. Chama o updateLista, com o estado anterior e fazemos concat ao item recebido pelo POST
  // Returnamos o novo estado, com o item adicionado.
  // Esta função é chamada onSubmit (o Formik faz a comunicação)



  return (
    <div className="Objetivo">
      <Formik
        initialValues={{descricao: "", valor: "", prazo: ""}}
        onSubmit={(values) => {
        fetch("/objetivo", {
          method: "POST",
          body: JSON.stringify(values),
          headers: {
            "Content-type": "application/json"
          }
        }).then(res => res.json()
        .then(json => adicionarObjetivo(json)))
      }}
      >

        {
          ({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="descricao" required />
              <Field name="valor" type="number" required />
              <Field name="prazo" type="date" required />
              <button type="submit">Adicionar objetivo</button>
            </form>
          )
        }


      </Formik>
      <div>
        <p>
          <button type="submit">Contribuir</button>
        </p>
      </div>
    </div>
  );
}

export default Objetivo;
