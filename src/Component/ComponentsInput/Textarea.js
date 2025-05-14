import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
// import "./Textarea.scss";

const Textarea = (props) => {
  const {
    register,
    errors,
    trigger,
    getValues,
    readOnly = false,
    maxLength = null,
    previewFlag = false,
    disabled = false,
    onChange = () => { },
    onBlur = () => { },
    minLength = null,
    registerName,
    mandatory = false,
    labelName = "",
    cols,
    rows,
    errorLabel = "",
    hidden,
    pattern = {},
    ref = null,
  } = props;

  return (
    <div className={"app_input-wrapper"}>
    <label
        htmlFor={registerName}
        className={errors?.[registerName] ? "app_label errormark" : "app_label"}
      >
        {labelName}
        {mandatory ? <span className="errormark"> *</span> : null}
      </label>

      <textarea
        readOnly={readOnly}
        disabled={disabled}
        ref={ref}
        hidden={hidden}
        cols={cols}
        rows={rows}
        autoComplete="off"
        minLength={minLength}
        maxLength={maxLength}
        value={getValues(registerName)}
        className={
          cssFunction(previewFlag, errors, registerName)
        }
        id={registerName}
        {...register(registerName, {
          required: mandatory ? errorLabel : false,
          pattern: pattern,
          onChange: (e) => onChange(e),
          onBlur: (e) => onBlur(e), // Call onBlur here
        })}
        placeholder=""
        onKeyUp={() => {
          trigger(registerName);
        }}
      ></textarea>
      

      {errors?.[registerName] && (
        <small className="textdanger">{errors?.[registerName]?.message}</small>
      )}
    </div>
  );
};

function cssFunction(previewFlag, errors, registerName) {
  if (previewFlag) {
    return "previewStyle";
  } else if (errors?.[registerName]) {
    return "errorsborder";
  } else {
    return "";
  }
}

// Prop types validation
Textarea.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  trigger: PropTypes.func,
  getValues: PropTypes.func.isRequired,
  readOnly: PropTypes.bool,
  maxLength: PropTypes.number,
  previewFlag: PropTypes.bool,
  type: PropTypes.string,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  minLength: PropTypes.number,
  registerName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labelName: PropTypes.string,
  cols: PropTypes.number,
  rows: PropTypes.number,

  errorLabel: PropTypes.string,

  hidden: PropTypes.bool,

  pattern: PropTypes.object,

  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};

export default Textarea;
