import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";

export const VMPageurl = {
  Directlist: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Direct Equity List",
      icon: "",
      patth: "",
    },
  ],

  MutualFundslist: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Mutual Funds List",
      icon: "",
      patth: "",
    },
  ],
  BondsList: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Bonds List",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsList: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsHistory: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products Uplaod History",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsAdd: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth:
        "/" + encrypt("VMOtherProductListLanding") + `/${encryptData("List")}`,
    },
    {
      label: "Add",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsEdit: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth:
        "/" + encrypt("VMOtherProductListLanding") + `/${encryptData("List")}`,
    },
    {
      label: "Edit",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsview: [
    {
      label: "Valuation Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth:
        "/" + encrypt("VMOtherProductListLanding") + `/${encryptData("List")}`,
    },
    {
      label: "View",
      icon: "",
      patth: "",
    },
  ],
};
