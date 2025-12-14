import express from "express";
const PORT = 8080;
const app = express();
import path from "path";
import boatsRouter from "./routers/boatsRouter.js";
import rentalRouters from "./routers/rentalsRouter.js";

app.use(express.json());

app.use("/boats", boatsRouter);
app.use("/rentals", rentalRouters);

app.get("/", (req, res) => {
  const __dirname = import.meta.dirname;
  const options = {
    root: path.join(__dirname),
  };
  const targetFile = "/public/index.html";

  res.status(200).sendFile(targetFile, options, (err) => {
    if (err) {
      console.log(err.message);
    }
    console.log(`Sent file: ${targetFile}`);
  });
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Started on port ${PORT}`);
});
