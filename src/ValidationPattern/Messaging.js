export const ValidationMessages = {
  Field_input_Required: "{{lable}}  should not be blank. ",
  Field_check_Required: "You must agree to the {{lable}}. ",
  Field_Select_Required: "{{lable}}  should not be blank. ",
};

export const getErrorMessage = (messageTemplate, label) => {

  return messageTemplate.replace("{{lable}}", label);
};


export const getpatternErrorMessage = (messageTemplate, label) => {

  return messageTemplate.replace("{{lable}}", label);
};

export const uploadedDocs = [
  { label: "Male", value: 102002 },
  { label: "Female", value: 102001 },
];

export const eventMode = [
  { label: "Online", value: "Online" },
  { label: "Offline", value: "Offline" },
];

export const clientData = [
  { label: "Dummy 1", value: "dummy1" },
  { label: "Dummy 2", value: "dummy2" },
  { label: "Dummy 3", value: "dummy3" },
];

export const accountData = [
  { label: "Dummy 1", value: "dummy1" },
  { label: "Dummy 2", value: "dummy2" },
  { label: "Dummy 3", value: "dummy3" },
];

export const formatData = [
  { label: "PDF", value: "pdf" },
  { label: "Excel", value: "excel" },
  { label: "JPG", value: "jpg" },
];

export const reportFormatData = [
  { label: "PDF", value: "pdf" },
  // { label: "Excel", value: "excel" },
  // { label: "JPG", value: "jpg" },
];
