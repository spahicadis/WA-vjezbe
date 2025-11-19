import express from "express";
import pizzeRouter from "./routes/pizze.js";
import narudzbeRouter from "./routes/narudzbe.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/pizze", pizzeRouter);
app.use("/narudzbe", narudzbeRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Started on port ${PORT}`);
});
