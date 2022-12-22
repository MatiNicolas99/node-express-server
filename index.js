
require('dotenv').config();
const express = require('express');
const fs = require('fs')
const app = express();
app.use(express.json());

const port = process.env.PORT;



app.listen(port, () => {
    console.log(`¡Servidor http://localhost:${port} encendido!`)
  });
// app.listen(3000, console.log("¡Servidor encendido en el puerto 3000!"));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");

});

app.get("/canciones", (req, res) => {
    const canciones = JSON.parse(fs.readFileSync("canciones.json"));
    res.json(canciones);
    res.end();
});

app.post("/canciones", (req, res) => {

    const cancion = req.body

    const canciones = JSON.parse(fs.readFileSync("canciones.json"))

    canciones.push(cancion)

    fs.writeFileSync("canciones.json", JSON.stringify(canciones))

    res.send("¡Canción agregada con éxito!");
    
    res.end();
});

app.delete("/canciones/:id", (req, res) => {
    const { id } = req.params

    const canciones = JSON.parse(fs.readFileSync("canciones.json"))

    const indice = canciones.findIndex(p => p.id == id)

    canciones.splice(indice, 1)

    fs.writeFileSync("canciones.json", JSON.stringify(canciones))

    res.send("¡Canción eliminada exitosamente!");

    res.end();
});

app.put("/canciones/:id", (req, res) => {
    const { id } = req.params

    const cancion = req.body

    const canciones = JSON.parse(fs.readFileSync("canciones.json"))

    const indice = canciones.findIndex(p => p.id == id)

    canciones[indice] = cancion

    fs.writeFileSync("canciones.json", JSON.stringify(canciones))

    res.send("¡Canción modificada con éxito!");
    
    res.end();
});