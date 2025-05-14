import { encrypt } from "../../util/Authenticate/CryptoJS";

export const PayablePageurl = {
  OtherProductsList: [
    {
      label: "Payable ",
      icon: "",
      patth: "",
    },
    {
      label: "Define",
      icon: "",
      patth: "",
    },
  ],

  PayableReport: [
    {
      label: "Payable ",
      icon: "",
      patth: "",
    },
    {
      label: "Report",
      icon: "",
      patth: "",
    },
  ],

  OtherProductsHistory: [
    {
      label: "Payable  ",
      icon: "",
      patth: "",
    },
    {
      label: "Report",
      icon: "",
      patth: "",
    },
  ],
  PayableAdd: [
    {
      label: "Payable",
      icon: "",
      patth: "",
    },
    {
      label: "Define",
      icon: "",
      patth:
        "/" + encrypt("PayableDefineLanding"),
    },
    {
      label: "Add Entry",
      icon: "",
      patth: "",
    },
  ],
};
