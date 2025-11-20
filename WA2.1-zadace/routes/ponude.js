import express from "express";
import { nekretnine } from "./nekretnine.js";

const ponudeRouter = express.Router();

const ponude = [];

ponudeRouter.post("/", (req, res) => {
  const requiredKeys = [
    "id_nekretnine",
    "ime_kupca",
    "prezime_kupca",
    "ponudena_cijena",
    "broj_telefona_kupca",
  ];

  const requestKeys = Object.keys(req.body);
  const checkRequiredKeys = requiredKeys.every((item) =>
    requestKeys.includes(item)
  );
  if (!checkRequiredKeys) {
    return res.status(400).json({ message: "Bad Request" });
  }

  if (req.body.ponudena_cijena < 0) {
    return res.status(400).json({ message: "Bad Request" });
  }

  const checkNekretnina = nekretnine.find(
    (item) => item.id === Number(req.body.id_nekretnine)
  );
  if (!checkNekretnina) {
    return res.status(404).json({ message: "Not Found" });
  }

  let generatedID =
    ponude.length > 0 ? ponude[ponude.length - 1].id_ponude + 1 : 1;

  const data = {
    id_ponude: generatedID,
    ...req.body,
  };

  ponude.push(data);

  res.status(201).json(ponude);
});

export default ponudeRouter;
