import PropTypes from "prop-types"; // Import PropTypes
import React from "react";
import { useTranslation } from "react-i18next";
import "./InputText.scss";

const InputText = (props) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const {
    register,
    errors,
    trigger,
    getValues,
    readOnly = false,
    maxLength = null,
    previewFlag = "",
    type = "text",
    disabled = false,
    onChange = () => {},
    minLength = null,
    registerName,
    mandatory = false,
    labelName = "",
    hidden,
    onPaste,
    onCopy,
    pattern = {},
    validation = {},
    ref = null,
    divClassName,
  } = props;

  // Handle max length for number inputs
  const handleNumberInput = (e) => {
    if (type === "number" && maxLength) {
      const value = e.target.value;
      if (value.length > maxLength) {
        e.target.value = value.slice(0, maxLength);
      }
    }
    onChange(e);
  };

  return (
    <div
      className={
        `app-input-text-group-control` + " " + divClassName + "-control"
      }
    >
      <input
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
        hidden={hidden}
        type={type}
        autoComplete="off" // Disable autocomplete
        minLength={minLength}
        maxLength={type === "text" ? maxLength : undefined} // Only set maxLength for text inputs
        value={getValues(registerName)}
        placeholder={labelName}
        className={cssFunction(previewFlag, errors, registerName, hidden)}
        id={registerName}
        {...register(registerName, {
          required: mandatory
            ? t("Messages:App_lms_Messages_00001", {
                lable: labelName ? labelName : "Field",
              })
            : false,
          pattern: pattern,
          ...validation,
          onChange: handleNumberInput, // Use the custom handler
          onBlur: (e) => onChange(e),
        })}
        onKeyUp={() => {
          trigger(registerName);
        }}
      />
      {!hidden && (
        <>
          <label
            htmlFor={registerName}
            className={
              `app-input-text-group-label` + " " + divClassName + "-label"
            }
          >
            {labelName}
            {mandatory ? <span className="errormark"> *</span> : null}
          </label>
          <span>
            {errors?.[registerName] && (
              <h6
                className={
                  `app-input-text-group-errors` + " " + divClassName + "-errors"
                }
              >
                {errors?.[registerName]?.message}
              </h6>
            )}
          </span>
        </>
      )}
    </div>
  );

  function cssFunction(previewFlag, errors, registerName, hidden) {
    if (previewFlag) {
      return (
        "app-input-text-group-input app-input-text-group-input-previewStyle" +
        " " +
        divClassName +
        "-input"
      );
    } else if (errors?.[registerName]) {
      return (
        "app-input-text-group-input app-input-text-group-input-errorsborder" +
        " " +
        divClassName +
        "-input"
      );
    } else if (hidden) {
      return (
        "app-input-text-group-input app-input-text-group-input-hidden" +
        " " +
        divClassName +
        "-input"
      );
    } else {
      return "app-input-text-group-input" + " " + divClassName + "-input";
    }
  }
};
// Prop types validation
InputText.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  trigger: PropTypes.func.isRequired,
  getValues: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  previewFlag: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  minLength: PropTypes.number,
  registerName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labelName: PropTypes.string,
  hidden: PropTypes.bool,
  onPaste: PropTypes.func,
  onCopy: PropTypes.func,
  pattern: PropTypes.object,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default InputText;
