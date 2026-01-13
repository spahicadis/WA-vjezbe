import { korisnici } from "../data/data.js";

export const middlewareCheckIfKorisnikExist = (req, res, next) => {
  const id_route_param = parseInt(req.params.id);
  const korisnik = korisnici.find((korisnik) => korisnik.id === id_route_param);
  if (!korisnik) {
    return res.status(404).json({ message: "Korisnik nije pronađen" });
  } else {
    req.pronadeniKorisnik = korisnik;
    return next();
  }
};

export const middlewareCheckEmail = (req, res, next) => {
  if (req.body.email && typeof req.body.email === "string") {
    return next();
  } else {
    return res
      .status(400)
      .json({ message: "Neispravna struktura tijela zahtjeva" });
  }
};

export const korisniciLoggerRequest = (req, res, next) => {
  console.log("Došao request na korisnike");
  next();
};
