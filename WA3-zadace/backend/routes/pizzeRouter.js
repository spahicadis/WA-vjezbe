import express from "express";
import { pizze, narudzbe } from "../data/data.js";

const pizzeRouter = express.Router();

pizzeRouter.get("/", (req, res) => {
  if (!pizze) {
    return res.status(404).json({ message: "Podatci za pizze ne postoje" });
  }
  res.status(200).json(pizze);
});

pizzeRouter.get("/:naziv", (req, res) => {
  const { naziv } = req.params;

  if (!isNaN(naziv)) {
    return res
      .status(400)
      .json({ message: "Poslani naziv pizze nije ispranvog formata" });
  }

  const pizza = pizze.find(
    (item) => item.naziv.toLowerCase() === naziv.toLowerCase()
  );

  if (!pizza) {
    return res
      .status(404)
      .json({ message: "Pizza sa poslanim nazivom ne postoji" });
  }

  res.status(200).json(pizza);
});

export default pizzeRouter;
