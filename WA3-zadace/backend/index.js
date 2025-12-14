import express from "express";
import cors from "cors";
import pizzeRouter from "./routes/pizzeRouter.js";
import narudzbeRouter from "./routes/narudzbeRouter.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use("/pizze", pizzeRouter);
app.use("/narudzbe", narudzbeRouter);

app.get("/", (req, res) => {
  res.status(200).send("Pizza Express poslužitelj");
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Running on PORT :${PORT}`);
});
