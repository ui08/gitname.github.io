import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import InputText from "../../Component/ComponentsInput/InputText";
import { useTranslation } from "react-i18next";
import SelectElement from "../../Component/ComponentsInput/InputSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./RiskProfileAdvisor.scss"
import toast from "react-hot-toast";

const MAX_QUESTIONS = 12;
const MIN_QUESTIONS = 6;
const MAX_OPTIONS = 5;

const FormComponent = ({
  onSubmit,
  onQuestionCountChange,
  onCurrentIndexChange,
  editData = null,
}) => {
  const { t } = useTranslation(["Common", "Messages", "Form"]);

  const [questionCount, setQuestionCount] = useState(
    editData ? editData.length : MIN_QUESTIONS
  );
  const [currentIndex, setCurrentIndex] = useState(0);
  const [optionCounts, setOptionCounts] = useState(
    editData
      ? editData.map((q) =>
          q.riskProfileResponseBasedScoresDTO.map((_, i) => i)
        )
      : Array(MIN_QUESTIONS).fill([0])
  );
  const [formData, setFormData] = useState({});

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    trigger,
    getValues,
    control,
    reset,
  } = useForm({
    defaultValues: {
      question_count: editData ? editData.length : MIN_QUESTIONS,
    },
  });

  // Load all editData values on mount
  useEffect(() => {
    if (editData) {
      const initialFormData = {};
      const initialOptionCounts = [];

      editData.forEach((question, qIndex) => {
        initialFormData[qIndex] = {
          questionText: question.question,
          options: question.riskProfileResponseBasedScoresDTO.map((opt) => ({
            responseText: opt.responseText,
            score: opt.score.toString(),
          })),
          optionIndexes: question.riskProfileResponseBasedScoresDTO.map(
            (_, i) => i
          ),
        };

        initialOptionCounts[qIndex] =
          question.riskProfileResponseBasedScoresDTO.map((_, i) => i);

        setValue(`question_${qIndex}_text`, question.question);
        question.riskProfileResponseBasedScoresDTO.forEach((opt, idx) => {
          setValue(`question_${qIndex}_option_${idx}`, opt.responseText);
          setValue(`question_${qIndex}_score_${idx}`, opt.score.toString());
        });
      });

      setFormData(initialFormData);
      setOptionCounts(initialOptionCounts);
      setQuestionCount(editData.length);
    }
  }, [editData, setValue]);

  // Handle form reset when question changes
  useEffect(() => {
    const data = formData[currentIndex] || {
      questionText: "",
      options: [],
      optionIndexes: [],
    };

    reset();
    setValue(`question_${currentIndex}_text`, data.questionText || "");

    data.options?.forEach((opt, idx) => {
      setValue(
        `question_${currentIndex}_option_${idx}`,
        opt.responseText || ""
      );
      setValue(`question_${currentIndex}_score_${idx}`, opt.score || "");
    });

    onCurrentIndexChange?.(currentIndex);
  }, [currentIndex, formData, reset, setValue]);

  // Notify parent of question count
  useEffect(() => {
    onQuestionCountChange?.(questionCount);
  }, [questionCount]);

  const handleAddOption = (index) => {
    const updated = [...optionCounts];
    const nextIdx =
      updated[index].length > 0 ? Math.max(...updated[index]) + 1 : 0;
    updated[index] = [...updated[index], nextIdx];
    setOptionCounts(updated);

    setValue(`question_${index}_option_${nextIdx}`, "");
    setValue(`question_${index}_score_${nextIdx}`, "");
  };

  const handleRemoveOption = (qIndex, optId) => {
    const updated = [...optionCounts];
    updated[qIndex] = updated[qIndex].filter((id) => id !== optId);
    setOptionCounts(updated);

    setValue(`question_${qIndex}_option_${optId}`, "");
    setValue(`question_${qIndex}_score_${optId}`, "");
  };

  const validateTotalScore = (currentIndex, optionCounts, getValues) => {
    let totalScore = 0;

    // Sum all scores from all questions and options
    for (let qIndex = 0; qIndex < optionCounts.length; qIndex++) {
      const optionIndexes = optionCounts[qIndex] || [];

      for (const optIdx of optionIndexes) {
        const score = getValues(`question_${qIndex}_score_${optIdx}`);
        const scoreNum = parseInt(score || 0, 10);

        if (isNaN(scoreNum)) continue;
        totalScore += scoreNum;
      }
    }

    return totalScore === 150 || "Total score of all options must equal 150";
  };

  const handleNavigation = async (direction) => {
    // Only validate if going to next question
    if (direction === "next") {
      const fieldsToValidate = [
        `question_${currentIndex}_text`,
        ...optionCounts[currentIndex].flatMap((optIdx) => [
          `question_${currentIndex}_option_${optIdx}`,
          `question_${currentIndex}_score_${optIdx}`,
        ]),
      ];

      const valid = await trigger(fieldsToValidate);
      if (!valid) return;
    }

    const totalScoreValid = validateTotalScore(
      currentIndex,
      optionCounts,
      getValues
    );
    if (totalScoreValid !== true) {
      // alert(totalScoreValid); // Or show in a better way
      toast(totalScoreValid);
      return;
    }

    // Save current data regardless of direction
    const currentData = {
      questionText: getValues(`question_${currentIndex}_text`),
      options: (optionCounts[currentIndex] || []).map((optIdx) => ({
        responseText: getValues(`question_${currentIndex}_option_${optIdx}`),
        score: getValues(`question_${currentIndex}_score_${optIdx}`),
      })),
      optionIndexes: [...optionCounts[currentIndex]],
    };

    setFormData((prev) => ({
      ...prev,
      [currentIndex]: currentData,
    }));

    setCurrentIndex((prev) => (direction === "next" ? prev + 1 : prev - 1));
  };

  const onSubmitForm = () => {
    const latestValues = getValues();
    const updatedData = {
      ...formData,
      [currentIndex]: {
        questionText: latestValues[`question_${currentIndex}_text`],
        options: (optionCounts[currentIndex] || []).map((optIdx) => ({
          responseText:
            latestValues[`question_${currentIndex}_option_${optIdx}`],
          score: latestValues[`question_${currentIndex}_score_${optIdx}`],
        })),
        optionIndexes: [...(optionCounts[currentIndex] || [])],
      },
    };

    const totalScoreValid = validateTotalScore(
      currentIndex,
      optionCounts,
      getValues
    );
    if (totalScoreValid !== true) {
      // alert(totalScoreValid); // Or show in a better way
      toast(totalScoreValid);
      return;
    }

    const allData = Array.from({ length: questionCount }).map((_, i) => {
      const data = updatedData[i] || {};
      const questionText = data.questionText || "";

      const responses =
      data.options?.map((opt, j) => {
      const existingOption = editData?.[i]?.riskProfileResponseBasedScoresDTO?.find(
      (res) =>
        res.responseText === opt.responseText &&
        String(res.score) === String(opt.score)
      );

      return {
      id: existingOption?.id || null,
      responseId: j + 1,
      responseText: opt.responseText || "",
      score: opt.score || "0",
    };
  }) || [];

        console.log(data.options, "Edit");
      return {
        id: editData?.[i]?.id || null,
        question: questionText,
        riskProfileResponseBasedScoresDTO: responses,
        totalNumberQuestion: questionCount, // Using state value directly
        questionCount: i + 1,
      };
    });

    onSubmit(allData);
  };

  const useFromProps = {
    register,
    errors,
    setValue,
    trigger,
    control,
    getValues,
  };

  const questionOptions = Array.from(
    { length: MAX_QUESTIONS - MIN_QUESTIONS + 1 },
    (_, i) => {
      const count = MIN_QUESTIONS + i;
      return { value: count, label: `${count}` };
    }
  );

  const calculateCurrentTotal = () => {
    let total = 0;
    for (let qIndex = 0; qIndex < optionCounts.length; qIndex++) {
      const optionIndexes = optionCounts[qIndex] || [];
      for (const optIdx of optionIndexes) {
        const score = getValues(`question_${qIndex}_score_${optIdx}`);
        const scoreNum = parseInt(score || 0, 10);
        if (!isNaN(scoreNum)) total += scoreNum;
      }
    }
    return total;
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {!editData && (
        <div className="row col-12 col-md-4 col-lg-4 col-xl-4 mb-5">
          <SelectElement
            register={register}
            errors={errors}
            setValue={setValue}
            control={control}
            divClassName="question-count-select"
            readOnly={false}
            previewFlag=""
            registerName="question_count"
            mandatory={false}
            labelName="Total Number of Questions"
            options={questionOptions}
            defaultValue={MIN_QUESTIONS}
            value={questionCount}
            onSelect={(selectedOption) => {
              setQuestionCount(Number(selectedOption.value));
              setValue("question_count", Number(selectedOption.value));
            }}
          />
        </div>
      )}

      <div className="mb-5">
        <InputText
          {...useFromProps}
          registerName={`question_${currentIndex}_text`}
          name={`question_${currentIndex}_text`}
          labelName={`Question ${currentIndex + 1}`}
          mandatory={true}
          divClassName="question-field"
          maxLength={300}
        />
      </div>

      {optionCounts[currentIndex]?.map((optId, optIdx) => (
        <div key={optIdx} className="row flex align-items-center mb-2">
          <div className="col-12 col-md-8 col-lg-8 col-xl-8">
            <InputText
              {...useFromProps}
              registerName={`question_${currentIndex}_option_${optId}`}
              name={`question_${currentIndex}_option_${optId}`}
              labelName={`Option ${optIdx + 1}`}
              mandatory={true}
              divClassName="option-field"
              maxLength={100}
            />
          </div>
          <div className="col-12 col-md-3 col-lg-3 col-xl-3">
            <InputText
              {...useFromProps}
              registerName={`question_${currentIndex}_score_${optId}`}
              name={`question_${currentIndex}_score_${optId}`}
              labelName="Score"
              // type="number"
              mandatory={true}
              divClassName="score-field"
              maxLength={3}
              validate={(value) => {
                const num = parseInt(value, 10);
                return (
                  (!isNaN(num) && num >= 0) || "Score must be a positive number"
                );
              }}
            />
          </div>
          <div className="col-md-1 col-lg-1 col-xl-1">
            <button
              type="button"
              className="btn"
              onClick={() => handleRemoveOption(currentIndex, optId)}
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </div>
      ))}

      {optionCounts[currentIndex]?.length < MAX_OPTIONS && (
        <button
          type="button"
          className="btn btn-link p-0 mb-3"
          onClick={() => handleAddOption(currentIndex)}
        >
          Add Option +
        </button>
      )}

      <div className="rpqa-navigation-buttons mt-4">
        {currentIndex > 0 && (
          <ButtonComp
            wrapperName="btn_wrapper"
            type="button"
            btnStyle="box"
            onClick={() => handleNavigation("prev")}
            btnText={"Previous"}
          />
        )}
        {currentIndex < questionCount - 1 ? (
          <ButtonComp
            wrapperName="btn_wrapper"
            type="button"
            btnStyle="box"
            onClick={() => handleNavigation("next")}
            btnText={"Next"}
          />
        ) : (
          <ButtonComp
            wrapperName="btn_wrapper"
            type="submit"
            btnStyle="box"
            btnText={"Submit"}
          />
        )}
      </div>
      {/* <div className="total-score-display mb-3">
        Current Total Score: {calculateCurrentTotal()} / 150
        {calculateCurrentTotal() !== 150 && (
          <span className="text-danger ml-2">(Must equal 150)</span>
        )}
      </div> */}
    </form>
  );
};

FormComponent.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onCurrentIndexChange: PropTypes.func,
  onQuestionCountChange: PropTypes.func,
  editData: PropTypes.array,
};

export default FormComponent;
