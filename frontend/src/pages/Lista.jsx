import { Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from '../styles/Lista.module.css';

function Lista() {
  const [listaDeItens, setItens] = useState([])
  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    fetchItens(params.id)
  }, [])

  async function addItem(values){
    const res = await fetch(`/lista/${params.id}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json"
      }
    })
    return await fetchItens(params.id)
  }


  async function fetchItens(id){
    console.log(id)
    const res = await fetch(`/lista/${id}`)
    const resBody = await res.json();
    console.log(resBody)
    setItens(resBody)
  }


  function consoleLog() {
    console.log(listaDeItens)
  }

  // async function adicionarItem(item){
  //   setItens(prevState => {
  //     const novoState = prevState.concat(item)
  //     return novoState
  //   })
  //   console.log("Adicionar item executado")
  // }
  // Esta função assíncrona vai adicionarItem, recebendo o item. Chama o updateLista, com o estado anterior e fazemos concat ao item recebido pelo POST
  // Returnamos o novo estado, com o item adicionado.
  // Esta função é chamada onSubmit (o Formik faz a comunicação)

  function enviarMensagem() {
    fetch("/mensagem", {
      method: "POST"
    }).then(res => res.json()
      .then(json => console.log(json)))
    alert("Mensagem enviada a todos os elementos do grupo")
  }


  return (
    <div className="App">
      <div>
        <button onClick={() => consoleLog()}> Consolelog</button>
        
        {
          listaDeItens?.map((objeto, i) => (
            <li key={i}>
              <br />
              {` Produto: ${objeto.descricao} `} <br />
              {` Quantidade: ${objeto.quantidade} `} <br />
              {` Unidade: ${objeto.unidade} `} <br />
            </li>
          ))
        }
        
      </div>


      <Formik
        initialValues={{ descricao: "", quantidade: "", unidade: "un" }}
        onSubmit={ (values) => addItem(values)}
      >
        {
          ({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="descricao" required />
              <Field name="quantidade" type="number" required />
              <Field name="unidade" as="select" required>
                <option value="un">Un</option>
                <option value="kg">Kg</option>
                <option value="lt">Lt</option>
              </Field>
              <button type="submit">Adicionar item</button>
            </form>
          )
        }
      </Formik>
      <div>
        <p>
          <button onClick={enviarMensagem} type="alert" >Vou às compras</button>
        </p>
      </div>

    </div>
  );
}

export default Lista