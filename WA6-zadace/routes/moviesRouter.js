import { movies } from "../data/data.js";
import {
  chechIfMovieExist,
  chechIfMovieExistAndIndex,
} from "../middleware/moviesMiddleware.js";
import express from "express";
import { body, validationResult, query, param, oneOf } from "express-validator";

const moviesRouter = express.Router();

moviesRouter.get(
  "/",
  [
    query("*").optional().escape(),
    query("min_year").optional().isInt(),
    query("max_year").optional().isInt(),
    query()
      .custom((_, { req }) => {
        const { min_year, max_year } = req.query;
        if (min_year && max_year) {
          if (Number(req.query.min_year) >= Number(req.query.max_year)) {
            return false;
          } else {
            return true;
          }
        } else {
          return true;
        }
      })
      .withMessage("min_year mora biti manji od max_year"),
  ],
  (req, res) => {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ erros: validations.array() });
    }
    res.status(200).json(movies);
  },
);

moviesRouter.get(
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
    chechIfMovieExist,
  ],
  (req, res) => {
    res.status(200).json(req.movie);
  },
);

moviesRouter.post(
  "/",
  [
    query("*").optional().escape(),
    body("title").exists(),
    body("year").exists(),
    body("genre").exists(),
    body("director").exists(),
  ],
  (req, res) => {
    const validations = validationResult(req);
    if (!validations.isEmpty()) {
      return res.status(400).json({ erros: validations.array() });
    }

    const id = movies[movies.length - 1].id + 1;

    movies.push({
      id,
      ...req.body,
    });
    res.status(204).send();
  },
);

moviesRouter.patch(
  "/:id",
  [
    query("*").optional().escape(),
    oneOf([
      body("title").exists(),
      body("year").exists(),
      body("genre").exists(),
      body("director").exists(),
    ]),
    (req, res, next) => {
      const validations = validationResult(req);
      if (!validations.isEmpty()) {
        return res.status(400).json({ erros: validations.array() });
      }
      next();
    },
    chechIfMovieExistAndIndex,
  ],
  (req, res) => {
    const currentData = movies[req.movieIndex];

    movies[req.movieIndex] = { ...currentData, ...req.body };

    res.status(204).send();
  },
);

export default moviesRouter;
