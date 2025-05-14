import { Box } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import "./InputDatePicker.scss";

export default function InputDatePicker(props) {
  const { t } = useTranslation(["Common", "Messages", "Form"]);
  const {
    errors,
    setValue,
    control,
    previewFlag = "",
    mandatory = false,
    labelName = "",
    registerName,
    dateformat,
    minDateVal,
    maxDateVal,
    readonly,
    disabled,
    onSelect = () => {},
  } = props;
  function cssFunction() {
    if (previewFlag) {
      return "app_input previewStyle";
    } else if (errors?.[registerName]) {
      return "app_input errorsborder";
    } else {
      return "app_input";
    }
  }
  return (
    <div className={"app_input-wrapper"}>
      <div className="date-input-field">
        <label htmlFor={registerName}>
          {labelName}
          {mandatory ? <span className="errormark"> *</span> : null}
        </label>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Controller
            className="input-box"
            control={control}
            name={registerName}
            rules={{
              required: {
                value: mandatory,
                message: t("Messages:App_lms_Messages_00001", {
                  lable: labelName,
                }),
              },
            }}
            render={({ field: { onChange, value, name, ref } }) => (
              <DesktopDatePicker
                displayStaticWrapperAs="desktop"
                clearable
                // format={dateformat}
                disabled={disabled}
                inputFormat={dateformat}
                readonly={readonly}
                minDate={minDateVal}
                maxDate={maxDateVal}
                value={value ? dayjs(value) : null}
                onChange={(value) => {
                  onSelect(value);
                  onChange(value);
                  setValue(name, value);
                }}
                // label={labelName}
                renderInput={({ inputProps, InputProps }) => (
                  <Box>
                    <div className="">
                      <input
                        {...inputProps}
                        ref={ref}
                        type="text"
                        name={name}
                        className={cssFunction()}
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

        <div className="errorClassdate">
          {errors?.[registerName] && (
            <small className="textdanger">
              {errors?.[registerName]?.message}
            </small>
          )}
        </div>
      </div>
    </div>
  );
}

InputDatePicker.propTypes = {
  errors: PropTypes.object.isRequired,
  setValue: PropTypes.func.isRequired,
  control: PropTypes.object.isRequired,
  readOnly: PropTypes.bool,
  previewFlag: PropTypes.string,
  mandatory: PropTypes.bool,
  labelName: PropTypes.string,
  registerName: PropTypes.string.isRequired,
  dateformat: PropTypes.string,
  minDateVal: PropTypes.instanceOf(dayjs),
  maxDateVal: PropTypes.instanceOf(dayjs),
  disabled: PropTypes.bool,
  onSelect: PropTypes.func,
};

InputDatePicker.defaultProps = {
  readOnly: false,
  previewFlag: "",
  mandatory: false,
  labelName: "",
  dateformat: "MM/DD/YYYY", // or whatever default format you want
  disabled: false,
  onSelect: () => {},
};
