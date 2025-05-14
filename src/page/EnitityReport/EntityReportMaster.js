export const EntityReportsMaster = {
  Family: {
    option: [
      { value: "family", labelName: "Select Family" },
      { value: "client", labelName: "Select Client" },
      { value: "accountCategory", labelName: "Select Account Category" },
      { value: "account", labelName: "Select Account" },
      { value: "product", labelName: "Select Product" },
      { value: "report", labelName: "Select Report" },
      { value: "reportFormat", labelName: "Select Report Format" },
    ],
    radioOptions: ["Holding Report", "Capital Gain Report", "Security Report", "Summary Report", "XIRR Report", "Family Office Report"],
    dropdownOptions: ["Dummy 1", "Dummy 2", "Dummy 3"], // Add dynamic dropdown options here
  },
  Client: {
    option: [
      { value: "family", labelName: "Select Family" },
      { value: "client", labelName: "Select Client" },
      { value: "accountCategory", labelName: "Select Account Category" },
      { value: "account", labelName: "Select Account" },
      { value: "product", labelName: "Select Product" },
      { value: "report", labelName: "Select Report" },
      { value: "reportFormat", labelName: "Select Report Format" },
    ],
    radioOptions: ["Holding Report", "Capital Gain Report", "Security Report", "Summary Report", "XIRR Report", "Family Office Report"],
    dropdownOptions: ["Dummy 4", "Dummy 5", "Dummy 6"], // Dynamic options for this category
  },
  Account: {
    option: [
      { value: "family", labelName: "Select Family" },
      { value: "client", labelName: "Select Client" },
      { value: "accountCategory", labelName: "Select Account Category" },
      { value: "account", labelName: "Select Account" },
      { value: "product", labelName: "Select Product" },
      { value: "report", labelName: "Select Report" },
      { value: "reportFormat", labelName: "Select Report Format" },
    ],
    radioOptions: ["Holding Report", "Capital Gain Report", "Security Report", "Summary Report", "XIRR", "Family Office Report"],
    dropdownOptions: ["Option A", "Option B", "Option C"], // Different options here
  },
};
