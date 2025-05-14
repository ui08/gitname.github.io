import PropTypes from "prop-types"; // Import PropTypes
import React from "react";
import "./InputRange.scss";

const InputRange = (props) => {
  const {
    register,
    errors,
    checked,
    getValues,
    trigger,
    readOnly = false,
    previewFlag = false,
    type = "text",
    disabled = false,
    onChange = () => {},
    onBlur = () => {},
    registerName,
    mandatory,
    labelName = "",
    errorLabel = "",
    hidden,
    ref = null,
  } = props;

  return (
    <div className={"checkbox_input"}>
      <input
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
        checked={checked}
        hidden={hidden}
        type={type}
        value={getValues(registerName)}
        max={50}
        min={10}
        className={
          CssFunction(previewFlag, errors, registerName)
        }
        id={registerName}
        {...register(registerName, {
          required: mandatory ? errorLabel : false,
          onChange: (e) => onChange(e),
          onBlur: (e) => onBlur(e), // Change onBlur to call onBlur
        })}
        placeholder=""
        onKeyUp={() => {
          trigger(registerName);
        }}
      />

      <label
        htmlFor={registerName}
        className={errors?.[registerName] ? "errormark" : ""}
      >
        {labelName}
        {mandatory ? <span className="errormark"> *</span> : null}
      </label>

      {errors?.[registerName] && (
        <small className="textdanger">
          {errors?.[registerName]?.type}
        </small>
      )}
    </div>
  );
};

// Prop types validation
InputRange.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  checked: PropTypes.bool,
  getValues: PropTypes.func.isRequired,
  trigger: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  previewFlag: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  defaultValue: PropTypes.any,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  minLength: PropTypes.number,
  registerName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labelName: PropTypes.string,
  label: PropTypes.string,
  errorLabel: PropTypes.string,
  id: PropTypes.string,
  hidden: PropTypes.bool,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default InputRange;
function CssFunction(previewFlag, errors, registerName) {
  if (previewFlag) {
    return "app_input previewStyle";
  } else if (errors?.[registerName]) {
    return "app_input errorsborder";
  } else {
    return "app_input";
  }
}

