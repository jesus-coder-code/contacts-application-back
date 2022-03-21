const express = require("express");
const routes = express.Router(); //para manejar las rutas de los metodos

//haremos uso del modulo Contact del archivo database.js para nuestros metodos
const { Contact } = require("../database");

//metodo get para obtener los contactos
routes.get("/", async (req, res) => {
  const contacts = await Contact.findAll();
  res.json(contacts);
});

//metodo post para crear nuevos contactos
routes.post("/", async (req, res) => {
  await Contact.create(req.body);
  res.json({ message: "contact created" });
});

/*el metodo put recibe por parámetros
el id del contacto que queremos modificar*/
routes.put("/:id", async (req, res) => {
  await Contact.update(req.body, { where: { id: req.params.id } });
  res.json({ message: "contact updated" });
});

/*el metodo delete recibe por parámetros
el id del contacto que queremos eliminar*/
routes.delete("/:id", async (req, res) => {
  await Contact.destroy({ where: { id: req.params.id } });
  res.json({ message: "contact eliminated" });
});

module.exports = routes;
