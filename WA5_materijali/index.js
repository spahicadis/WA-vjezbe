import express from "express";
import { connectToDb } from "./db.js";
const PORT = 8080;
const app = express();

app.use(express.json());

//MongoDB ovo je nativni driver, konekcija per request? Inace je to kod relacijskih baza zbog transakcija
//MongoDB indexi i kako se mogu postavljati, indexi zauzimaju memorijski prostor. Unique na razini sheme ili kao triger before insert one. Napredne strukture i algoritmi programiranja sta su tu indexi malo cu istraziti

app.get("/pizze", async (req, res) => {
  try {
    const connection = await connectToDb();
    const data = await connection
      .collection("pizze")
      .find({ naziv: "Napoletana" })
      .toArray();
    // const data = await connection
    //   .collection("pizze")
    //   .findOne({ naziv: "Mortadela" });
    res.status(200).json(data);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Started on PORT :${PORT}`);
});
