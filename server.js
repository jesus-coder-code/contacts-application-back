const express = require("express");

//importamos el fichero routes.js para manejar nuestras rutas
const routes = require("./routes/routes");

const app = express();
//definimos el puerto donde vamos a usar nuestra api
const port = process.env.PORT || 5000;

/*importamos el script de database para que 
nuestra api se conecte a la base de datos*/
require("./database");

//nuestros datos se mostrarán en formato json
app.use(express.json());

app.get("/", (req, res) => {
  res.send("primera api en express");
});

/*
le indicamos a nuestra api que toda peticion con la url 
contacts sea manejada por el fichero routes.js
*/
app.use("/contacts", routes);

app.listen(port, () => {
  console.log("express is running on port:", port);
});
