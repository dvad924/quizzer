import { UXAction } from "lib/ActionClass";

export class FinishQuizAction extends UXAction {
  constructor() {
    super();
    this.name = "FINISH_QUIZ";
  }
  _consequence(state, action) {
    let nstate = Object.assign({}, state);
    let quiz = nstate.cQuiz;
    if (quiz.cQ + 1 >= quiz.questions.length) console.log("Finished the Quiz!");
    return nstate;
  }
}

export const finishQuiz = (...args) => new FinishQuizAction().action(...args);
export default new FinishQuizAction();
