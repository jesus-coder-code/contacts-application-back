const express = require("express");
const routes = express.Router(); //para manejar las rutas de los metodos
const { check, validationResult } = require("express-validator");

//haremos uso del modulo Contact del archivo database.js para nuestros metodos
const { Contact } = require("../database");

//metodo get para obtener los contactos
routes.get("/", async (req, res) => {
  const contacts = await Contact.findAll();
  res.json(contacts);
});

//obtener los contactos por numero de telefono
routes.get("/:number", async (req, res) => {
  const contacts = await Contact.findAll({
    where: { number: req.params.number },
  });
  res.json(contacts);
});

//metodo post para crear nuevos contactos
routes.post(
  "/",
  [
    check("name", "este campo no debe estar vacio").not().isEmpty(),
    check("number", "este campo es de solo numeros").isNumeric(),
    check("email", "esto no es un email").isEmail(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ message: error.array() });
    }

    await Contact.create(req.body);
    res.json({ message: "contact created" });
  }
);

/*el metodo put recibe por parámetros
el id del contacto que queremos modificar*/
routes.put(
  "/:id",
  [
    check("name", "este campo no debe estar vacio").not().isEmpty(),
    check("number", "este campo es de solo numeros").isNumeric(),
    check("email", "esto no es un email").isEmail(),
  ],
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(422).json({ message: error.array() });
    }

    await Contact.update(req.body, { where: { id: req.params.id } });
    res.json({ message: "contact updated" });
  }
);

/*el metodo delete recibe por parámetros
el id del contacto que queremos eliminar*/
routes.delete("/:id", async (req, res) => {
  await Contact.destroy({ where: { id: req.params.id } });
  res.json({ message: "contact eliminated" });
});

module.exports = routes;
