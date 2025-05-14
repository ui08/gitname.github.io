import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import "./Inputcheckbox.scss";

const Inputcheckbox = (props) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const {
    register,
    errors,
    checked,
    trigger,
    readOnly = false,
    previewFlag = "",
    type = "text",
    disabled = false,
    defaultValue = null,
    onChange = () => {},
    registerName,
    mandatory = false,
    labelName = "",
    hidden,
    ref = null,
    errorLabel,
  } = props;

  return (
    <>
      <div className="Inputcheckdiv">
        <label
          htmlFor={registerName}
          className={
            errors?.[registerName] ? "Inputcheckbox errormark" : "Inputcheckbox"
          }
        >
          <input
            readOnly={readOnly}
            disabled={disabled}
            ref={ref}
            checked={checked}
            hidden={hidden}
            type={type}
            defaultValue={defaultValue}
            className={cssFunction(previewFlag, errors, registerName)}
            id={registerName}
            {...register(registerName, {
              required: mandatory
                ? t("Messages:termsConditions", { lable: errorLabel })
                : false,
              onChange: (e) => onChange(e),
              onBlur: (e) => onChange(e),
            })}
            placeholder=""
            onKeyUp={() => {
              trigger(registerName);
            }}
          />

          <div>{labelName}</div>
        </label>
      </div>{" "}
      <div className="errorClass">
        {errors?.[registerName] && (
          <small className="textdanger">
            {errors?.[registerName]?.message}
          </small>
        )}
      </div>
    </>
  );

  function cssFunction(previewFlag, errors, registerName) {
    if (previewFlag) {
      return "previewStyle Inputcheckbox-input";
    } else if (errors?.[registerName]) {
      return "errorsborder Inputcheckbox-input";
    } else {
      return "Inputcheckbox-input";
    }
  }
};

Inputcheckbox.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  trigger: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  previewFlag: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  minLength: PropTypes.number,
  registerName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labelName: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  label: PropTypes.node,
  errorLabel: PropTypes.string,
  id: PropTypes.string,
  hidden: PropTypes.bool,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.elementType }),
  ]),
};

export default Inputcheckbox;
