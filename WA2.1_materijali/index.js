import express from "express";
import pizzeRouter from "./routers/pizze.js";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use("/pizze", pizzeRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.log(`Error: ${err.message}`);
  }
  console.log(`Started at port ${PORT}`);
});
