import express  from "express";
import listaRouter from './src/routes/compras'

import objetivosRouter from "./src/routes/objetivos";

import itemRouter from './src/routes/lista'
const PORT = 3001
const app = express()

app.use(express.json())

app.get("/", (req, res) => res.status(200).send('A comunicar'))

app.use("/lista", listaRouter)

app.use('/objetivos', objetivosRouter)

app.use("/item", itemRouter)



app.listen(PORT, () => console.log(`À escuta em ${PORT}`))