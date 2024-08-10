const express = require("express");
const path = require("path");
class Server {
  constructor() {
    this.app = express();
    this.port = 3000;
    this.host = "localhost";
    this.dir = path.join(__dirname, "public");
    this.app.use(express.static(this.dir));
    this.app.set("view engine", "ejs");
    this.routes();
  }
  routes() {
    this.app.get("/", (req, res) => {
      res.render("index");
    });
  }
  start() {
    this.app.listen(this.port, this.host, () => {
      console.log(`Server started at http://${this.host}:${this.port}`);
    });
  }
}

const server = new Server();
server.start();
