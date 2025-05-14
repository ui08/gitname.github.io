import { encrypt, encryptData } from "./../../../util/Authenticate/CryptoJS";

export const IncentiveRateUploadPageurl = {
  Directlist: [
    {
      label: "Transaction File ",
      icon: "",
      patth: "",
    },
    {
      label: "Direct Equity",
      icon: "",
      patth: "",
    },
  ],
  DirectHistorylist: [
    {
      label: "Transaction File ",
      icon: "",
      patth: "",
    },
    {
      label: "Direct Equity Upload History",
      icon: "",
      patth: "",
    },
  ],
  MutualFundslist: [
    {
      label: "Transaction File ",
      icon: "",
      patth: "",
    },
    {
      label: "Mutual Funds list",
      icon: "",
      patth: "",
    },
  ],
  MutualFundsHistory: [
    {
      label: "Transaction File ",
      icon: "",
      patth: "",
    },
    {
      label: "Mutual Funds Upload History",
      icon: "",
      patth: "",
    },
  ],
  BondsHistoryList: [
    {
      label: "Transaction File ",
      icon: "",
      patth: "",
    },
    {
      label: "Bonds Upload History",
      icon: "",
      patth: "",
    },
  ],
  BondsList: [
    {
      label: "Transaction File ",
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
      label: "Transaction File ",
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
      label: "Incentive  ",
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
      label: "Transaction File ",
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
      label: "Transaction File ",
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
      label: "Incentive  ",
      icon: "",
      patth: "",
    },
    {
      label: "Rate List",
      icon: "",
      patth: "",
    },
  ],
};
