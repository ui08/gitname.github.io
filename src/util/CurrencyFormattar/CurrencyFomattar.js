const CurrecnyFormattar = (value) => {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return "Invalid input";
    }
  
    const numValue = parseFloat(value);
  
    if (numValue >= 10000000) {
      // Convert to crores
      return `${(numValue / 10000000).toFixed(2)} Cr`;
    } else if (numValue >= 100000) {
      // Convert to lacs
      return `${(numValue / 100000).toFixed(2)} L`;
    } else {
      // Keep in default format
      return numValue.toFixed(2);
    }
  };
  
  export default CurrecnyFormattar;