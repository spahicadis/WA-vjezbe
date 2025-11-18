import express from "express";
import path from "path";
const app = express();
const PORT = 8080;

app.get("/", (req, res) => {
  const __dirname = import.meta.dirname;
  const options = {
    root: path.join(__dirname),
  };
  const targetFile = "/public/home.html";

  res.sendFile(targetFile, options, (err) => {
    if (err) {
      console.log(`Error sending file: ${err.message}`);
    }
    console.log(`Sent: ${targetFile}`);
  });
});

app.get("/about", (req, res) => {
  const __dirname = import.meta.dirname;
  const options = {
    root: path.join(__dirname),
  };
  const targetFile = "/public/about.html";

  res.sendFile(targetFile, options, (err) => {
    if (err) {
      console.log(`Error sending file: ${err.message}`);
    }
    console.log(`Sent: ${targetFile}`);
  });
});

app.get("/users", (req, res) => {
  const data = [
    {
      id: 1,
      ime: "Adis",
      prezime: "Spahic",
    },
    {
      id: 2,
      ime: "Test",
      prezime: "Testic",
    },
    {
      id: 3,
      ime: "Marko",
      prezime: "Markovic",
    },
  ];
  res.json(data);
});

app.listen(PORT, (err) => {
  if (err) {
    console.log(err.message);
  }
  console.log(`Started on port ${PORT}`);
});
