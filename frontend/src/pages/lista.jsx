import { Formik, Field } from 'formik';
import { useEffect, useState } from 'react';
import {useHistory} from 'react-router-dom'

function Lista (){

    const [listaDeItens, setItens] = useState([])
    const history = useHistory();


    async function fetchItens(){
      const res = await fetch("/item")
      const resBody = await res.json();
      console.log(res.body)
      setItens(resBody.itens)
    }

    useEffect(() => {
      fetchItens()}, []
     
    )
  
  
    async function adicionarItem(item){
      setItens(prevState => {
        const novoState = prevState.concat(item)
        return novoState
      })
      console.log("Adicionar item executado")
    }
    // Esta função assíncrona vai adicionarItem, recebendo o item. Chama o updateLista, com o estado anterior e fazemos concat ao item recebido pelo POST
    // Returnamos o novo estado, com o item adicionado.
    // Esta função é chamada onSubmit (o Formik faz a comunicação)
  
    function enviarMensagem(){
      fetch("/mensagem", {
        method: "POST"
      }).then(res => res.json()
      .then(json => console.log(json)))
      alert("Mensagem enviada a todos os elementos do grupo")
    }
  

    return (
        <div className="App">
          <div>
          
            {listaDeItens.map(item => (
              <li
              key={item._id}
              >
                {item.descricao}{" "}
                {item.quantidade}
                {item.unidade}
                <button 
                  onClick={async () => {
                  const res = await fetch(`/item/${item._id}`, {
                      method: "DELETE"
                })
                if (res.status === 200) {
                  console.log("Item registado")
                  fetchItens()
                }
                }} > Eliminar item</button>
              </li>
            ))}
          </div>
    
    
          <Formik
            initialValues={{descricao: "", quantidade: "", unidade: "un"}}
            onSubmit={async (values, {resetForm} ) => {
            const res = await fetch("/item", {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-type": "application/json"
              }
            })

            console.log(res.status)
            await adicionarItem(values)
            if (res.status === 201){
              console.log("Item resultou")
              resetForm()
              fetchItens()
            }
          }}
          >
          
          {
            ({handleSubmit}) => (
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
                <button onClick={enviarMensagem} type = "alert" >Vou às compras</button>
              </p>
            </div>
            
        </div>
    );
}

export default Lista