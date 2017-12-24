import React from "react";

export const QuestionCounter = props => {
  return (
    <div className="questionCounter">
      Question <span>{props.counter}</span> out of <span>{props.max}</span>
    </div>
  );
};

export default QuestionCounter;
