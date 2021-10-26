const express = require("express");
const app = express();
const { cuentaSchema, carritoSchema } = require("./utils/schema.js");

app.use(express.json());

// APIS mockeadas
const articulos = [
  {
    id: 1,
    nombre: "martillo",
    categoria: "herramientas",
  },
  {
    id: 2,
    nombre: "pintura-latex",
    categoria: "pinturas",
  },
  {
    id: 3,
    nombre: "tv-led",
    categoria: "electronica",
  },
];

const cuentas = [
  {
    id: 1,
    user: "juan",
    password: "1234",
  },
  {
    id: 2,
    user: "agostina",
    password: "5678",
  },
  {
    id: 3,
    user: "testing",
    password: "testing1234",
  },
];

const carrito = [
  {
    id: 1,
    articulo: "taladro",
    cantidad: 2,
  },
  {
    id: 2,
    articulo: "pintura-latex",
    cantidad: 1,
  },
  {
    id: 3,
    articulo: "silla-plastica",
    cantidad: 6,
  },
];

// (TC004 - TC005) GET total articulos
app.get("/api/articulos", (request, response) => {
  response.send(articulos);
});

// (TC003) GET por categoria
app.get("/api/articulos/:categoria", (request, response) => {
  const articuloCategoria = request.params.categoria;
  const articulo = articulos.find(
    (articulo) => articulo.categoria === articuloCategoria
  );
  if (!articulo) {
    return response
      .status(404)
      .send("No existe ningun articulo dentro de esa categoria");
  }
  response.send(articulo);
});

// (TC004 - TC005) GET por nombre
app.get("/api/articulos/categoria/:nombre", (request, response) => {
  const articuloNombre = request.params.nombre;
  const articulo = articulos.find(
    (articulo) => articulo.nombre === articuloNombre
  );
  if (!articulo) {
    return response
      .status(404)
      .send("No existe ningun articulo que contenga ese nombre");
  }
  response.send(articulo);
});

// (TC007) GET total carrito
app.get("/api/carrito", (request, response) => {
  response.send(carrito);
});

// (TC001) POST alta de cuenta
app.post("/api/cuentas", (request, response) => {
  const { error, value } = cuentaSchema.validate(request.body);

  if (error)
    return response
      .status(400)
      .send(
        "El nombre y la contrasena deben tener minimo 3 y maximo 15 caracteres"
      );

  const cuenta = {
    id: cuentas.length + 1,
    user: request.body.user,
    password: request.body.password,
  };
  cuentas.push(cuenta);
  response.status(201).send(cuenta);
});

// (TC006) POST agregar al carrito
app.post("/api/carrito", (request, response) => {
  const { error, value } = carritoSchema.validate(request.body);

  if (error)
    return response
      .status(400)
      .send(
        "El articulo debe tener entre 3 y 15 caracteres. La cantidad debe ser un numero"
      );

  const carritoSingle = {
    id: carrito.length + 1,
    articulo: request.body.articulo,
    cantidad: request.body.cantidad,
  };
  carrito.push(carritoSingle);
  response.status(201).send(carritoSingle);
});

// (TC008) PUT editar carrito
app.put("/api/carrito/:id", (request, response) => {
  const carritoId = request.params.id;
  const carritoItem = carrito.find(
    (carritoItem) => carritoItem.id === parseInt(carritoId)
  );
  if (!carritoItem) {
    return response.status(404).send("El item no existe");
  }

  const { error, value } = carritoSchema.validate(request.body);

  if (error)
    return response
      .status(400)
      .send(
        "La cantidad debe ser un numero. El nombre del articulo debe tener entre 3 y 15 caracteres"
      );

  carritoItem.articulo = request.body.articulo;
  carritoItem.cantidad = request.body.cantidad;

  response.send(carritoItem);
});

// (TC009) DELETE articulo del carrito
app.delete("/api/carrito/:id", (request, response) => {
  const articuloId = request.params.id;
  const articulo = carrito.find(
    (carrito) => carrito.id === parseInt(articuloId)
  );
  if (!articulo) {
    return response.status(404).send("No existe item del carrito con ese id");
  }

  const index = carrito.indexOf(articulo);
  carrito.splice(index, 1);
  response.send(articulo);
});

const port = process.env.PORT || 3000;
module.exports = app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
