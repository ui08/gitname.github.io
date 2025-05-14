import PropTypes from "prop-types";
import { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import CustomDropDown from "./CustomDropdown"; // Your custom styles
import "./InputSelect.scss";
import "./MultiSelect.scss";

const MultiSelect = ({
  control,
  name,
  label,
  previewFlag = "",
  options = [],
  defaultValue = [],
  isDisabled = false,
  isRequired = false,
  onSelect = () => {},
  className = "",
  errors = {},
}) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const { ValueContainer, Placeholder, MultiValue } = components;
  const [isFocused, setIsFocused] = useState(false);

  const isValueSelected = (value) => Array.isArray(value) && value.length > 0;
  const CustomValueContainer = (props) => {
    return (
      <ValueContainer {...props}>
        <Placeholder {...props} />
        {props.children}
      </ValueContainer>
    );
  };

  const CustomMultiValue = (props) => (
    <MultiValue
      {...props}
      innerProps={{
        ...props.innerProps,
        style: { whiteSpace: "nowrap", display: "inline-block" },
      }}
    />
  );

  const getErrorClass = () => {
    return errors[name] ? "select-error" : "";
  };

  return (
    <div className={`selectfloatingbox  ${className}`}>
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        rules={{
          required: isRequired
            ? t("Messages:App_lms_Messages_00001", {
                lable: label || "Field",
              })
            : false,
        }}
        render={({ field: { onChange, value, ref } }) => (
          <>
            {" "}
            {isValueSelected(value) && (
              <label
                htmlFor={name}
                className={`floating-label ${
                  isFocused || isValueSelected(value) ? "active" : ""
                } ${"label-heading-select"}`}
              >
                {label}
                {isRequired ? <span className="errormark"> *</span> : null}
              </label>
            )}
            <Select
              inputRef={ref}
              components={{
                //   ValueContainer: CustomValueContainer,
                MultiValue: CustomMultiValue, // Use custom MultiValue for multi-select
              }}
              isMulti
              options={options}
              value={value}
              onChange={(val) => {
                onChange(val);
                onSelect(val);
              }}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              //   isDisabled={isDisabled}
              isDisabled={isDisabled}
              placeholder={
                <label
                  htmlFor={name}
                  className={"label-heading-select"}
                  style={{ whiteSpace: "nowrap" }} // Prevent label wrapping
                >
                  {label}
                  {isRequired ? <span className="errormark"> *</span> : null}
                </label>
              }
              className={cssFunction(previewFlag, errors, name)}
              styles={CustomDropDown}
            />
          </>
        )}
      />
      {errors[name] && (
        <small className="textdanger">{errors[name]?.message}</small>
      )}
    </div>
  );
};
function cssFunction(previewFlag, errors, registerName) {
  if (previewFlag) {
    return "Selectontrol previewFlag";
  } else if (errors?.[registerName]) {
    return "Selectontrol errorsborder";
  } else {
    return "Selectontrol";
  }
}
MultiSelect.propTypes = {
  control: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  options: PropTypes.array.isRequired,
  defaultValue: PropTypes.array,
  isDisabled: PropTypes.bool,
  isRequired: PropTypes.bool,
  onSelect: PropTypes.func,
  className: PropTypes.string,
  errors: PropTypes.object,
};

export default MultiSelect;
