let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

// assertion style
chai.should();

chai.use(chaiHttp);

/**
 * Tests:
 */

describe("Articulos API GET total", () => {
  // (TC004 - TC005) GET total articulos
  describe("GET /api/articulos", () => {
    it("Deberia obtener listado total de articulos", (done) => {
      chai
        .request(server)
        .get("/api/articulos")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          response.body.length.should.be.eq(3);
          done();
        });
    });

    it("No deberia obtener el listado total de articulos", (done) => {
      chai
        .request(server)
        .get("/api/undefined")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});

describe("Articulos API GETpor categoria", () => {
  // (TC003) GET por categoria
  describe("GET /api/articulos/:categoria", () => {
    it("Deberia obtener listado de articulos por categoria", (done) => {
      const categoria = "pinturas";
      chai
        .request(server)
        .get("/api/articulos/" + categoria)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("nombre");
          response.body.should.have.property("categoria");
          response.body.should.have.property("categoria").eq(categoria);
          done();
        });
    });

    it("No deberia obtener listado de articulos por categoria", (done) => {
      const categoria = "undefined";
      chai
        .request(server)
        .get("/api/articulos/" + categoria)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq(
            "No existe ningun articulo dentro de esa categoria"
          );
          done();
        });
    });
  });
});

describe("Articulos API GET por nombre", () => {
  // (TC004 - TC005) GET por nombre
  describe("GET /api/articulos/categoria/:nombre", () => {
    it("Deberia obtener listado de articulos por nombre", (done) => {
      const nombre = "martillo";
      chai
        .request(server)
        .get("/api/articulos/categoria/" + nombre)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id");
          response.body.should.have.property("nombre");
          response.body.should.have.property("categoria");
          response.body.should.have.property("nombre").eq(nombre);
          done();
        });
    });

    it("No deberia obtener listado de articulos por nombre", (done) => {
      const nombre = "undefined";
      chai
        .request(server)
        .get("/api/articulos/categoria/" + nombre)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq(
            "No existe ningun articulo que contenga ese nombre"
          );
          done();
        });
    });
  });
});

describe("Carrito API GET total", () => {
  // (TC007) GET total carrito
  describe("GET /api/carrito", () => {
    it("Deberia obtener listado total de cada item del carrito", (done) => {
      chai
        .request(server)
        .get("/api/carrito")
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("array");
          done();
        });
    });

    it("No deberia obtener listado total de cada item del carrito", (done) => {
      chai
        .request(server)
        .get("/api/undefined")
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});

describe("Cuentas API POST", () => {
  // (TC001) POST alta de cuenta
  describe("POST /api/cuentas", () => {
    it("Deberia dar de alta una nueva cuenta", (done) => {
      const cuenta = {
        user: "cuenta-test",
        password: "1234",
      };
      chai
        .request(server)
        .post("/api/cuentas")
        .send(cuenta)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(4);
          response.body.should.have.property("user").eq("cuenta-test");
          response.body.should.have.property("password").eq("1234");
          done();
        });
    });

    it("No deberia dar de alta una nueva cuenta", (done) => {
      const cuenta = {
        password: undefined,
      };
      chai
        .request(server)
        .post("/api/cuentas")
        .send(cuenta)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "El nombre y la contrasena deben tener minimo 3 y maximo 15 caracteres"
          );
          done();
        });
    });
  });
});

describe("Carrito API POST", () => {
  // (TC006) POST agregar al carrito
  describe("POST /api/carrito", () => {
    it("Deberia agregar un nuevo producto al carrito", (done) => {
      const itemCarrito = {
        articulo: "tupper",
        cantidad: 7,
      };
      chai
        .request(server)
        .post("/api/carrito")
        .send(itemCarrito)
        .end((err, response) => {
          response.should.have.status(201);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(4);
          response.body.should.have.property("articulo").eq("tupper");
          response.body.should.have.property("cantidad").eq(7);
          done();
        });
    });

    it("No deberia agregar un nuevo producto al carrito", (done) => {
      const itemCarrito = {
        cantidad: undefined,
      };
      chai
        .request(server)
        .post("/api/carrito")
        .send(itemCarrito)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "El articulo debe tener entre 3 y 15 caracteres. La cantidad debe ser un numero"
          );
          done();
        });
    });
  });
});

describe("Carrito API PUT", () => {
  // (TC008) PUT editar carrito
  describe("PUT /api/carrito/:id", () => {
    it("Deberia editar la cantidad de un item del carrito", (done) => {
      const carritoItemId = 1;
      const carritoItem = {
        articulo: "taladro",
        cantidad: 5,
      };
      chai
        .request(server)
        .put("/api/carrito/" + carritoItemId)
        .send(carritoItem)
        .end((err, response) => {
          response.should.have.status(200);
          response.body.should.be.a("object");
          response.body.should.have.property("id").eq(carritoItemId);
          response.body.should.have
            .property("articulo")
            .eq(carritoItem.articulo);
          response.body.should.have
            .property("cantidad")
            .eq(carritoItem.cantidad);
          done();
        });
    });

    it("No deberia editar la cantidad de un item del carrito", (done) => {
      const carritoItemId = 1;
      const carritoItem = {
        articulo: "ta",
        cantidad: undefined,
      };
      chai
        .request(server)
        .put("/api/carrito/" + carritoItemId)
        .send(carritoItem)
        .end((err, response) => {
          response.should.have.status(400);
          response.text.should.be.eq(
            "La cantidad debe ser un numero. El nombre del articulo debe tener entre 3 y 15 caracteres"
          );
          done();
        });
    });
  });
});

describe("Carrito API PUT", () => {
  // (TC009) DELETE articulo del carrito
  describe("DELETE /api/carrito/:id", () => {
    it("Deberia eliminar un item existente del carrito", (done) => {
      const carritoItem = 2;
      chai
        .request(server)
        .delete("/api/carrito/" + carritoItem)
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it("No deberia eliminar un item existente del carrito", (done) => {
      const carritoItem = undefined;
      chai
        .request(server)
        .delete("/api/carrito/" + carritoItem)
        .end((err, response) => {
          response.should.have.status(404);
          response.text.should.be.eq("No existe item del carrito con ese id");
          done();
        });
    });
  });
});
