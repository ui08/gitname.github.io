import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";

export const FactsheetMasterPageurl = {
  Directlist: [
    {
      label: "Factsheet Master",
      icon: "",
      patth: "",
    },
    {
      label: "Direct Equity",
      icon: "",
      patth: "",
    },
  ],
  MutualFundslist: [
    {
      label: "Factsheet Master",
      icon: "",
      patth: "",
    },
    {
      label: "Mutual Funds list",
      icon: "",
      patth: "",
    },
  ],
  BondsList: [
    {
      label: "Factsheet Master",
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
      label: "Factsheet Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsAdd: [
    {
      label: "Factsheet Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth:
        "/" + encrypt("IMOtherProductListLanding") + `/${encryptData("List")}`,
    },
    {
      label: "Add",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsEdit: [
    {
      label: "Factsheet Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth:
        "/" + encrypt("IMOtherProductListLanding") + `/${encryptData("List")}`,
    },
    {
      label: "Edit",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsview: [
    {
      label: "Factsheet Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products List",
      icon: "",
      patth:
        "/" + encrypt("IMOtherProductListLanding") + `/${encryptData("List")}`,
    },
    {
      label: "View",
      icon: "",
      patth: "",
    },
  ],
  OtherProductsHistory: [
    {
      label: "Factsheet Master",
      icon: "",
      patth: "",
    },
    {
      label: "Other Products History",
      icon: "",
      patth: "",
    },
  ],
};
