import { Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Objetivos.module.css';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';


function Objetivo() {
  const [listaDeObjetivos, updateObjetivos] = useState([])
  const [concluido, updateConcluido] = useState(false)
  const params = useParams();
  const history = useHistory();


  useEffect(() => {
    fetchObjetivo()
  }, [])


  function wizardObjetivo() {
    history.push("/objetivoWizard")
  }


  // Função assíncrona responsável por ir buscar ao back-end os objectivos. 
  // Vai actualizar (updateObjetivos) com o que recebe do backend no resBody.Objetivos
  async function fetchObjetivo() {
    const res = await fetch("/objetivos")
    const resBody = await res.json();
    updateObjetivos(resBody.Objetivos)
  }


  async function contribuirObjetivo(id) {
    const res = await fetch(`objetivos/${id}`, {
      method: "PATCH"
    })
    if (res.status === 200) {
      fetchObjetivo();
    } else if (res.status === 202) {
      updateConcluido(true)
      fetchObjetivo();
    } else console.log("Falhou a actualização do objectivo")
  }



  async function deleteObjetivo(id) {
    const res = await fetch(`/objetivos/${id}`, {
      method: "DELETE"
    })
    if (res.status === 200) {
      console.log(`Objectivo eliminado com sucesso`);
      fetchObjetivo();
    }
  }


  if (!concluido) {

    return (
      <div className="Objetivo">
        {/* <button onClick={() => console.log(listaDeObjetivos)}> consolelog </button> */}
        <button
          onClick={() => wizardObjetivo()}
        > Criar Objetivo
        </button>

        <h1>Objetivos</h1>
        {
          listaDeObjetivos?.map(lista => (
            <li key={lista._id}>
              <p> O seu objetivo é {lista.objetivo} </p>
              <p> A data limite é {lista.prazo} </p>
              <p> O valor a atingir é {lista.valorAtingir} </p>
              <p> Está a {lista.qtdContribuicoes === 1 ? 1 + " contribuição" : `${lista.qtdContribuicoes} contribuições`} de atingir o seu objetivo! </p>

              <button
                onClick={() => deleteObjetivo(lista._id)}
              >
                Apagar
              </button>
              <button onClick={() => contribuirObjetivo(lista._id)} type="submit">Contribuir {lista.valorContribuicoes} €</button>
            </li>
          ))
        }
        <br />
        <div>
          <p>
            <button type="submit">Contribuir</button>
          </p>
        </div>
      </div>
    );
  } else {
    setTimeout(() => {
      updateConcluido(false)
    }, 2200);
    return (
      <h1> Parabéns! Concluiu o seu objetivo! </h1>
    )
  }
}

export default Objetivo;
