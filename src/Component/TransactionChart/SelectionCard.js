import React from 'react';

const SelectionCard = ({ title, iconSrc, value, selectedOption, onChange }) => {
  return (
    <div className={`card ${selectedOption === value ? 'border-primary' : ''}`}>
      <div className="card-body text-center">
        <input
          type="radio"
          id={value}
          name="option"
          value={value}
          checked={selectedOption === value}
          onChange={onChange}
          style={{position:"absolute", left:"30px", margin:"5px"}}
        />
        <label htmlFor={value} className='d-block ' >
          {title}
        </label>
        <div className="icon mb-2">
            <img src={iconSrc} alt={title} style={{ width: '50px', height: '50px' }} />
        </div>
      </div>
    </div>
  );
};

export default SelectionCard;
