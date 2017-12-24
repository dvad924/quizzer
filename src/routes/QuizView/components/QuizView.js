import React from "react";
import "../index.css";
import Quiz from "../containers/QuizContainer";
export default props => {
  return (
    <div>
      <h1>{props.content || "HELLO"}</h1>
      <Quiz />
    </div>
  );
};
