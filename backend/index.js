import express  from "express";
import listaRouter from '../backend/src/routes/lista'
const PORT = 3001
const app = express()
// import getCollection from "./src/data/db"
app.use(express.json())

app.get("/", (req, res) => res.status(200).send('A comunicar'))
app.use("/", listaRouter)


app.listen(PORT, () => console.log(`À escuta em ${PORT}`))