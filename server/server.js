const express = require("express");
const cors = require("cors");
const { connectDatabase } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.auth = "/api/auth";
    this.middlewares();
    this.connectDb();
    this.routes();
  }

  conectServer() {
    this.app.listen(this.port, () => {
      console.log(`Server port ${this.port}`);
    });
  }

  connectDb() {
    connectDatabase();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo del body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.auth, require("../routes/auth"));
  }
}

module.exports = Server;
