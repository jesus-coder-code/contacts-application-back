/*creamos una funcion que retorne el modelo de contactos. 
Indicamos los campos y de que tipo serán */
module.exports = (sequelize, type) => {
  return sequelize.define("contacts", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: type.STRING,
    number: type.STRING,
    email: type.STRING,
  });
};
