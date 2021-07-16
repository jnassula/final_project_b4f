
import { Link } from "react-router-dom"
import { Formik, Field } from 'formik';


function Primeira({setLoggedIn}){
    return(
        <div>
        <Formik>
             <form>
              <Field name="pessoa" type="text" placeholder="Insira o seu nome" required />
            </form>
    
    </Formik><button onClick={() => setLoggedIn(true)}>Entrar</button>
    </div>
    
    )}




export default Primeira;
