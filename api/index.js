import { Router } from "express";
import porte from "./routes/porte";
import auth from "./routes/auth";

export default () => {
  const app = Router();
  porte(app);
  auth(app);

  return app;
};
