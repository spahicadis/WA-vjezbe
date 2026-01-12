import express from "express";
import { db } from "../index.js";
import { isPizzaRequestValid } from "../helpers/validate.js";

const pizzeRouter = express.Router();

pizzeRouter.get("/", async (req, res) => {
  const { naziv, cijena_min, cijena_max, sort } = req.query;

  const query = {};
  const sortQuery = {};

  if (naziv) {
    query.naziv = { $regex: naziv, $options: "i" };
  }

  if (cijena_min) {
    query["cijene.mala"] = { $gt: Number(cijena_min) };
  }

  if (cijena_max) {
    query["cijene.jumbo"] = { $lt: Number(cijena_max) };
  }

  if (Number(sort) === 1) {
    sortQuery["cijene.mala"] = Number(sort); //asc
  }
  if (Number(sort) === -1) {
    sortQuery["cijene.jumbo"] = Number(sort); //desc
  }

  try {
    const data = await db
      .collection("pizze")
      .find(query)
      .sort(sortQuery)
      .toArray();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: "Greška prilikom dohvata svih pizza" });
  }
});

pizzeRouter.get("/:naziv", async (req, res) => {
  const { naziv } = req.params;

  if (!isNaN(naziv)) {
    return res
      .status(400)
      .json({ message: "Poslani naziv pizze nije ispranvog formata" });
  }

  try {
    const data = await db.collection("pizze").findOne({ naziv: naziv });

    if (!data) {
      return res
        .status(404)
        .json({ message: "Pizza sa poslanim nazivom ne postoji" });
    }
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({
      message: "Pogreška prilikom dohvata pojedine pizze prema nazivu",
    });
  }
});

pizzeRouter.post("/", async (req, res) => {
  try {
    const { insertedId } = await db.collection("pizze").insertOne(req.body);
    const data = await db.collection("pizze").findOne({ _id: insertedId });
    res.status(201).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default pizzeRouter;
