import express from "express";
import pizzeRouter from "./routes/pizzeRouter.js";
import narudzbeRouter from "./routes/narudzbeRouter.js";
import cors from "cors";
const PORT = 8080;
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use("/pizze", pizzeRouter);
app.use("narudzbe", narudzbeRouter);

app.listen(PORT),
  (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log(`Started on PORT ${PORT}`);
  };
