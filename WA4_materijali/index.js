import express from "express";
import fs from "fs";
const PORT = 8080;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  fs.readFile("./data/lorem_ipsum.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err.message);
    }
    res.status(200).send(data);
  });
});

app.listen(PORT);
