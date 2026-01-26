import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

const TOKEN = process.env.JWT;
const GENERATED = jwt.sign();

const app = express();

app.use(express.json());

const users = [{ id: 1, username: "John", password: "test123" }];

let lozinka = "123";
let salt_rounds = 10;
// bcrypt.hash(lozinka, salt_rounds, (err, hash) => {
//   if (err) {
//     console.log(err.message);
//   }

//   if (hash) {
//     console.log(hash);
//   }
// });

app.post("/register", (req, res) => {
  const { username, password } = req.body;

  bcrypt.hash(password, salt_rounds, (err, hash) => {
    if (err) {
      res.status(500).send();
    }
    if (hash) {
      const hash_password = hash;
      users.push({ id: 5, username: username, password: hash_password });
      console.log(users);
      res.status(204).send();
    }
  });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const user = users.find((item) => item.username === username);

  if (!user) {
    return res.status(404).json({ message: "Korisnik ne postoji" });
  }
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Greška na serveru" });
    }

    if (result) {
      return res.status(200).json({ message: "Uspješno ste prijavljeni" });
    } else {
      return res.status(401).json({ message: "Pogrešna lozinka" });
    }
  });
});

app.listen(8080);
