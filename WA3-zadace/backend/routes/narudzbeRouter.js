import express from "express";
import { pizze, narudzbe } from "../data/data.js";

const narudzbeRouter = express.Router();

narudzbeRouter.post("/", (req, res) => {
  const { narudzba, dostava } = req.body;

  if (narudzba.length === 0 || !narudzba || !dostava) {
    return res.status(400).json({ message: "Podatci za narudžbu neispravni" });
  }

  let total = 0;

  for (const item of narudzba) {
    const pizza = pizze.find(
      (pizza) => pizza.naziv.toLowerCase() === item.naziv.toLowerCase()
    );

    if (!pizza) {
      return res.status(404).json({ message: "Naručena pizza nije dostupna." });
    }

    const price = pizza.cijene[item.velicina.toLowerCase()];

    if (!price) {
      return res
        .status(404)
        .json({ message: "Naručena veličina nije dostupa." });
    }

    total += price * item.kolicina;
  }

  total = Number(total.toFixed(2));

  const generatedId = narudzbe[narudzbe.length - 1].id + 1;

  narudzbe.push({
    id: generatedId,
    narucene_pizze: narudzba,
    ukupna_cijena: total,
    podaci_dostava: dostava,
  });

  res.status(201).send({ message: "Narudzba uspješno kreirana" });
});

export default narudzbeRouter;
