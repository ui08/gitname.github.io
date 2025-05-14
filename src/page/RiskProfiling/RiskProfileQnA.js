import React, { useState, useEffect } from "react";
import "./RiskProfileQnA.scss";
import Pageheader from "../../Layout/Pagehader";
import ButtonComp from "../../Component/ButtonComp/ButtonComp";
import axiosInstance from "../../util/axiosInstance";
import { Apiurl } from "../../util/apiurl";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../util/Loader";
import { getUserFilterDetails, getUserId } from "../../util/Authenticate";
import toast from "react-hot-toast";
import { decryptData, encrypt } from "../../util/Authenticate/CryptoJS";

const RiskProfileQnA = ({ initialData, onSubmit }) => {
  const navigate = useNavigate();
  const mode = decryptData(useParams().mode);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedResponses, setSelectedResponses] = useState({});
  const [advisorId, setAdvisorId] = useState(null);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      // If initialData is provided, initialize the state with it
      const initialResponses = initialData.reduce((acc, question) => {
        acc[question.id] =
          question.clientRiskProfileResponsesDTO?.responseId || null;
        return acc;
      }, {});
      setSelectedResponses(initialResponses);
    }
  }, [initialData]);

  useEffect(() => {
    if (mode === "edit") {
      fetchQuestionsForEdit();
    } else {
      fetchQuestions();
    }
  }, [mode]);

  useEffect(() => {
    // Check if all questions have been answered whenever selectedResponses changes
    const allAnswered = questions.every(
      (q) => selectedResponses[q.id] !== null
    );
    setIsSubmitDisabled(!allAnswered);
  }, [selectedResponses, questions]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(`${Apiurl.getQuestionList}`);
      const data = await response?.data;
      setQuestions(data);

      if (data.length > 0) {
        setAdvisorId(data[0].advisorId);
      }

      const initialResponses = data.reduce((acc, question) => {
        acc[question.id] = null; // Initialize with null (no response selected)
        return acc;
      }, {});
      setSelectedResponses(initialResponses);

      const allAnswered = data.every((q) => initialResponses[q.id] !== null);
      setIsSubmitDisabled(!allAnswered);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
      toast.error("Failed to fetch questions");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionsForEdit = async () => {
    try {
      const response = await axiosInstance.get(
        `${Apiurl.getQuestionAnswerForClient}${getUserFilterDetails(
          "clientId"
        )}`
      );
      const data = await response?.data;
      setQuestions(data);

      if (data.length > 0) {
        setAdvisorId(data[0].advisorId);
      }

      // Initialize selectedResponses with the client's previous responses
      const initialResponses = data.reduce((acc, question) => {
        acc[question.id] =
          question.clientRiskProfileResponsesDTO?.responseId || null;
        return acc;
      }, {});
      setSelectedResponses(initialResponses);

      const allAnswered = data.every((q) => initialResponses[q.id] !== null);
      setIsSubmitDisabled(!allAnswered);
    } catch (error) {
      console.error("Failed to fetch questions:", error);
    }
  };

  const handleOptionChange = (questionId, responseId) => {
    const updatedResponses = {
      ...selectedResponses,
      [questionId]: responseId, // Update the selected response for the question
    };
    setSelectedResponses(updatedResponses);

    // Check if all questions have been answered
    const allAnswered = questions.every((q) => updatedResponses[q.id] !== null);
    setIsSubmitDisabled(!allAnswered); // Enable submit button if all questions are answered
  };

  const handleNavigation = (direction) => {
    if (direction === "prev" && currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
    if (direction === "next" && currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!advisorId) {
      console.error("Advisor ID is not defined.");
      alert("Advisor ID is missing. Please try again.");
      return;
    }

    // Construct the payload as an array of objects
    const payload = Object.keys(selectedResponses).map((questionId) => {
      const selectedResponseId = selectedResponses[questionId];
      const question = questions.find((q) => q.id === parseInt(questionId, 10));
      const selectedResponse = question.riskProfileResponseBasedScoresDTO.find(
        (response) => response.responseId === selectedResponseId
      );

      return {
        id: mode === "edit" ? question.clientRiskProfileResponsesDTO?.id : null,
        responseId: parseInt(selectedResponseId, 10),
        advisorId: advisorId,
        questionId: parseInt(questionId, 10),
        clientId: getUserFilterDetails("clientId"),
        score: selectedResponse ? selectedResponse.score : null,
      };
    });

    try {
      const response = await axiosInstance.post(
        `${Apiurl.clientRiskProfile}`,
        payload
      );
      setLoading(false);
      toast.success("Risk Profile Data Successfully Submitted!");
      navigate("/" + encrypt("RiskProfiling"));
    } catch (error) {
      setLoading(false);
      console.error("Failed to submit data: ", error);
      alert("Failed to Submit Data");
    } finally {
      setLoading(false);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  const breadcrumbItems = [
    {
      label: "Risk Profile Q&A",
    },
  ];

  return (
    <>
      {loading ? (
        <Loader />
      ) : !questions || questions.length === 0 ? (
        <div className="no-questions">
          <p>No questions available. Please Add questionnaire through RM.</p>
        </div>
      ) : (
        <>
          {/* <Pageheader
      Breadcrumbshow={true}
      breadcrumbItems={breadcrumbItems}
    ></Pageheader> */}
          <div className="pagebody">
            <div className="rpqa-container">
              <div className="rpqa-question-card">
                <div className="rpqa-question-header">
                  <h3>
                    Question No : {currentQuestionIndex + 1} of{" "}
                    {questions.length}
                  </h3>
                </div>
                <div className="rpqa-question-text">
                  <p>
                    <strong>Q. </strong>
                    {currentQuestion.question}
                  </p>
                  <ul className="rpqa-options-list">
                    {currentQuestion.riskProfileResponseBasedScoresDTO.map(
                      (option, index) => (
                        <li key={option.responseId}>
                          <label>
                            <span>{index + 1}.</span>
                            &nbsp;
                            <input
                              type="radio"
                              name={`question-${currentQuestion.id}`}
                              value={option.responseId}
                              checked={
                                selectedResponses[currentQuestion.id] ===
                                option.responseId
                              }
                              onChange={() =>
                                handleOptionChange(
                                  currentQuestion.id,
                                  option.responseId
                                )
                              }
                            />
                            {option.responseText}
                          </label>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                <div className="rpqa-navigation-buttons">
                  <ButtonComp
                    wrapperName="btn_wrapper"
                    type="button"
                    btnStyle="box"
                    onClick={() => handleNavigation("prev")}
                    disabled={currentQuestionIndex === 0}
                    btnText={"Previous"}
                  />
                  {currentQuestionIndex !== questions.length - 1 ? (
                    <ButtonComp
                      wrapperName="btn_wrapper"
                      type="button"
                      btnStyle="box"
                      onClick={() => handleNavigation("next")}
                      disabled={currentQuestionIndex === questions.length - 1}
                      btnText={"Next"}
                    />
                  ) : (
                    <ButtonComp
                      wrapperName="btn_wrapper"
                      type="button"
                      btnStyle="box"
                      onClick={handleSubmit}
                      disabled={isSubmitDisabled}
                      btnText={"Submit"}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default RiskProfileQnA;
