const morgan = require("morgan");
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const { contactRouter } = require("./routes/contactRouter");
const userRouter = require("./routes/userRouter");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

exports.CRUDServer = class CRUDServer {
  constructor() {
    this.app = null;
  }

  async start() {
    this.initServer();
    this.initMiddlewares();
    await this.initDbConnection();
    this.initRoutes();
    this.initErrorHandling();
    this.initListening();
  }

  initServer() {
    this.app = express();
  }

  initMiddlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(morgan("combined"));
  }

  async initDbConnection() {
    try {
      mongoose.set("useCreateIndex", true);
      await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      });
      console.log("Successfully connected to DB !");
    } catch (error) {
      process.exit(1);
    }
  }

  initRoutes() {
    this.app.use("/api/contacts", contactRouter);
    this.app.use("/users", userRouter);
    this.app.use("/auth", userRouter);
  }

  initErrorHandling() {
    this.app.use((err, req, res, next) => {
      const status = err.status || 500;
      return res.status(status).send(err.message);
    });
  }

  startListening() {
    this.app.listen(process.env.PORT, console.log("start app"));
  }

  initListening() {
    this.app.listen(process.env.PORT, () => {
      console.log("Started listening on port", process.env.PORT);
    });
  }
};
