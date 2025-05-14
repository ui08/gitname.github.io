import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types"; // Import PropTypes
import React from "react";
import ButtonComp from "./../../Component/ButtonComp/ButtonComp";

const ActionButtons = ({ params, buttonConfigs, handleFunction }) => {
  return (
    <div className="action_btn">
      {buttonConfigs.map(
        ({ text, icon, action, show, disabled }) => (
    
          (
            <ButtonComp
              key={text}
              wrapperName={!show ? "btn_wrapper d-none" : "btn_wrapper"}
              type="button"
              btnStyle="round"
              btnText={text}
              disabled={disabled}
              onClick={() => handleFunction(params, action, disabled)}
            />
          )
        )
      )}
    </div>
  );
};

// Add PropTypes
ActionButtons.propTypes = {
  params: PropTypes.object.isRequired, // Define as object; adjust if there's a specific shape
  buttonConfigs: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
      icon: PropTypes.string, // Assuming icon is a FontAwesomeIcon object
      action: PropTypes.string.isRequired, // The action name or key
      show: PropTypes.bool, // Optional, defaults to true
      disabled: PropTypes.bool, // Optional, defaults to false
    })
  ).isRequired,
  handleFunction: PropTypes.func.isRequired, // Function to handle button clicks
};

export default ActionButtons;
