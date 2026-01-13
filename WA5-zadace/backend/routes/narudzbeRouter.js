import express from "express";
import { db } from "../index.js";
import { isOrderRequestValid } from "../helpers/validate.js";

const narudzbeRouter = express.Router();

narudzbeRouter.post("/", async (req, res) => {
  const { narucene_pizze } = req.body;

  const validate = isOrderRequestValid(req.body);

  if (!validate) {
    return res
      .status(400)
      .json({ message: "Poslani podatci za narudžbu neispravni" }); //Generično radi jednostavnosti, mogao bi helper vraćati i specifičniji message
  }

  let total = 0;

  for (const item of narucene_pizze) {
    try {
      const pizza = await db.collection("pizze").findOne({ naziv: item.naziv });

      if (!pizza) {
        return res
          .status(404)
          .json({ message: "Naručena pizza nije dostupna." });
      }

      const price = pizza.cijene[item.velicina.toLowerCase()];

      if (!price) {
        return res
          .status(404)
          .json({ message: "Naručena veličina nije dostupa." });
      }

      total += price * item.kolicina;
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Pogreška prilikom obrade stavki narudžbe" });
    }
  }

  total = Number(total.toFixed(2));

  try {
    const { insertedId } = await db.collection("narudzbe").insertOne({
      ...req.body,
      ukupna_cijena: total,
    });
    const data = await db.collection("narudzbe").findOne({ _id: insertedId });
    res.status(201).json({ message: "Narudzba uspješno kreirana", data });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Pogreška prilikom kreiranja narudžbe" });
  }
});

export default narudzbeRouter;
