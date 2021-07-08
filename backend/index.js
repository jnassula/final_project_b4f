import express  from "express";
const PORT = 3001
const app = express()


app.use(express.json())


app.get('/', (req, res) => {
    res.status(200).json({
        message: "A comunicar back e front"
    })
})

app.get('/teste', (req, res) => {
    console.log("Teste1")
    res.status(200).json({
        
        message: "Pedido frontend"

    })
})



app.listen(PORT, () => console.log(`À escuta em ${PORT}`))