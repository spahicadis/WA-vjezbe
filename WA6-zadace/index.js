import express from "express";
import moviesRouter from "./routes/moviesRouter.js";
import actorsRouter from "./routes/actorsRouter.js";
import { logger } from "./middleware/appMiddleware.js";

const app = express();
app.use(express.json());
app.use(logger);

app.use("/movies", moviesRouter);
app.use("/actors", actorsRouter);

app.get("/", (req, res) => {
  res.send("Movie server");
});

app.listen(8080, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Started at :8080`);
});
