import { Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Objetivos.module.css';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';
import * as BiIcons from "react-icons/bi";


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
      <div className={styles.Objetivos}>
        <div className={styles.bgWizard}>
          <button
              onClick={() => wizardObjetivo()}
          > 
            <BiIcons.BiPlus />
            Criar Objetivo
          </button>
          <h1>Objetivos</h1>
        </div>
        {
          listaDeObjetivos?.map(lista => (
            <div className={styles.card}>
                <li key={lista._id}>
                <p> O seu objetivo é {lista.objetivo} </p>
                <p> A data limite é {lista.prazo} </p>
                <p> O valor a atingir é {lista.valorAtingir} </p>
                <p className={styles.pObjetivos}> Está a {lista.qtdContribuicoes === 1 ? 1 + " contribuição" : `${lista.qtdContribuicoes} contribuições`} de atingir o seu objetivo! </p>
                <div className={styles.btnObjetivos}>
                  <button className={styles.btnContribuir} onClick={() => contribuirObjetivo   (lista._id)} type="submit">Contribuir {lista.valorContribuicoes} €
                  </button>
                  <button className={styles.deleteObjetivos}
                    onClick={() => deleteObjetivo(lista._id)}
                  >
                    Apagar
                  </button>
                </div>
              
              </li>
            </div>
            
          ))
        }
        
        
      </div>
    );
  } else {
    setTimeout(() => {
      updateConcluido(false)
    }, 3200);
    return (
      <div className={styles.congratsWizard}>
        <h1> Parabéns! Concluiu o seu objetivo! </h1>
        <img src="../docs/imagens/congratulations.gif" />
      </div>
      
    )
  }
}

export default Objetivo;
