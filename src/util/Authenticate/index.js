import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { jwtDecode } from "jwt-decode"; // Ensure proper import syntax
import moment from "moment/moment";

import { decryptData, encrypt, encryptData } from "./CryptoJS";

const DEFAULT_IDLE_TIME_MINUTES = 10; // Default idle timer in minutes
// Configurable Constants
const CONFIG = {
  TOKEN_KEY: encrypt("jwt-secret-app"),
  ACCESS_KEY: encrypt("jwt-access"),
  LOGIN_TYPE_KEY: encrypt("Login_Type"),
  IDLE_TIMER_KEY: encrypt("idletimer"),
  Counter: encrypt("counter"),
  DEFAULT_IDLE_TIME: DEFAULT_IDLE_TIME_MINUTES * 60 * 1000, // Convert minutes to milliseconds
  DELAY_TIME_MS: 3000, // in milliseconds (60 seconds)
  // DEFAULT_IDLE_TIME: 600000, // Default idle timer in milliseconds (60 seconds)
  // DELAY_TIME_MS: 900000, // in milliseconds (60 seconds)
};

let currentAccessToken = "";

/**
 * Logs in the user and stores relevant details in sessionStorage.
 */
export const login = (accessToken, logtype) => {
  currentAccessToken = accessToken;
  // Store encrypted data in sessionStorage
  setsessionStorage(CONFIG.TOKEN_KEY, accessToken);
  setsessionStorage(CONFIG.ACCESS_KEY, encryptData("true"));

  setsessionStorage(CONFIG.LOGIN_TYPE_KEY, encryptData(logtype));
  setsessionStorage(CONFIG.Counter, encryptData("1"));

  return validateJwt(accessToken);
};

/**
 * Validates the JWT for expiration and structure.
 */
export const validateJwt = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    const currentless5sec = Math.floor(Date.now(decoded.exp) / 1000) + 2 * 60; // Current time in seconds

    // Check expiration
    return decoded.exp && decoded.exp > currentless5sec;
  } catch (error) {
    //console.error("Invalid JWT:", error.message);
    return false;
  }
};

/**Retrieves the user ID from the JWT.*/
export const getUserEmail = () => {
  const token = getsessionStorage(CONFIG.TOKEN_KEY);
  return token ? jwtDecode(token).sub : null;
};

export const getUserId = () => {
  const token = getsessionStorage(CONFIG.TOKEN_KEY);
  return token ? jwtDecode(token).Id : null;
};

/**Retrieves the idle timer value.*/
export const getIdleTimer = () => {
  const token = getsessionStorage(CONFIG.TOKEN_KEY);
  const minutes = 60;
  const milliseconds = minutes * 60 * 1000;
  return token ? encryptData(milliseconds) : encryptData(milliseconds);
};

/** Retrieves the JWT from sessionStorage.*/
export const getToken = () => getsessionStorage(CONFIG.TOKEN_KEY);

/** Retrieves the login type from sessionStorage.
 */
export const getLoginType = () => getsessionStorage(CONFIG.LOGIN_TYPE_KEY);

/**Retrieves the JWT expiration time.*/
export const getTokenExpiration = () => {
  const token = getsessionStorage(CONFIG.TOKEN_KEY);
  return token ? jwtDecode(token).exp : null;
};

/**Retrieves the JWT issued-at time.*/
export const getTokenIssuedAt = () => {
  const token = getsessionStorage(CONFIG.TOKEN_KEY);
  return token ? jwtDecode(token).iat : null;
};

/** Retrieves the tenant information from the JWT.*/
export const getUserTenant = () => {
  const token = getsessionStorage(CONFIG.TOKEN_KEY);
  return token ? jwtDecode(token).tenant : null;
};

// Assuming role?
export const getAssumingRole = () => {
  const token = getsessionStorage(CONFIG.TOKEN_KEY);
  return token ? jwtDecode(token).roles : null;
};

/**Retrieves the access value from sessionStorage.*/
export const getAccess = () => getsessionStorage(CONFIG.ACCESS_KEY);

/** Removes the access value from sessionStorage.*/
export const removeAccess = () => removeLocalStorage(CONFIG.ACCESS_KEY);

/**Removes the JWT from sessionStorage.*/
export const removeToken = () => removeLocalStorage(CONFIG.TOKEN_KEY);

export const removeUser = () => removeLocalStorage("UserDetails");

/**Removes the login type from sessionStorage.*/
export const removeLoginType = () => removeLocalStorage(CONFIG.LOGIN_TYPE_KEY);

/** Returns the delay time in milliseconds.*/
export const getDelayTime = () => CONFIG.DELAY_TIME_MS;

/** Logs out the user and updates access information.*/

/**
 * Helper to set data in sessionStorage.
 */
export const setsessionStorage = (key, value) => {
  if (key && value) {
    sessionStorage.setItem(key, value);
  }
};

/**
 * Helper to get data from sessionStorage.
 */
