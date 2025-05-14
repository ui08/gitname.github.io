export const getErrorMessage = (num) => {
  if (typeof num !== "number" || !isFinite(num)) {
    throw new Error("Invalid input: must be a finite number");
  }
  return `₹ ${new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumSignificantDigits: 3,
  }).format(num)}`;
};