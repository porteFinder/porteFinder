import { Router } from "express";
import { Container } from "typedi";
import AuthService from "../../services/auth";
import middleware from "../middleware";
import { celebrate, Joi } from "celebrate";

const route = Router();

export default app => {
  app.use("/auth", route);

  route.get("/ensureLogged", middleware.isAuth, (req, res, next) =>
    res.status(200).json({ user: { username: req.user.username } })
  );

  route.post(
    "/login",
    celebrate({
      body: Joi.object({
        username: Joi.string().required(),
        password: Joi.string().required()
      })
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.debug("Calling login endpoint with body: %o", req.body);
      try {
        const { username, password } = req.body;
        const authServiceInstance = Container.get(AuthService);
        const { user, token } = await authServiceInstance.login(
          username,
          password
        );
        res
          .cookie("token", token, { httpOnly: true })
          .json({ msg: "Connecté" })
          .end();
      } catch (e) {
        logger.error("error: %o", e);
        return next(e);
      }
    }
  );
};
