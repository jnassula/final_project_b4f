import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormularioItem from '../components/FormularioItem';

import styles from '../styles/Lista.module.css';

function Lista() {
  const [listaDeItens, setItens] = useState([])
  const [nomePagina, setNomePagina] = useState("")
  const params = useParams();

  useEffect(() => {
    fetchItens(params.id)
  }, [])

  async function addItem(values) {
    const res = await fetch(`/lista/${params.id}`, {
      method: "POST",
      body: JSON.stringify(values),
      headers: {
        "Content-type": "application/json"
      }
    })
    return await fetchItens(params.id)
  }

  async function fetchItens(id) {
    console.log(id)
    const res = await fetch(`/lista/${id}`)
    const resBody = await res.json();
    setNomePagina(resBody.name)
    console.log(resBody)
    if(resBody.items){
      setItens(resBody.items)
    }
  }

  function enviarMensagem() {
    fetch("/mensagem", {
      method: "POST"
    }).then(res => res.json()
      .then(json => console.log(json)))
    alert("Mensagem enviada a todos os elementos do grupo")
    console.log(nomePagina)
  }

  if (listaDeItens.length > 0) {
    return (
      <div className="App">
        <h1>{nomePagina}</h1>
        <div>
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
        <FormularioItem addItem={addItem} />


        <div>
          <p>
            <button onClick={enviarMensagem} type="alert" >Vou às compras</button>
          </p>
        </div>
      </div>


    );
  } else return (
    <div>
      <h1>{nomePagina}</h1>
      <FormularioItem addItem={addItem} />
    </div>
  )
}

export default Lista