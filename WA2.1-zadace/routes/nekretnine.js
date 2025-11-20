import express from "express";

const nekretnineRouter = express.Router();

export const nekretnine = [
  {
    id: 1,
    naziv: "Villa Ponte Porton",
    opis: "Predivna villa u središtu Istre",
    cijena: 600500,
    lokacija: "Grožnjan",
    broj_soba: 9,
    povrsina: 250,
  },
];

nekretnineRouter.get("/", (req, res) => {
  res.status(200).json(nekretnine);
});

nekretnineRouter.get("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const nekretnina = nekretnine.find((item) => item.id === Number(id));

  if (!nekretnina) {
    return res.status(404).json({ message: "Not Found" });
  }

  res.status(200).json(nekretnina);
});

nekretnineRouter.post("/", (req, res) => {
  const requiredKeys = [
    "naziv",
    "opis",
    "cijena",
    "lokacija",
    "broj_soba",
    "povrsina",
  ];

  const requestKeys = Object.keys(req.body);
  const checkRequiredKeys = requiredKeys.every((key) =>
    requestKeys.includes(key)
  );
  if (!checkRequiredKeys) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (req.body.cijena < 0 || req.body.povrsina < 0) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const id = nekretnine[nekretnine.length - 1].id + 1;
  nekretnine.push({ id, ...req.body });

  res.status(201).json({ id, ...req.body });
});

nekretnineRouter.put("/:id", (req, res) => {
  const { id } = req.params;
  const requiredKeys = [
    "naziv",
    "opis",
    "cijena",
    "lokacija",
    "broj_soba",
    "povrsina",
  ];

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const requestKeys = Object.keys(req.body);
  const checkRequiredKeys = requiredKeys.every((key) =>
    requestKeys.includes(key)
  );
  if (!checkRequiredKeys) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (req.body.cijena < 0 || req.body.povrsina < 0) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const index = nekretnine.findIndex((item) => item.id === Number(id));

  if (index === -1) {
    return res.status(404).json({ message: "Not Found" });
  }
  const normalizedID = Number(id);
  nekretnine[index] = {
    id: normalizedID,
    ...req.body,
  };

  res.status(200).json(nekretnine[index]);
});

nekretnineRouter.patch("/:id", (req, res) => {
  const { id } = req.params;
  const allowedKeys = [
    "naziv",
    "opis",
    "cijena",
    "lokacija",
    "broj_soba",
    "povrsina",
  ];

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const requestKey = Object.keys(req.body);
  const checkAllowedKeys = requestKey.every((key) => allowedKeys.includes(key));
  if (!checkAllowedKeys) {
    return res.status(400).json({ message: "Bad Request" });
  }

  for (const [key, value] of Object.entries(req.body)) {
    if (key === "cijena" || key === "povrsina") {
      if (value < 0) {
        return res.status(400).json({ message: "Bad Request" });
      }
    }
  }

  const index = nekretnine.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: "Not Found" });
  }

  nekretnine[index] = { ...nekretnine[index], ...req.body };

  res.status(200).json(nekretnine[index]);
});

nekretnineRouter.delete("/:id", (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(id)) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const index = nekretnine.findIndex((item) => item.id === Number(id));
  if (index === -1) {
    return res.status(404).json({ message: "Not Found" });
  }

  nekretnine.splice(index, 1);
  res.status(204).send();
});

export default nekretnineRouter;
