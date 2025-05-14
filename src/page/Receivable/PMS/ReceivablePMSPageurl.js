import { encrypt, encryptData } from "../../../util/Authenticate/CryptoJS";

export const ReceivablePMSPageurl = {
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
      label: "PMSs list",
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
      label: "PMSs Upload History",
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
      label: "PMS",
      icon: "",
      patth: "",
    },
    {
      label: "Commission Upload Master",
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
      label: "PMS   ",
      icon: "",
      patth: "",
    },
    {
      label: "Commission Receiveables Report",
      icon: "",
      patth: "",
    },
  ],
};
