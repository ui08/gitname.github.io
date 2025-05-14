import PropTypes from "prop-types"; // Import PropTypes
import React, { useState } from "react";
import "./Webcam.scss";

export default function Webcam(props) {
  const [chooseDoc, setChooseDoc] = useState("");

  const {
    register,
    errors,

  } = props;

  return (
    <div className={"app_input-wrapper"}>
      <input
        className="form-check-input"
        value="Tier1 and Tier2"
        type="radio"
        name="choosesDoc"
        id="Tier1 and Tier2"
        checked={chooseDoc === "Tier1 and Tier2"}
        {...register("choosesDoc", {
          required: "Choose Document Type",
          onChange: (e) => {
            setChooseDoc(e.target.value);
          },
        })}
        onClick={() => { }}
      />
      <label className="form-check-label" htmlFor="Tier1 and Tier2">
        tier1_Tier2
      </label>

      {errors?.choosesDoc && (
        <small className="textdanger">{errors?.choosesDoc?.message}</small>
      )}
    </div>
  );
}

// Prop types validation
Webcam.propTypes = {
  register: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,

};


