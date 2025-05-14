export const ValidationPattern = {
  alphabet: /^[a-zA-Z ]+$/, // Valid name pattern
  name: /^[a-zA-Z ]+$/, // Valid name pattern
  number: /^[0-9 ]+$/, // Valid number pattern
  decimal : /^\d+(\.\d+)?$/, //Decimal
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\\.,;:\s@"]+\.)+[^<>()[\]\\.,;:\s@"]{2,})$/i, // Valid email pattern
  mobile: /^(?!0)(?:(?:\+0{0,2})91[-\s]?|0)?[1-9]\d{9}$/, // Valid mobile number pattern
  alphaNumericWithoutSymbol: /^[a-zA-Z0-9]+$/,
  captha: /^kFY8iZ$/,
  password: /^[a-zA-Z0-9]+$/,
  alphanumeric: /^(?!\d+$)(?:[a-zA-Z0-9][a-zA-Z0-9 ]*)?$/,
  ifsc:/^[A-Za-z]{4}0[A-Z0-9]{6}$/,
  pancard:/[A-Za-z]{3}[Pp][A-Za-z]\d{4}[A-Za-z0-9]{1}$/,
  alphanumericSpecial:
    /^['A-Za-z0-9 ][A-Za-z0-9 \s()~!@#$%\-/,.\\s&()_+={}\[\]|?;:]+$/,
    employeeID:/^[a-zA-Z0-9]*$/,
    permissionName:/^[a-zA-Z0-9 ]*$/,
    EUIN:/[e-eE-E]{1}\d{6}/
};
