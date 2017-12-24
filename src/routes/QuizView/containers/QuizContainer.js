import { connect } from "react-redux";
import Quiz from "../components/Quiz";
import { answerAction } from "stores/modules/answerAction";
import { questionShift } from "stores/modules/questionShift";
import { finishQuiz } from "stores/modules/finishQuiz";
const mapStateToProps = s => {
  let cQuiz = s.quizzes.cQuiz;
  let cQuestion = cQuiz.questions[cQuiz.cQ];
  return {
    counter: { counter: cQuiz.cQ + 1, max: cQuiz.questions.length },
    question: { content: cQuestion.statement },
    answers: cQuestion.answers.map(a => {
      let t = Object.assign({}, a);
      t.answer = cQuestion.answer;
      return t;
    })
  };
};

const mapDispatchToProps = {
  answer: answerAction,
  questionShift,
  finishQuiz
};

const mergeProps = (props, dispatches, own) => {
  props.answers.forEach(x => {
    x.onAnswerSelected = () =>
      dispatches
        .answer(x.answerType)
        .then(() => new Promise((resolve, reject) => setTimeout(resolve, 400)))
        .then(dispatches.finishQuiz)
        .then(dispatches.questionShift);
  });
  return props;
};
export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(Quiz);
