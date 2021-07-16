import express  from "express";
import listaRouter from "./src/routes/compras";
import listaItemRouter from './src/routes/lista'
import objetivosRouter from "./src/routes/objetivos";
import carteiraRouter from "./src/routes/carteira"

const PORT = 3001
const app = express()

app.use(express.json())

app.get("/", (req, res) => res.status(200).send('A comunicar'))

app.use("/lista", listaRouter)
app.use("/lista", listaItemRouter)
app.use('/objetivos', objetivosRouter)
app.use("/saldo", carteiraRouter)




app.listen(PORT, () => console.log(`À escuta em ${PORT}`))