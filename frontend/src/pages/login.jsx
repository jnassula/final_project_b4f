import { useHistory, useLocation } from "react-router-dom"

function Login(){

    const location = useLocation();
    const history = useHistory();

    function mudarCaminho(string){
        const {pathname} = location
        const newPath = pathname.concat(string)
        return newPath
    }


    function irLista(){
        history.push(mudarCaminho("lista"))
    }

    function irObjetivos(){
        history.push(mudarCaminho("objetivo"))
       
    }



    return (
        <div>
        <h1> Por favor faça login</h1>
        <button onClick={irLista}>Vá para à lista</button>
        <button onClick={irObjetivos}>Vá para os objectivos</button>
        </div>
    )
}

export default Login