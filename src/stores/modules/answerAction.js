import { UXAction } from "lib/ActionClass";

export class AnswerAction extends UXAction {
  constructor() {
    super();
    this.name = "ANSWER_QUESTION";
  }
  _consequence(state, action) {
    let nstate = Object.assign({}, state);
    let quiz = nstate.cQuiz;
    let question = quiz.questions[quiz.cQ];
    question.answer = action.payload;
    return nstate;
  }
}

export const answerAction = (...args) => new AnswerAction().action(...args);
export default new AnswerAction();
