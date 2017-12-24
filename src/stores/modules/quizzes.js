import State from "lib/StateClass.js";
import AnswerQuestion from "./answerAction";
import QuestionShift from "./questionShift";
import { associator } from "lib/ActionAssociatorIFace";

const QuizState = new State();
associator(QuizState, AnswerQuestion);
associator(QuizState, QuestionShift);
QuizState.initial = {
  greeting: "Merry Christmas Ya filthy animal",
  cQuiz: {
    cQ: 0,
    questions: [
      {
        statement: "What is your favorite Color?",
        answers: [
          { answerType: "blue", answerContent: "Blue" },
          { answerType: "red", answerContent: "Red" },
          { answerType: "yellow", answerContent: "Yellow" },
          {
            answerType: "blue no ... YEllooowww....",
            answerContent: "Blue no ... YEllooowww...."
          }
        ],
        answer: null
      },
      {
        statement: "What is the air speed velocity of an unladen swallow?",
        answers: [
          { answerType: "huh?", answerContent: "What???" },
          { answerType: "idk", answerContent: "I don't know that!" },
          { answerType: "gg", answerContent: "African or European?" },
          {
            answerType: "hg",
            answerContent: "How do you know such things??"
          }
        ],
        answer: null
      }
    ]
  }
};
export default QuizState.actionReducer.bind(QuizState);
