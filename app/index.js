import express from "express";

const app = express();

const PORT = 8080;

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log(`Backend started at port ${PORT}`);
  }
});
