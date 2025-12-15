import express from "express";
import zaposleniciRouter from "./routes/zaposleniciRouter.js";
const PORT = 8080;
const app = express();

app.use(express.json());
app.use("/zaposlenici", zaposleniciRouter);

app.listen(PORT, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log(`Started on PORT :${PORT}`);
});
