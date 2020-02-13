import dotenv from "dotenv";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();

if (!envFound) {
  throw new Error("Can't find .env file");
}

export default {
  port: parseInt(process.env.PORT, 10),

  databaseURL: process.env.MONGODB_URI,

  logs: {
    level: process.env.LOG_LEVEL || "silly"
  },

  jwtSecret: "s0m3_uLtr4-ran2om_3tr1ng",

  api: {
    prefix: "/api"
  }
};
