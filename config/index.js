import dotenv from "dotenv";

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("Can't find .env file");
}

process.env.NODE_ENV = process.env.NODE_ENV || "development";

export default {
  port: parseInt(process.env.PORT, 10),

  databaseURL: process.env.MONGODB_URI,

  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },

  jwtSecret: process.env.jwtSecret,

  api: {
    prefix: "/api"
  }
};
