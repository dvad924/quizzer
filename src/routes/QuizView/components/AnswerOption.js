import React from "react";

export const AnswerRadioOption = props => {
  return (
    <div key={props.answerType}>
      <ul className="answerOption">
        <input
          type="radio"
          className="radioCustomButton"
          name="radioGroup"
          checked={props.answerType === props.answer}
          id={props.answerType}
          value={props.answerType}
          disabled={props.answer}
          onChange={props.onAnswerSelected}
        />
        <label className="radioCustomLabel" htmlFor={props.answerType}>
          {props.answerContent}
        </label>
      </ul>
    </div>
  );
};

export default AnswerRadioOption;
