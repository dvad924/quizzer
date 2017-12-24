import React from "react";
import QuestionCounter from "./QuestionCounter";
import Question from "./Question";
import AnswerOption from "./AnswerOption";

export const Quiz = props => {
  return (
    <div className="quiz">
      <QuestionCounter {...props.counter} />
      <Question {...props.question} />
      {props.answers.map(d => <AnswerOption {...d} />)}
    </div>
  );
};

export default Quiz;
