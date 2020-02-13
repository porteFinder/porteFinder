import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import expressLoader from "./express";

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info("DB loaded and connected");

  const porteModel = {
    name: "Porte",
    model: require("../models/porte").default
  };

  const VoisinModel = {
    name: "Voisin",
    model: require("../models/Voisin").default
  };

  const userModel = {
    name: "User",
    model: require("../models/user").default
  };

  const dependencies = await dependencyInjectorLoader({
    mongoConnection,
    models: [porteModel, VoisinModel, userModel]
  });

  await expressLoader({ app: expressApp });
  Logger.info("Express loaded");
};
