import express from "express";

const pizzeRouter = express.Router();

export const pizze = [
  {
    id: 1,
    naziv: "Margherita",
    cijena: 10,
  },
  {
    id: 2,
    naziv: "Neapolitana",
    cijena: 12,
  },
  {
    id: 3,
    naziv: "Pepperoni",
    cijena: 14,
  },
  {
    id: 1,
    naziv: "Vegetariana",
    cijena: 17,
  },
  {
    id: 18,
    naziv: "Mortadella pistacchio",
    cijena: 10,
  },
];

pizzeRouter.get("/", (req, res) => {
  res.status(200).json(pizze);
});

export default pizzeRouter;
