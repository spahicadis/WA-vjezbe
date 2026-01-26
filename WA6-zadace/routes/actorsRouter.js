import { actors } from "../data/data.js";
import {
  chechIfActorExist,
  chechIfActorExistAndIndex,
} from "../middleware/actorsMiddleware.js";
import express from "express";
import { body, validationResult, query, param, oneOf } from "express-validator";

const actorsRouter = express.Router();

actorsRouter.get(
  "/:name",
  [query("*").optional().escape(), param("name").isString().trim()],
  (req, res) => {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ erros: validations.array() });
    }
    const { name } = req.params;
    console.log(name);
    res.status(200).json(actors);
  },
);

//Zakomentirati samo ovu rutu iznad /:name prilikom testiranja /:id
actorsRouter.get(
  "/:id",
  [
    query("*").optional().escape(),
    param("id").isInt(),
    (req, res, next) => {
      const validations = validationResult(req);
      if (!validations.isEmpty()) {
        return res.status(400).json({ erros: validations.array() });
      }
      next();
    },
    chechIfActorExist,
  ],
  (req, res) => {
    res.status(200).json(req.actor);
  },
);

actorsRouter.post(
  "/",
  [
    query("*").optional().escape(),
    body("name").exists(),
    body("birthYear").exists(),
  ],
  (req, res) => {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ erros: validations.array() });
    }

    const id = actors[actors.length - 1].id + 1;

    actors.push({
      id,
      ...req.body,
    });

    res.status(204).send();
  },
);

actorsRouter.patch(
  "/:id",
  [
    query("*").optional().escape(),
    oneOf([body("name").exists(), body("birthYear").exists()]),
    (req, res, next) => {
      const validations = validationResult(req);
      if (!validations.isEmpty()) {
        return res.status(400).json({ erros: validations.array() });
      }
      next();
    },
    chechIfActorExistAndIndex,
  ],
  (req, res) => {
    const currentData = actors[req.actorIndex];

    actors[req.actorIndex] = { ...currentData, ...req.body };

    res.status(204).send();
  },
);

export default actorsRouter;
