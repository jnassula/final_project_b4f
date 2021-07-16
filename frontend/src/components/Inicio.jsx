import { useHistory, useLocation } from "react-router-dom";
import styles from "../styles/Inicio.module.css";
import * as BiIcons from "react-icons/bi";

function InicioButton(){
    const location = useLocation()
    const history = useHistory()

    function voltarInicio(){
        const {pathname} = location
        const lastSlashIndex = pathname.lastIndexOf("/");
        const newPath = pathname.slice(0, lastSlashIndex === 0 ? 1 : lastSlashIndex)
        history.push(newPath)
    }

    if (location.pathname === "/") return null
    
    return (
        <div className={styles.voltar}>
            <button onClick={voltarInicio}>
               <div className={styles.iconVoltar}><BiIcons.BiUndo/></div>
            </button>
        </div>
    )
}

export default InicioButton