import express from "express";
import bodyParser from "body-parser";
import routes from "../api";
import config from "../config";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
// import middleware from "../api/middleware";

export default ({ app }) => {
  app.enable("trust proxy");

  app.use(cors());
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(config.api.prefix, routes());

  app.use(express.static(path.join(__dirname, "..", "client", "build")));

  if (process.env.NODE_ENV === "production") {
    app.get("*", (req, res) => {
      res.sendFile(
        path.resolve(__dirname, "..", "client", "build", "index.html")
      );
    });
  }

  // catches 404 and forward them to error handler
  app.use((req, res, next) => {
    const err = new Error("Not Found");
    err["status"] = 404;
    next(err);
  });

  // error handler
  app.use((err, req, res, next) => {
    // jwt 401 err
    if (err.name === "UnauthorizedError") {
      return res
        .status(err.status)
        .send({ message: err.message })
        .end();
    }
    return next(err);
  });

  app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
      errors: {
        message: err.message
      }
    });
  });
};