export const getsessionStorage = (key) => {
  return key ? sessionStorage.getItem(key) : null;
};

/**
 * Helper to remove data from sessionStorage.
 */
export const removeLocalStorage = (key) => {
  if (key) {
    sessionStorage.removeItem(key);
  }
};

export const negativeFormatter = (value) => {
  const numericValue = parseFloat(value);
  // Check if the value is negative and remove the "-" sign
  const isNegative = numericValue < 0;
  const absoluteValue = Math.abs(numericValue);
  const iconClass = isNegative ? "negativeClass" : "positiveClass";
  const icon = isNegative ? faCaretDown : faCaretUp;
  return { absoluteValue, iconClass, icon };
};

export const ChartColorsFunction = (color) => {
  // Feel-good default colors (excluding black)
  const DEFAULT_COLORS = [
    "#A1C1FF", // Soft blue
  ];

  // If color is undefined or null, return a random color from our pleasant palette
  if (!color) {
    // Use a simple hash to get consistent colors for undefined cases
    const hash = Math.abs(
      Array.from(String(color)).reduce(
        (hash, char) => char.charCodeAt(0) + (hash << 6) + (hash << 16) - hash,
        0
      )
    );
    return DEFAULT_COLORS[hash % DEFAULT_COLORS.length];
  }

  try {
    const fetchedColor = JSON.parse(getsessionStorage(encrypt("ChartColors")));
    if (!fetchedColor) {
      // If no colors in sessionStorage, use our default palette
      const hash = Array.from(String(color)).reduce(
        (hash, char) => char.charCodeAt(0) + (hash << 5) - hash,
        0
      );
      return DEFAULT_COLORS[Math.abs(hash) % DEFAULT_COLORS.length];
    }

    const filteredValues = Object.entries(fetchedColor)
      .filter(([objKey]) => objKey.includes(fetchGraphLabel(color)))
      .map(([, value]) => value);

    // If no matching color found, use default palette
    if (!filteredValues.length || !filteredValues[0]) {
      const hash = Array.from(String(color)).reduce(
        (hash, char) => char.charCodeAt(0) + (hash << 5) - hash,
        0
      );
      return DEFAULT_COLORS[Math.abs(hash) % DEFAULT_COLORS.length];
    }

    //console.log("filteredValues[0]", filteredValues[0]);
    return filteredValues[0] || DEFAULT_COLORS[0]; // Fallback to first default color
  } catch (error) {
    //console.error("Error getting chart colors:", error);
    // Return a pleasant color if any error occurs
    const hash = Array.from(String(color)).reduce(
      (hash, char) => char.charCodeAt(0) + (hash << 5) - hash,
      0
    );
    return DEFAULT_COLORS[Math.abs(hash) % DEFAULT_COLORS.length];
  }
};
const fetchGraphLabel = (product) => {
  //console.log("product", product);

  let labelColorValue;
  if (product == "Mutual Funds") {
    labelColorValue = "MutualFunds";
  } else if (product == "Bonds / Debentures") {
    labelColorValue = "BondsDebentures";
  } else if (product == "Stocks") {
    labelColorValue = "Stocks";
  } else if (product == "Others") {
    labelColorValue = "Others";
  } else if (product == "Finance") {
    labelColorValue = "Finance";
  } else if (
    product == "AUMHeld" ||
    product == "heldAUM" ||
    product == "Held AUM"
  ) {
    labelColorValue = "AUMHeld";
  } else if (
    product == "AwayAUM" ||
    product == "heldAwayAUM" ||
    product == "Held Away AUM"
  ) {
    labelColorValue = "AwayAUM";
  } else if (product == "PMS") {
    labelColorValue = "PMS";
  } else if (product == "AIF") {
    labelColorValue = "AIF";
  } else if (product == "Bonds") {
    labelColorValue = "Bonds";
  } else if (product == "Direct Equity") {
    labelColorValue = "Equity";
  } else if (product == "Purchase" || product == "Real Estate") {
    labelColorValue = "Purchase";
  } else if (product == "Redemption" || product == "Gold") {
    labelColorValue = "Redemption";
  } else if (product == "NetPurchase") {
    labelColorValue = "NetPurchase";
  } else if (product == "Equity") {
    labelColorValue = "Equity";
  } else if (product == "Debt") {
    labelColorValue = "Debt";
  } else if (product == "Hybrid") {
    labelColorValue = "Hybrid";
  } else if (product == "Alternate") {
    labelColorValue = "Alternate";
  } else if (product == "Liquid" || product == "AIF") {
    labelColorValue = "Liquid";
  } else if (product == "Held AUM" || product == "held") {
    labelColorValue = "AUMHeld";
  } else if (product == "Held - Away AUM" || product == "heldAway") {
    labelColorValue = "AwayAUM";
  } else if (product == "MTD") {
    labelColorValue = "MTD";
  } else if (product == "LQ") {
    labelColorValue = "LQ";
  } else if (
    product == "YTD" ||
    product == "Other" ||
    product == "Other" ||
    product == "All Other Assets"
  ) {
    labelColorValue = "YTD";
  } else if (product == "Inception") {
    labelColorValue = "Inception";
  } else if (product == "Jan-25") {
    labelColorValue = "Month";
  } else if (product == "Feb-25") {
    labelColorValue = "Month";
  } else if (product == "Mar-25") {
    labelColorValue = "Month";
  } else if (product == "Sep-24") {
    labelColorValue = "Month";
  } else if (product == "Oct-24") {
    labelColorValue = "Month";
  } else if (product == "Nov-24") {
    labelColorValue = "Month";
  } else if (product == "Dec-24") {
    labelColorValue = "Month";
  } else if (product == "Large Cap") {
    labelColorValue = "LargeCap";
  } else if (product == "Mid Cap") {
    labelColorValue = "MidCap";
  } else if (product == "Small Cap") {
    labelColorValue = "SmallCap";
  } else if (product == "Other Cap") {
    labelColorValue = "Cash";
  } else if (product == "Cash") {
    labelColorValue = "Cash";
  } else if (product == "SharpeRatio") {
    labelColorValue = "Cash";
  } else if (product == "Sortino") {
    labelColorValue = "Cash";
  } else if (product == "Alpha") {
    labelColorValue = "Cash";
  } else if (product == "TreynorRatio") {
    labelColorValue = "Cash";
  } else if (product == "Beta") {
    labelColorValue = "Cash";
  } else if (product == "Equity Ratio") {
    labelColorValue = "Cash";
  } else if (product == "Debt Ratio") {
    labelColorValue = "Cash";
  } else if (product == "Other Ratio") {
    labelColorValue = "Cash";
  }

  return labelColorValue;
};
export const getUserFilterDetails = (value) => {
  let val = value;
  let temUserDetails = JSON.parse(getsessionStorage(encrypt("UserDetails")));
  if (temUserDetails != null) {
    const userData = temUserDetails;
    let cID = userData[val];
    console.log("getUserFilterDetails", val);
    if (
      val === "clientId" &&
      cID == null &&
      decryptData(getsessionStorage(encrypt("Clienttorm"))) === "true"
    ) {
      cID = decryptData(getsessionStorage(encrypt("ClienttormID")));
    }
    // decryptData(getsessionStorage(encrypt("Clienttorm"))) === "true" ? decryptData(getsessionStorage(encrypt("ClienttormID")))
    return cID || null;
  } else {
    // window.location.reload(true);
  }
  // If the property doesn't exist, return null
};

