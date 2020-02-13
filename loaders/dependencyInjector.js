import LoggerInstance from "./logger";
import { Container } from "typedi";
import bcrypt from "bcryptjs";
import config from "../config";
import jwt from "jsonwebtoken";

export default ({ mongoConnection, models }) => {
  try {
    models.forEach(m => {
      Container.set(m.name, m.model);
    });

    Container.set("logger", LoggerInstance);
    Container.set("bcrypt", bcrypt);
    Container.set("jwt", jwt);

    LoggerInstance.info("Agenda injected into container");

    return Container;
  } catch (e) {
    LoggerInstance.error("Error on dependency injector loader: %o", e);
    throw e;
  }
};
