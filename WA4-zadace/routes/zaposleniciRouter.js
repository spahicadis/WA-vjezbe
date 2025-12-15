import express from "express";
import fs from "fs/promises";
const pathFile = "./data/zaposlenici.json";
const zaposleniciRouter = express.Router();

zaposleniciRouter.get("/", async (req, res) => {
  const queryFilters = Object.entries(req.query);
  try {
    const data = await fs.readFile(pathFile, "utf8");
    const parsedData = JSON.parse(data);

    if (parsedData.length === 0) {
      return res.status(200).json([]); //Čitam da prema RESTU iako je data prazan array treba ga vratiti sa 200, ne 404 ili nešto u smislu errora. Jer realno podatci postoje samo je lista, kolekcija ili slično prazna.
    }

    if (queryFilters.length === 0) {
      return res.status(200).json(parsedData);
    } else {
      let filteredData = [...parsedData];
      for (const [key, value] of queryFilters) {
        if (key === "sortiraj_po_godinama") {
          if (value === "ASC") {
            filteredData = filteredData.sort(
              (a, b) => a.godine_staža - b.godine_staža
            );
          } else if (value === "DESC") {
            filteredData = filteredData.sort(
              (a, b) => b.godine_staža - a.godine_staža
            );
          }
        }
        if (key === "pozicija") {
          filteredData = filteredData.filter((item) => item.pozicija === value);
        }
        if (key === "godine_staža_min") {
          filteredData = filteredData.filter(
            (item) => item.godine_staža >= Number(value)
          );
        }
        if (key === "godine_staža_max") {
          filteredData = filteredData.filter(
            (item) => item.godine_staža <= Number(value)
          );
        }
      }
      res.status(200).json(filteredData);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

zaposleniciRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (isNaN(id)) {
    return res.status(400).json({ message: "Poslani ID nije ispravan" });
  }
  try {
    const data = await fs.readFile(pathFile, "utf-8");
    const parsedData = JSON.parse(data);

    const user = parsedData.find((item) => Number(item.id) === Number(id));

    if (!user) {
      return res.status(404).json({ message: "Traženi zaposlenik ne postoji" });
    }

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

zaposleniciRouter.post("/", async (req, res) => {
  const requiredKeys = ["ime", "prezime", "godine_staža", "pozicija"];
  const requestKeys = Object.keys(req.body);

  const check = requiredKeys.every((key) => requestKeys.includes(key));

  if (!check) {
    return res
      .status(400)
      .json({ message: "Nisu poslani svi potrebni podatci" });
  }

  for (const [key, value] of Object.entries(req.body)) {
    if (key === "ime" || key === "prezime" || key === "pozicija") {
      if (typeof value !== "string") {
        return res
          .status(400)
          .json({ message: "Poslani podatci nisu validni" });
      }
    }
    if (key === "godine_staža") {
      if (typeof value !== "number") {
        return res
          .status(400)
          .json({ message: "Poslani podatci nisu validni" });
      }
    }
  }

  if (req.body?.id) {
    delete req.body.id;
  }

  try {
    const data = await fs.readFile(pathFile, "utf-8");
    const parsedData = JSON.parse(data);

    const generatedId = parsedData[parsedData.length - 1].id + 1; //edge case ako nema podataka u zaposlenici.json, ali budući da startamo sa hardkodiranim podatcima osigurano je

    const newZaposlenik = { id: generatedId, ...req.body };
    parsedData.push(newZaposlenik);
    const serializedData = JSON.stringify(parsedData, null, 2);

    await fs.writeFile(pathFile, serializedData);

    res.status(201).json({ message: "Zaposlenik uspješno dodan" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default zaposleniciRouter;
