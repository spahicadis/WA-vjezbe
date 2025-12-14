export const calculateTotalPrice = (data) => {
  const { rentalStartDateParsed, rentalEndDateParsed, cijenaPoDanu } = data;

  const dateRangeMs = rentalEndDateParsed - rentalStartDateParsed;

  const dateRangeyDays = dateRangeMs / (1000 * 60 * 60 * 24);

  return dateRangeyDays * cijenaPoDanu;
};
