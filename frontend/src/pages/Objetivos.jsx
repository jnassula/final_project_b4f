import { Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Objetivos.module.css';
import { useParams } from 'react-router';
import { useHistory } from 'react-router';


function Objetivo() {
  const [listaDeObjetivos, updateObjetivos] = useState([])
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




  async function deleteObjetivo(id) {
    const res = await fetch(`/objetivos/${id}`, {
      method: "DELETE"
    })
    if (res.status === 200) {
      console.log(`Objectivo eliminado com sucesso`)
      fetchObjetivo()
    }
  }


  return (
    <div className="Objetivo">
      <button
        onClick={() => wizardObjetivo()}
      > Criar Objetivo
      </button>

      <h1>Objetivos</h1>
      {
        listaDeObjetivos?.map(lista => (
          <li key={lista._id}>
            {` O seu objetivo é: ${lista.obj}`} <br />
            {` A data limite é: ${lista.prazo}`} <br />
            {` O valor a atingir é: ${lista.valor}`} <br />
            <button
              onClick={() => deleteObjetivo(lista._id)}
            >Apagar</button>
          </li>
        ))
      }
      <br />

      <Formik
        initialValues={{ obj: "", prazo: "", valor: "" }}
        onSubmit={async (objeto, { resetForm }) => {
          const res = await fetch("/objetivos", {
            method: "POST",
            body: JSON.stringify(objeto),
            headers: {
              "Content-type": "application/json"
            }
          }).then(res => res.json()
            .then(json => resetForm()))
        }}
      >

        {
          ({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <Field name="obj" type="text" placeholder="Defina aqui o seu objetivo" required />
              <Field name="prazo" type="date" placeholder="Data" required />
              <Field name="valor" placeholder="Quanto quer poupar?" required />
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
