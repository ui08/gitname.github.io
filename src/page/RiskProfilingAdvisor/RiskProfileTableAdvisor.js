import React, { useEffect, useState } from "react";
import InputText from "../../Component/ComponentsInput/InputText";
import { useForm } from "react-hook-form";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import { getUserFilterDetails } from "../../util/Authenticate";

const RiskProfileTableAdvisor = ({ data = [], onSave, onCancel, edit }) => {
  const {
    register,
    handleSubmit,
    getValues,
    trigger,
    formState: { errors, isDirty },
    reset,
    watch,
  } = useForm();
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const defaults = generateFormDefaults(data);
    reset(defaults);
  }, [data, reset]);

  useEffect(() => {
    const subscription = watch(() => {
      setShowButtons(true);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const generateFormDefaults = (profiles) => {
    const defaults = {};
    profiles.forEach((profile, i) => {
      defaults[`label_${i}`] = profile.label;
      defaults[`min_${i}`] = profile.min;
      defaults[`max_${i}`] = profile.max;
    });
    return defaults;
  };

  const onSubmit = () => {
    const values = getValues();
    console.log("dd",values)
    const payload = data.map((_, index) => ({
      id: edit[index],
      riskprofileId: null,
      name: values[`label_${index}`],
      masterId: getUserFilterDetails("rmAdvId"),
      scoreFrom: 0.0,
      scoreTo: 0.0,
      numberOfRiskProfiles: data.length,
      maxScore: parseFloat(values[`max_${index}`]),
      minScore: parseFloat(values[`min_${index}`]),
      scoreInterval: 0.0,
    }));

    onSave && onSave(payload); // Send to parent
    setShowButtons(false);
    window.location.reload();
  };

  const handleUndo = () => {
    reset(generateFormDefaults(data));
    setShowButtons(false);
    onCancel && onCancel();
  };

  const handleRangeChange = (index, type, value) => {
    const values = getValues();
    const updatedValue = parseInt(value, 10);
    const currentMin = parseInt(values[`min_${index}`], 10);
    const currentMax = parseInt(values[`max_${index}`], 10);

    if (isNaN(updatedValue)) return;

    if (type === "max") {
      if (updatedValue < currentMin || updatedValue > 300) return;

      values[`max_${index}`] = updatedValue;

      if (index + 1 < data.length) {
        const nextMin = updatedValue + 1;
        if (nextMin <= 300) values[`min_${index + 1}`] = nextMin;
      }
    }

    if (type === "min") {
      if (updatedValue > currentMax) return;

      values[`min_${index}`] = updatedValue;

      if (index - 1 >= 0) {
        const prevMax = updatedValue - 1;
        if (prevMax >= values[`min_${index - 1}`]) {
          values[`max_${index - 1}`] = prevMax;
        }
      }
    }

    reset(values);
    setShowButtons(true);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="row">
        <div className="flex justify-content-center mb-4">
          <div className="row ">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100">
                <tr>
                  <th className="p-2">S.No.</th>
                  <th className="p-2">Risk Profile Names</th>
                  <th className="p-2">Min Score</th>
                  <th className="p-2">Max Score</th>
                </tr>
              </thead>
              <tbody>
                {data.map((profile, index) => (
                  <tr key={profile.id}>
                    <td className="p-2">
                      <div
                        className="arrow_badge"
                        style={{
                          "--arrow-color": profile.color,
                          backgroundColor: profile.color,
                          minHeight: "3rem",
                        }}
                      >
                        {profile.id}
                      </div>
                    </td>
                    <td className="p-2">
                      <InputText
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        getValues={getValues}
                        registerName={`label_${index}`}
                        labelName="Profile Name"
                        mandatory={true}
                        divClassName="table-edit"
                      />
                    </td>
                    <td className="p-2">
                      <InputText
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        getValues={getValues}
                        registerName={`min_${index}`}
                        type="number"
                        labelName="Min"
                        mandatory={true}
                        divClassName="table-edit"
                        onChange={(e) =>
                          handleRangeChange(index, "min", e.target.value)
                        }
                      />
                    </td>
                    <td className="p-2">
                      <InputText
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        getValues={getValues}
                        registerName={`max_${index}`}
                        type="number"
                        labelName="Max"
                        mandatory={true}
                        divClassName="table-edit"
                        onChange={(e) =>
                          handleRangeChange(index, "max", e.target.value)
                        }
                        validation={{
                          max: {
                            value: 300,
                            message: "Max value cannot exceed 300",
                          },
                          validate: (value) => {
                            const minValue = parseInt(getValues(`min_${index}`), 10);
                            if (parseInt(value, 10) <= minValue) {
                              return "Max must be greater than Min";
                            }
                            return true;
                          }
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showButtons && (
          <div className="row">
            <div className="d-flex gap-3 justify-content-start">
              <ButtonComp
                wrapperName="submit_btn_wrapper"
                type="submit"
                btnStyle="box"
                btnText={"Save"}
              />
              <ButtonComp
                wrapperName="submit_btn_wrapper"
                type="button"
                btnStyle="box"
                btnText={"Undo"}
                onClick={handleUndo}
              />
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default RiskProfileTableAdvisor;
