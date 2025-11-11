import express from "express";

const pizzeRouter = express.Router();

const pizze = [
  {
    id: 1,
    naziv: "Margarita",
    cijena: 10,
  },
  {
    id: 2,
    naziv: "Mortadela",
    cijena: 12,
  },
  {
    id: 3,
    naziv: "Peperoncion",
    cijena: 12,
  },
  {
    id: 4,
    naziv: "Slavonska",
    cijena: 15,
  },
  {
    id: 5,
    naziv: "Vegetariana",
    cijena: 18,
  },
  {
    id: 6,
    naziv: "Kebab pizza",
    cijena: 12,
  },
  {
    id: 7,
    naziv: "Monte Cavallo",
    cijena: 20,
  },
  {
    id: 8,
    naziv: "4 vrste sira",
    cijena: 15,
  },
  {
    id: 9,
    naziv: "Miješana",
    cijena: 12,
  },
  {
    id: 10,
    naziv: "Capricosa",
    cijena: 13,
  },
];

pizzeRouter.get("/", (req, res) => {
  res.status(200).json(pizze);
});

pizzeRouter.get("/:naziv", (req, res) => {
  const { naziv } = req.params;

  const singlePizza = pizze.find((pizza) => pizza.naziv === naziv);

  if (!singlePizza) {
    return res.status(404).json({ message: "Pizza nije pronadena" });
  }

  res.status(200).json(singlePizza);
});

pizzeRouter.post("/", (req, res) => {
  const { naziv } = req.body;

  const check = pizze.find((pizza) => pizza.naziv === naziv);
  if (check) {
    return res.status(400).json({ message: "Pizza već postoji" });
  }

  const new_id = pizze.at(-1)["id"] + 1;
  if (req.body.id) {
    delete req.body.id;
  }
  const new_data = {
    id: new_id,
    ...req.body,
  };
  pizze.push(new_data);
  res.status(201).json({ message: pizze });
});

pizzeRouter.delete("/:naziv", (req, res) => {
  const { naziv } = req.params;

  if (!naziv) {
    return res
      .status(400)
      .json({ message: "Potrebni podaci nisu dostavljeni" });
  }

  const index_pizza_for_delete = pizze.findIndex(
    (pizza) => pizza.naziv === naziv
  );

  if (index_pizza_for_delete === -1) {
    return res.status(404).json({ message: "Pizza nije pronadena" });
  }

  pizze.splice(index_pizza_for_delete, 1);

  res.status(200).json({ message: "Pizza uspjesno obrisana" });
});

pizzeRouter.patch("/:naziv", (req, res) => {
  const { naziv } = req.params;
  const { cijena } = req.body;

  const index_pizza_for_update = pizze.findIndex(
    (pizza) => pizza.naziv === naziv
  );

  if (index_pizza_for_update === -1) {
    return res.status(404).json({ message: "Pizza nije pronadena" });
  }

  pizze[index_pizza_for_update].cijena = cijena;
  return res.status(200).json({ message: "Cijena pizze uspjesno azurirana" });
});

pizzeRouter.put("/:naziv", (req, res) => {
  const { naziv } = req.params;

  const index_pizza_for_update = pizze.findIndex(
    (pizza) => pizza.naziv === naziv
  );

  if (index_pizza_for_update === -1) {
    return res.status(404).json({ message: "Pizza nije pronadena" });
  }

  pizze[index_pizza_for_update] = req.body;
  return res.status(200).json({ message: "Pizza uspjesno azurirana" });
});

export default pizzeRouter;
