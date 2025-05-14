import { Box } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "./InputDatePicker.scss";

export default function InputDatePickerWithMoment(props) {
  moment.locale("en-gb");
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const {
    errors,
    setValue,
    control,
    previewFlag,
    mandatory,
    labelName,
    registerName,
    dateformat,
    dateviews,
    minDateVal,
    maxDateVal,
    readonly,
    disabled,
    onSelect,
  } = props;

  const inputClassName = () => {
    if (previewFlag) return "app_input previewStyle";
    if (errors?.[registerName]) return "app_input errorsborder";
    return "app_input";
  };

  return (
    <div className="app_input-wrapper">
      <div className="date-input-field">
        <label htmlFor={registerName}>
          {labelName}
          {mandatory && <span className="errormark"> *</span>}
        </label>

        <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="en-gb">
          <Controller
            control={control}
            name={registerName}
            rules={{
              required: mandatory && {
                value: true,
                message: t("Messages:App_lms_Messages_00001", {
                  lable: labelName,
                }),
              },
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <DesktopDatePicker
                disabled={disabled}
                format={dateformat}
                // openTo={dateviews}
                readOnly={readonly}
                minDate={minDateVal}
                maxDate={maxDateVal}
                value={value ? moment(value) : null}
                onChange={(val) => {
                  onSelect(val);
                  onChange(val);
                  setValue(name, val);
                }}
                renderInput={({ inputProps, InputProps }) => (
                  <Box>
                    <div>
                      <input
                        {...inputProps}
                        ref={ref}
                        type="text"
                        name={name}
                        className={inputClassName()}
                        id={registerName}
                        placeholder=""
                      />
                      {InputProps?.endAdornment}
                    </div>
                  </Box>
                )}
              />
            )}
          />
        </LocalizationProvider>

        {errors?.[registerName] && (
          <div className="errorClassdate">
            <small className="textdanger">
              {errors[registerName]?.message}
            </small>
          </div>
        )}
      </div>
    </div>
  );
}

InputDatePickerWithMoment.propTypes = {
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  previewFlag: PropTypes.string,
  mandatory: PropTypes.bool,
  labelName: PropTypes.string,
  registerName: PropTypes.string.isRequired,
  dateformat: PropTypes.string,
  minDateVal: PropTypes.instanceOf(moment),
  maxDateVal: PropTypes.instanceOf(moment),
  readonly: PropTypes.bool,
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
};

InputDatePickerWithMoment.defaultProps = {
  previewFlag: "",
  mandatory: false,
  labelName: "",
  dateformat: "DD/MM/YYYY", // Corrected format
  readonly: false,
  disabled: false,
  onSelect: () => {},
};
