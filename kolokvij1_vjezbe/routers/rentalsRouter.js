import express from "express";
import { calculateTotalPrice } from "../utils/priceHelpers.js";
import { data, rentalsData } from "../data.js";

const rentalRouters = express.Router();

rentalRouters.post("/", (req, res) => {
  const requiredKeys = [
    "boatId",
    "customerName",
    "rentalStartDate",
    "rentalEndDate",
  ];

  const requestKeys = Object.keys(req.body);

  const checkRequiredKeys = requiredKeys.every((key) =>
    requestKeys.includes(key)
  );

  const checkRequestKeys = requestKeys.every((key) =>
    requiredKeys.includes(key)
  );

  if (!checkRequiredKeys) {
    return res.status(400).json({ message: "Potrebni podatci nisu poslani." });
  }

  if (!checkRequestKeys) {
    if (req.body?.id) {
      delete req.body.id;
    }
    if (req.body?.totalPrice) {
      delete req.body.totalPrice;
    }
  }

  const boat = data.find((item) => item.id === req.body.boatId);

  if (!boat) {
    return res
      .status(404)
      .json({ message: "Traženi brod za najam ne postoji" });
  }

  const { cijenaPoDanu } = boat;

  const { rentalStartDate, rentalEndDate } = req.body;

  const rentalStartDateParsed = new Date(rentalStartDate);
  const rentalEndDateParsed = new Date(rentalEndDate);

  if (rentalEndDateParsed < rentalStartDateParsed) {
    return res.status(400).json({ message: "Datumi najma nisu valjani." });
  }

  const totalPrice = calculateTotalPrice({
    rentalStartDateParsed,
    rentalEndDateParsed,
    cijenaPoDanu,
  });

  const id = rentalsData[rentalsData.length - 1].id + 1;

  rentalsData.push({
    id,
    ...req.body,
    totalPrice,
  });

  res.status(201).json({
    id,
    ...req.body,
    totalPrice,
  });
});

rentalRouters.patch("/:id", (req, res) => {
  const { id } = req.params;

  if (!req.body?.rentalStartDate || !req.body?.rentalEndDate) {
    return res
      .status(400)
      .json({ message: "Moguća izmjena samo datuma najma" });
  }

  const rent = rentalsData.findIndex((item) => item.id === Number(id));

  if (rent === -1) {
    return res.status(404).json({ message: "Najam za ažuriranje ne postoji" });
  }

  const rentData = rentalsData[rent];

  const rentalStartDateParsed = new Date(req.body.rentalStartDate);
  const rentalEndDateParsed = new Date(req.body.rentalEndDate);

  if (rentalEndDateParsed < rentalStartDateParsed) {
    return res.status(400).json({ message: "Datumi najma nisu valjani." });
  }

  rentalsData[rent] = {
    ...rentData,
    ...req.body,
  };

  res.status(200).json(rentalsData[rent]);
});

export default rentalRouters;
