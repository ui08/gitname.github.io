const CustomDropdownlogin = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected
      ? `rgba(var(--W_color), 1)`
      : `rgba(var(--text-primary-color))`,
    backgroundColor: state.isSelected
      ? `rgba(var(--form-label-color), .5)`
      : `rgba(var(--form-input-color), 1)`,
    padding: 15,
    fontSize: "1rem",
    lineHeight: "24px",

    color: `rgba(var(--form-label-color), 1)`,
    "&:hover": {},
  }),
  control: (base, state, styles) => ({
    ...base,
    ...base,
    ...base,
    ...styles,
    padding: 10,
    border: "1px solid rgba(var(--primary-color), 1)",

    boxShadow: `rgba(var(--primary-color), 0.1) 0px 1px 3px 0px,
    rgba(var(--primary-color), 0.06) 0px 1px 2px 0px`,
    borderRadius: 15,
    marginTop: "15px",
    height: "3rem",
    backgroundColor: state.isSelected
      ? `rgba(var(--W_color), 1)`
      : `rgba(var(--W_color), 1)`,

    "&:hover": {
      ...base,
      ...base,
      padding: 10,
      border: "none",
      boxShadow: `rgba(var(--primary-color), 0.1) 0px 1px 3px 0px,
      rgba(var(--primary-color), 0.06) 0px 1px 2px 0px`,
      borderRadius: 15,
      border: "1px solid rgba(var(--primary-color), 1)",
      backgroundColor: state.isSelected
        ? `rgba(var(--W_color), 1)`
        : `rgba(var(--W_color), 1)`,
    },
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    overflow: "visible",
    marginBottom: "-15px",
    backgroundColor: `none`,
  }),
  singleValue: (provided, state) => ({
    ...provided,
    marginLeft: "-5px",
    marginTop: "-20px",
    fontSize: "1rem",
    lineHeight: "24px",
    color: `rgba(var(--form-label-color), 1)`,
  }),
  menu: (provided, state) => {
    return {
      ...provided,
      zIndex: 9999,
    };
  },
  placeholder: (provided, state) => ({
    ...provided,
    position: "relative",
    MaxWeight: "auto !important",
    fontStyle: "normal  !important",
    fontWeight: "400  !important",
    lineHeight: "18px  !important",
    backgroundColor: `rgba(var(--W_color), 1)`,
    // marginBottom: "10px  !important",
    top: state.hasValue || state.selectProps.inputValue ? "-2.2rem" : "-.75rem",
    fontSize:
      state.hasValue || state.selectProps.inputValue
        ? ".75rem !important"
        : "1rem !important",

    paddingBottom:
      state.hasValue || state.selectProps.inputValue ? "2px" : "5px",
    marginLeft: "-7px",
    padding: "5px",
    color: "rgba(var(--form-label-color), 1)",
    width: "fit-content",
  }),
};

export default CustomDropdownlogin;
