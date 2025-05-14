import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import Select, { components } from "react-select";
import ContainerFunction from "./ContainerFunction";
import CustomDropDown from "./CustomDropdown";
import "./InputSelect.scss";

const SelectElement = (props) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const {
    register,
    errors,
    setValue,
    control,
    divClassName,
    readOnly = false,
    previewFlag = "",
    onSelect = () => {},
    handleInputChange = () => {},
    registerName,
    isMultiSelect=false,
    mandatory = false,
    labelName = "",
    options = [],
    isMulti = false,
    defaultValue = null, // Add defaultValue prop
  } = props;

  const { ValueContainer, Placeholder, MultiValue } = components;

  // Custom ValueContainer to handle multi-select
  const CustomValueContainer = ContainerFunction(ValueContainer, Placeholder);

  // Custom MultiValue component to prevent wrapping
  const CustomMultiValue = (props) => (
    <MultiValue
      {...props}
      innerProps={{
        ...props.innerProps,
        style: { whiteSpace: "nowrap", display: "inline-block" }, // Prevent wrapping
      }}
    />
  );

  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  const noptions = [
    {
      value: "--",
      label: "No Options",
    },
  ];

  return (
    <>
      <div className={"select-box " + divClassName}>
        <Controller
          control={control}
          name={registerName}
          defaultValue={defaultValue} // Set default value here
          rules={{
            required: {
              value: mandatory,
              message: t("Messages:App_lms_Messages_00001", {
                lable: labelName ? labelName : "Field",
              }),
            },
          }}
          render={({ field: { onChange, value, name } }) => (
            <Select
              components={{
                ValueContainer: CustomValueContainer,
                MultiValue: isMulti ? CustomMultiValue : undefined, // Use custom MultiValue for multi-select
              }}
              isMulti={isMulti}
              menuPlacement="auto"
              isSearchable={true}
              menuShouldBlockScroll={false}
              onMenuOpen={true}
              onMenuClose={true}
              styles={CustomDropDown}
              isDisabled={readOnly || previewFlag ||  previewFlag == "true"}
              className={cssFunction(previewFlag, errors, registerName)}
              value={options.find(option => option.value === (value?.value || value)) || null}
              placeholder={
                <label
                  htmlFor={registerName}
                  className={
                    divClassName === "LoginAs"
                      ? "label-heading-select-log"
                      : "label-heading-select"
                  }
                  style={{ whiteSpace: "nowrap" }} // Prevent label wrapping
                >
                  {labelName}
                  {mandatory ? <span className="errormark"> *</span> : null}
                </label>
              }
              // options={options.length > 0 ? options : noptions}
              cacheOptions
              options={options}
              // loadOptions={promiseOptions}
              {...register(registerName, {})}
              onChange={(value) => {
                onSelect(value);
                onChange(value);
                setValue(name, value);
              }}
              onInputChange={(value) => handleInputChange(value)}
            />
          )}
        />

        {errors?.[registerName] && (
          <small className="textdanger">
            {errors?.[registerName]?.message}
          </small>
        )}
      </div>
    </>
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

// Prop types validation
SelectElement.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  divClassName: PropTypes.string,
  readOnly: PropTypes.bool,
  previewFlag: PropTypes.string,
  onSelect: PropTypes.func,
  handleInputChange: PropTypes.func,
  registerName: PropTypes.string.isRequired,
  mandatory: PropTypes.bool,
  labelName: PropTypes.string,
  label: PropTypes.string,
  errorLabel: PropTypes.string,
  id: PropTypes.string,
  accessibilityLabel: PropTypes.string,
  useForm: PropTypes.object,
  options: PropTypes.array,
  isMulti: PropTypes.bool,
  defaultValue: PropTypes.any,
};

export default SelectElement;
