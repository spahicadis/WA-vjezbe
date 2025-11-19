import express from "express";
import { pizze } from "./pizze.js";

const narudzbeRouter = express.Router();

const narudzbe = [];

narudzbeRouter.get("/", (req, res) => {
  res.status(200).json(narudzbe);
});

narudzbeRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const narudzba = narudzbe.find((item) => item.id === Number(id));

  if (!narudzba) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json(narudzba);
});

narudzbeRouter.post("/", (req, res) => {
  const { narudzba, klijent } = req.body;

  const orderRequiredKeys = ["pizza", "velicina", "kolicina"];
  const adressRequiredKeys = ["prezime", "adresa", "broj_telefona"];
  const orderedPizza = [];
  let orderPrice = 0;
  for (const item of narudzba) {
    const keys = Object.keys(item);
    let checkRequired = orderRequiredKeys.every((item) => keys.includes(item));
    if (!checkRequired) {
      return res
        .status(400)
        .json({ message: "Svi potrebni podaci nisu poslani." });
    }
    let pizzaAvailability = pizze.find((pizza) => pizza.naziv === item.pizza);

    if (!pizzaAvailability) {
      return res
        .status(404)
        .json({ message: "Pizza koju ste naručili ne postoji" });
    }

    orderedPizza.push(`${item.pizza} (${item.velicina})`);
    orderPrice += pizzaAvailability.cijena;
  }

  const klijentKeys = Object.keys(klijent);
  let checkAdressRequiredKeys = adressRequiredKeys.every((item) =>
    klijentKeys.includes(item)
  );
  if (!checkAdressRequiredKeys) {
    return res
      .status(400)
      .json({ message: "Svi potrebni podaci nisu poslani." });
  }

  narudzbe.push({ id: narudzbe.length + 1, narudzba });
  res.status(201).json({
    message: `Narudžba za pizze ${orderedPizza.join(
      ","
    )} je uspješno zaprimljena! prezime: ${klijent.prezime}, adresa: ${
      klijent.adresa
    }, ukupna_cijena: ${orderPrice}`,
  });
});

narudzbeRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const narudzbaIndex = narudzbe.findIndex((item) => item.id === Number(id));

  if (narudzbaIndex === -1) {
    return res.status(404).json({ message: "Not Found" });
  }

  narudzbe.splice(narudzbaIndex, 1);

  res.status(204).send();
});

export default narudzbeRouter;
