/**
 * Con Joi hacemos validaciones de datos en base a esquemas.
 */
const Joi = require("joi");

const cuentaSchema = Joi.object({
  user: Joi.string().min(3).max(15).required(),
  password: Joi.string().min(3).max(15).required(),
});

const carritoSchema = Joi.object({
  articulo: Joi.string().min(3).max(15).required(),
  cantidad: Joi.number().positive().required(),
});

module.exports.cuentaSchema = cuentaSchema;
module.exports.carritoSchema = carritoSchema;
