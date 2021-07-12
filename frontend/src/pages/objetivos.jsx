import { Formik, Field } from 'formik';
import React, { useEffect } from 'react';


function Objetivo() {
  const [listaDeObjetivos, updateObjetivos] = React.useState([])

useEffect(() => {
  fetchObjetivo()
})


  async function fetchObjetivo(){
    const res = await fetch("/objetivos")
    const resBody = await res.json();
    console.log()
    updateObjetivos(resBody.Objetivos)
  }
  // Esta função assíncrona vai adicionarItem, recebendo o item. Chama o updateLista, com o estado anterior e fazemos concat ao item recebido pelo POST
  // Returnamos o novo estado, com o item adicionado.
  // Esta função é chamada onSubmit (o Formik faz a comunicação)



  return (
    <div className="Objetivo">
      <h1>Objetivos</h1>
      {
        listaDeObjetivos?.map(lista => (
          <li key = {lista._id}>
            {` O seu objetivo é: ${lista.obj}`} <br/>
            {` A data limite é: ${lista.prazo}`} <br/>
            {` O valor a atingir é: ${lista.valor}`} <br/>
            <button>Apagar</button>


          </li>
        ))
      }
      <br/>



      <button onClick={() => fetchObjetivo()}> Actualizar objectivos </button>
      <button onClick={() => console.log(listaDeObjetivos)}> Console log </button>
      
      <Formik
        initialValues={{obj: "", prazo: "", valor: ""}}
        onSubmit={async (objeto) => {
        const res = await fetch("/objetivos", {
          method: "POST",
          body: JSON.stringify(objeto),
          headers: {
            "Content-type": "application/json"
          }
        }).then(res => res.json()
        .then(json => console.log(json)))
      }}
      >
      
      {
        ({handleSubmit}) => (
          <form onSubmit={handleSubmit}>
            <Field name="obj" type="text" placeholder="Defina aqui o seu objetivo" required />
            <Field name="prazo" type="date" placeholder="Data" required />
            <Field name="valor" placeholder="Quanto quer poupar/juntar?" required />
            <button type = "submit">Adicionar objetivo</button>
          </form> 
        )
      }

      
      </Formik>
        <div>
          <p>
            <button type = "submit">Contribuir</button>
          </p>
        </div>
    </div>
  );
}

export default Objetivo;
