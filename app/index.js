import express from "express";

const app = express();
// app.use(express.json());

const PORT = 8080;

app.get("/", (req, res) => {
  const payload = {
    name: "Adis",
  };
  // res.status(200).json(payload);
  res.status(202).write(JSON.stringify(payload));
  res.end();
});

app.post("/user/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  // console.log(req.body); JSON.parse ne radi je je req.body undefined dok ne definiram app.use express.json()
  res.status(201).write("OK");
  res.end();
});

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log(`Backend started at port ${PORT}`);
  }
});

//express parsa vec json u response
//endpoint doslovno funkcija koja lezi na toj ruti/endpointu
