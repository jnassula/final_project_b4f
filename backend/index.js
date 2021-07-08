import express  from "express";
const PORT = 3001
const app = express()


app.use(express.json())

// Teste back e front
app.get('/', (req, res) => {
    res.status(200).json({
        message: "A comunicar back e front"
    })
})


// POST para adicionar items à lista
app.post('/itens', async (req, res) => {
    const itens = req.body
    res.status(200).json({itens})
})



app.listen(PORT, () => console.log(`À escuta em ${PORT}`))