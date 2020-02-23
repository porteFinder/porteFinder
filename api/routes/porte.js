import { Router } from "express";
import { Container } from "typedi";
import PorteService from "../../services/porte";
import { celebrate, Joi } from "celebrate";
import middleware from "../middleware";

const route = Router();

export default app => {
  app.use("/porte", route);

  route.post(
    "/add_porte",
    middleware.isAuth,
    celebrate({
      body: Joi.object({
        voisin: Joi.array().items(
          Joi.object().keys({
            region: Joi.number().required(),
            min: Joi.number().required(),
            max: Joi.number().required()
          })
        ),
        coo: Joi.string().required(),
        code: Joi.string().allow("")
      })
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.silly("Calling add porte endpoint with body: %o", req.body);
      try {
        const { voisin, coo, code } = req.body;
        const porteServiceInstance = Container.get(PorteService);
        const porte = await porteServiceInstance.add_one(voisin, coo, code);
        return res.json({ msg: "Porte ajoutée.", porte: porte }).end();
      } catch (e) {
        logger.error("error: %o", e);
        return next(e);
      }
    }
  );

  route.get(
    "/get_porte",
    celebrate({
      query: Joi.object({
        coo: Joi.string().required()
      })
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.silly("Calling get porte endpoint with param: %o", req.query.coo);
      try {
        const { coo } = req.query;
        const porteServiceInstance = Container.get(PorteService);
        const portes = await porteServiceInstance.find_porte(coo);
        return res.json({ portes: portes });
      } catch (e) {
        logger.error("error: %o", e);
        return next(e);
      }
    }
  );

  route.get(
    "/autocomplete",
    celebrate({
      query: Joi.object({
        coo: Joi.string().required()
      })
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.silly(
        "Calling get autocomplete endpoint with param: %o",
        req.query.coo
      );
      try {
        const { coo } = req.query;
        const porteServiceInstance = Container.get(PorteService);
        const voisins = await porteServiceInstance.find_voisins(coo);
        return res
          .status(200)
          .json({ voisins: voisins })
          .end();
      } catch (e) {
        logger.error("error: %o", e);
        return next(e);
      }
    }
  );

  route.get("/all", middleware.isAuth, async (req, res, next) => {
    const logger = Container.get("logger");
    logger.silly("Calling get all endpoing from user: %o", req.user.username);
    try {
      const porteServiceInstance = Container.get(PorteService);
      const portes = await porteServiceInstance.find_all();
      return res.status(200).json({ portes: portes });
    } catch (e) {
      logger.error("error: %o", e);
      return next(e);
    }
  });

  route.post(
    "/delete",
    celebrate({
      body: Joi.object({
        id: Joi.string().required()
      })
    }),
    middleware.isAuth,
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.silly("Calling delete endpoint from user: %o", req.user.username);
      try {
        const { id } = req.body;
        const porteServiceInstance = Container.get(PorteService);
        const deleted = await porteServiceInstance.delete_one(id);
        res.json({ msg: "Porte supprimée" });
      } catch (e) {
        logger.error("error: %o", e);
        next(e);
      }
    }
  );

  route.post(
    "/update",
    middleware.isAuth,
    celebrate({
      body: Joi.object({
        porte: Joi.object({
          _id: Joi.string().required(),
          coo: Joi.string().required(),
          code: Joi.string().allow(""),
          voisins: Joi.array().items(
            Joi.object().keys({
              region: Joi.number().required(),
              min: Joi.number().required(),
              max: Joi.number().required()
            })
          ),
          date: Joi.date()
        })
      })
    }),
    async (req, res, next) => {
      const logger = Container.get("logger");
      logger.silly("Calling update endpoint from user: %o", req.user.username);
      try {
        const { porte } = req.body;
        const porteServiceInstance = Container.get(PorteService);
        const updatedPorte = await porteServiceInstance.update_one(porte);
        res
          .status(200)
          .json({ msg: "Porte modifiée", porte: updatedPorte })
          .end();
      } catch (e) {
        logger.error("error: %o", e);
        if (e.name === "CastError") {
          e.message = "Cette porte n'existe pas";
        }
        next(e);
      }
    }
  );
};
