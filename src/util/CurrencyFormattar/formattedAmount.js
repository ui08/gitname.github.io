export const formattedAmount = (value) => {

  if (value === null || value === "" || value === "-" || isNaN(value)) {
    return "-"; // Return "-" if the value is null, empty, or not a valid number
  }

  let temnumber = Math.abs(Number(value)); // Convert to absolute value to remove the minus sign

  // Ensure that the value is a valid number before formatting
  if (isNaN(temnumber)) {
    return "-"; // Return "-" if the value is still not a valid number
  }

  return new Intl.NumberFormat("en-IN", {
    currency: "INR",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(temnumber);
};

export const formattecommas = (value) => {
  let temnumber = Number(value);

  return temnumber.toLocaleString();
};
