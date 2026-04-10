export const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);

export const getRatingStars = (rating) => {
  const roundedRating = Math.round(rating);
  return Array.from({ length: 5 }, (_, index) => index < roundedRating);
};
