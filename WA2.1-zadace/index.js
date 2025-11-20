import express from "express";
import nekretnineRouter from "./routes/nekretnine.js";
import ponudeRouter from "./routes/ponude.js";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/nekretnine", nekretnineRouter);
app.use("/ponude", ponudeRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Started on port ${PORT}`);
});
