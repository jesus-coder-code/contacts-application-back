const Sequelize = require("sequelize"); //importamos nuestro ORM Sequelize
const ContactModel = require("./models/contacts"); //importamos nuestro modelo de la carpeta models

//indicamos los parametros para realizar la conexion a nuestra base de datos
const sequelize = new Sequelize("jesus_express", "jesus", "51246380", {
  host: "mysql-jesus.alwaysdata.net",
  dialect: "mysql",
});

/*agregamos nuestros modelos para que al momento de 
conectarse a la base de datos cree nuestras tablas*/
const Contact = ContactModel(sequelize, Sequelize);

/*sincronizamos nuestros modelos con la base
de datos para crear nuestras tablas*/
sequelize.sync({ force: false }).then(() => {
  console.log("tablas creadas");
});

//indicamos nuestros modulos a exportar
module.exports = {
  Contact,
};