export const getMomentFromDate = (date, FromDateType) => {
  console.log("datedatedatedate",date);
  if (date !== null) {
    // Supported formats including ISO format
    const formats = [
      "YYYY-MM-DD", // ISO format
      "MM/DD/YYYY", // US format
      "DD/MM/YYYY", // European format
      "DD-MM-YYYY", // European format
      "YYYY/MM/DD", // Another ISO-like format
      "ddd MMM DD HH:mm:ss [IST] YYYY",
      moment.ISO_8601, // This should be enough for ISO 8601 format
    ];

    const parsedDate = moment.utc(date, formats, true); // Parse as UTC

    switch (FromDateType) {
      case "Date":
        return parsedDate.isValid()
          ? parsedDate.format("DD/MM/YYYY")
          : "Invalid Date";
          case "DateDis":
            return parsedDate.isValid()
              ? parsedDate.format("DD-MM-YYYY")
              : "null";

      case "Datepicker":
        return parsedDate.isValid()
          ? parsedDate.format("DD/MM/YYYY")
          : "Invalid Date";
      case "Date&Time":
        return parsedDate.isValid()
          ? parsedDate.format("DD/MM/YYYY hh:mm:ss A")
          : "Invalid Date";
      case "Time":
        return parsedDate.isValid()
          ? parsedDate.utc().format("hh:mm:ss A") // Ensure the time stays in UTC format
          : "Invalid Date";
      case "Date&Month":
        return parsedDate.isValid()
          ? parsedDate.utc().format("DD MMM YYYY") // Ensure the time stays in UTC format
          : "Invalid Date";
           case "MonthDateYYYY":
        return parsedDate.isValid()
          ? parsedDate.utc().format("YYYY-MM-DD") // Ensure the time stays in UTC format
          : "Invalid Date";
      default:
        return parsedDate.isValid()
          ? parsedDate.format("DD/MM/YYYY")
          : "Invalid Date";
    }
  } else {
    return "-";
  }
};

export const getMomentFromDateTime = (date) => {
  return moment(date, "DD/MM/YYYY, hh:mm a").format("DD-MM-YYYY") ===
    "Invalid date"
    ? moment(date, "MM/DD/YYYY, hh:mm a")
    : moment(date, "DD/MM/YYYY, hh:mm a");
};
