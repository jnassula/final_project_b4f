function Compras(){

    function criarLista(){
        // POST QUE VAI CRIAR UMA NOVA LISTA (é um objecto que contém um array de objectos, inserido na colecao compras)
        console.log("Olá compras")
    };


    return(
        <div>
            <h1> Lista de compras</h1>
            <button onClick={criarLista}>Criar lista de compras</button>
        </div>

    )
}

export default Compras