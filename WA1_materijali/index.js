const express = require("express");
//Koristim common jer koristenje __diranme je jednostavnije u common
const app = express();
// app.use(express.json());

const PORT = 8080;

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/public/about.html");
});

app.get("/users", (req, res) => {
  const payload = [
    {
      name: "Adis",
    },
    {
      name: "Marko",
    },
    {
      name: "John",
    },
  ];
  res.status(200).json(payload);
});

// app.post("/user/:id", (req, res) => {
//   const { id } = req.params;
//   console.log(id);
//   // console.log(req.body); JSON.parse ne radi je je req.body undefined dok ne definiram app.use express.json()
//   res.status(201).write("OK");
//   res.end();
// });

app.listen(PORT, (err) => {
  if (err) {
    console.log("Error");
  } else {
    console.log(`Backend started at port ${PORT}`);
  }
});

//express parsa vec json u response
