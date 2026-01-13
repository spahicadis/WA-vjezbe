import express from "express";
const PORT = 8080;
const app = express();
import { korisnici } from "./data/data.js";
import {
  middlewareCheckIfKorisnikExist,
  middlewareCheckEmail,
  korisniciLoggerRequest,
} from "./middleware/korisnici.js";
import { requestLogger } from "./middleware/requests.js";
import { body, validationResult, query, param } from "express-validator";

app.use(express.json());
app.use(requestLogger);
app.all("/korisnici", korisniciLoggerRequest);

app.get("/hello", [query("ime").notEmpty()], (req, res) => {
  const validations = validationResult(req);
  if (validations.isEmpty()) {
    return res.send(`Hello ${req.query?.ime}`);
  }
  return res.status(400).json({ validations: validations.array() });
});

// dohvat svih korisnika
app.get("/korisnici", async (req, res) => {
  if (korisnici) {
    return res.status(200).json(korisnici);
  }
  return res.status(404).json({ message: "Nema korisnika" });
});

// dohvat pojedinog korisnika
app.get(
  "/korisnici/:id",
  [middlewareCheckIfKorisnikExist],
  async (req, res) => {
    return res.status(200).json(req.pronadeniKorisnik);
  }
);

// ažuriranje email adrese pojedinog korisnika
app.patch(
  "/korisnici/:id",
  [middlewareCheckIfKorisnikExist, body("email").isEmail()],
  async (req, res) => {
    const validations = validationResult(req);
    if (validations.isEmpty()) {
      req.pronadeniKorisnik.email = req.body.email;
      return res.status(200).json(req.pronadeniKorisnik.email);
    }
    return res.status(400).json({ validations: validations.array() });
  }
);

app.listen(PORT);
