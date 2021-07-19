import { Formik, Field } from 'formik';
import React, { useEffect, useState } from 'react';
import styles from '../styles/Primeira.module.css'




function Primeira({setLoggedIn}){
    return(
        <div className={styles.PaginaInicial}>
            <img src="../docs/imagens/small_logo_ss.png" />
            <img className={styles.BigLogo} src="../docs/imagens/big_logo_ss.png" />
            <div className={styles.FormNome}>
            <Formik
                initialValues={{ name: ""}}
                onSubmit={async (value, {resetForm}) => {
                    setLoggedIn(value.name)
                    //Caso tivessemos mais do que um user e quisessemos gravar o user no backend
                    // const res = await fetch('/', {
                    //     method: "POST", 
                    //     body: JSON.stringify(value),
                    //     headers: { "Content-type": "application/json"}
                    // })
                }
            }
            >
                {
                    ({ handleSubmit}) => (
                        <form onSubmit={handleSubmit}>
                            <Field name="name" 
                            type="text" 
                            placeholder="Insira o seu nome" required />
                            <button type=
                            'submit'>Entrar</button>
                        </form>
                    )
                }
                
            </Formik>
           </div>
        </div>
    
    )}




export default Primeira;
