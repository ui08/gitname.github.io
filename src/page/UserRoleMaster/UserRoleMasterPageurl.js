import { encrypt, encryptData } from "../../util/Authenticate/CryptoJS";

export const InstrumentMasterPageurl = {
  Directlist: [
    {
      label: "Instrument Master",
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
      label: "Instrument Master",
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
      label: "Instrument Master",
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
      label: "Instrument Master",
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
      label: "Instrument Master",
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
      label: "Instrument Master",
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
      label: "Instrument Master",
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
      label: "Instrument Master",
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
