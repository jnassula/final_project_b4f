import { useHistory, useLocation } from "react-router-dom"

function Login(){

    const location = useLocation();
    const history = useHistory();

    function mudarCaminho(string){
        const {pathname} = location
        const newPath = pathname.concat(string)
        return newPath
    }

    function irObjetivos(){
        history.push(mudarCaminho("objetivo"))
    }

    function irCompras(){
        history.push(mudarCaminho("lista"))
    }



    return (
        <div>
        <h1> Por favor faça login</h1>
        <button onClick={irObjetivos}>Vá para os objectivos</button> <br/>
        <button onClick={irCompras}>Vá para as suas compras</button>

        </div>
    )
}

export default Login