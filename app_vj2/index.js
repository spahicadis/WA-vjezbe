import express from "express";
const app = express();
const PORT = 8080;
app.use(express.json());

const data = [
  { id: 1, naziv: "Margarita", cijena: 9 },
  { id: 2, naziv: "Mortadela", cijena: 9 },
  { id: 3, naziv: "Slavonska", cijena: 9 },
];

app.get("/", (req, res) => {
  res.status(202).send("Hello World");
});

app.get("/pizze", (req, res) => {
  res.status(200).json(data);
});

app.get("/pizze/:naziv", (req, res) => {
  const { naziv } = req.params;

  const pizza = data.find((item) => item.naziv === naziv);

  res.status(200).json(pizza);
});

app.post("/pizze", (req, res) => {
  // console.log(JSON.parse(req.body));
  data.push(req.body);
  res.status(201).json(data);
});

app.delete("/pizze/:id", (req, res) => {
  const { id } = req.params;

  const index = data.findIndex((item) => (item.id = id));

  data.splice(index, 1);

  res.status(201).json(data);
});

app.listen(PORT, (err) => {
  if (err) {
    throw new Error(err.message);
  }
  console.log(`Started at port ${PORT}`);
});
