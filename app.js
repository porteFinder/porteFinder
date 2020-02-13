import config from "./config";
import Logger from "./loaders/logger";
import express from "express";

async function startServer() {
  const app = express();

  await require("./loaders").default({ expressApp: app });
  app.listen(config.port, err => {
    if (err) {
      Logger.error(err);
      process.exit(1);
    }
    Logger.info(`
        ############################################
          Server listening on port: ${config.port}
        ############################################
    `);
  });
}

startServer();
