import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import "./inputRadioGroup.scss";
import "../../assets/all.scss";

const InputRadioGroup = ({
  register,
  errors,
  checked,
  trigger,
  readOnly = false,
  previewFlag = "",
  type = "radio", // Ensure type is "radio"
  disabled = false,
  defaultValue = null,
  onChange = () => {},
  registerName,
  mandatory = false,
  labelName = "",
  hidden = false,
  id,
  ref = null,
  errorLabel,
  radioColor = "#38479B",
}) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const handleKeyUp = () => {
    trigger(registerName);
  };

  const cssClass = previewFlag
    ? "previewStyle Inputradiobox-input"
    : errors?.[registerName]
    ? "errorsborder Inputradiobox-input"
    : "Inputradiobox-input";

  return (
    <>
      <div className="Inputradiodiv">
        <label
          htmlFor={id}
          className={
            errors?.[registerName] ? "Inputradiobox errormark" : "Inputradiobox"
          }
          style={{ "--radio-color": radioColor }} // CSS variable
        >
          <input
            readOnly={readOnly}
            disabled={disabled}
            ref={ref}
            checked={checked}
            hidden={hidden}
            type={type}
            defaultValue={defaultValue}
            className={cssClass}
            id={id}
            name={registerName}
            {...register(registerName, {
              required: mandatory
                ? t("Messages:termsConditions", { label: errorLabel })
                : false,
              onChange,
              onBlur: onChange,
            })}
            placeholder=""
            onKeyUp={handleKeyUp}
          />
          <div>{labelName}</div>
        </label>
      </div>
      <div className="errorClass">
        {errors?.[registerName] && (
          <small className="textdanger">
            {errors?.[registerName]?.message}
          </small>
        )}
      </div>
    </>
  );
};

InputRadioGroup.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  trigger: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  previewFlag: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  registerName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  errorLabel: PropTypes.string,
  id: PropTypes.string,
  hidden: PropTypes.bool,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
  radioColor: PropTypes.string,
};

export default InputRadioGroup;
