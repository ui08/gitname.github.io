export const AmountFormatter = ({ amount }) => {
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "decimal",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return <>₹{formatAmount(amount)} Lakh</>;
};
