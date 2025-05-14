import React from "react";
import "./RiskProfileAdvisor.scss";

const RiskProfileQuestionnaireCard = ({ questions }) => {
  return (
    <div className="rpc-container">
      <div className="rpc-header d-flex justify-content-space-between">
        <h5 className="rpc-title">Risk Profile Questionnaire (No. of Questions: {questions.length})</h5>
        <h5 className="rpc-title">Score</h5>
        {/* <p className="rpc-question-count">No. of Questions: {questions.length}</p> */}
      </div>

      {questions.map((q, index) => (
        <div key={q.id} className="rpc-card">
          <div className="rpc-question-row">
            <div className="rpc-question-text">
              <span className="rpc-question-number">{index + 1}.</span> {q.question}
            </div>
          </div>

          <div className="rpc-options">
            {q.riskProfileResponseBasedScoresDTO.map((option, idx) => (
              <div key={option.id} className="rpc-option-row">
                <span className="rpc-option-label">
                  {String.fromCharCode(97 + idx)}) {option.responseText}
                </span>
                <span className="rpc-option-score">{option.score}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default RiskProfileQuestionnaireCard;
