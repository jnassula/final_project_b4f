import { Formik, Field } from 'formik';
import styles from '../styles/Primeira.module.css'


function Primeira({setLoggedIn}){
    return(
        <div className={styles.PaginaInicial}>
            <img src="../docs/imagens/small_logo_ss.png" />
            <img className={styles.BigLogo} src="../docs/imagens/big_logo_ss.png" />
            <Formik>
                <form>
                    <Field name="pessoa" type="text" placeholder="Insira o seu nome" required />
                </form>
            </Formik>
            <button onClick={() => setLoggedIn(true)}>Entrar</button>
        </div>
    
    )}




export default Primeira;
