import express  from "express";
import listaRouter from './src/routes/compras'
import objetivosRouter from "./src/routes/objetivos";
const PORT = 3001
const app = express()

app.use(express.json())

app.get("/", (req, res) => res.status(200).send('A comunicar'))
app.use("/lista", listaRouter)
app.use('/objetivos', objetivosRouter)


app.listen(PORT, () => console.log(`À escuta em ${PORT}`))