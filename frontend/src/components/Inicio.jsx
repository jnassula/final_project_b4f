import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/Inicio.module.css";

function InicioButton(){
    const location = useLocation()
    const history = useHistory()

    function voltarInicio(){
        const {pathname} = location
        const lastSlashIndex = pathname.lastIndexOf("/");
        const newPath = pathname.slice(0, lastSlashIndex === 0? 1 : lastSlashIndex)
        history.push(newPath)
    }

    if (location.pathname === "/") return null
    
    return <button onClick={voltarInicio}>Voltar atrás</button>
}

export default InicioButton