import express from "express";
import { data } from "../data.js";

const boatsRouter = express.Router();

boatsRouter.get("/", (req, res) => {
  if (data.length === 0 || !data) {
    return res.status(404).json({ message: "Traženi podatak ne postoji" });
  }
  res.status(200).json(data);
});

boatsRouter.get("/:name", (req, res) => {
  const { name } = req.params;

  if (!name) {
    return res.status(400).json({ message: "Potrebni podatci nisu poslani." });
  }

  const normalizedRequest = name.toLowerCase();

  const boat = data.find(
    (item) => item.naziv.toLowerCase() === normalizedRequest
  );

  if (!boat) {
    return res.status(404).json({ message: "Brod nije pronaden" });
  }

  res.status(200).json(boat);
});

boatsRouter.post("/", (req, res) => {
  const requiredKeys = ["naziv", "tip", "duljina", "cijenaPoDanu", "motor_hp"];

  const requestKeys = Object.keys(req.body);

  const checkRequiredKeys = requiredKeys.every((key) =>
    requestKeys.includes(key)
  );

  if (!checkRequiredKeys) {
    return res.status(400).json({ message: "Potrebni podatci nisu poslani." });
  }

  const checkBoat = data.find(
    (item) => item.naziv.toLowerCase() === req.body?.naziv.toLowerCase()
  );

  if (checkBoat) {
    return res
      .status(400)
      .json({ message: "Brod sa istim nazivom već postoji" });
  }

  if (req.body?.id) {
    delete req.body.id;
  }

  const id = data[data.length - 1].id + 1;

  data.push({ id, ...req.body });

  res.status(201).json({ id, ...req.body });
});

export default boatsRouter;
