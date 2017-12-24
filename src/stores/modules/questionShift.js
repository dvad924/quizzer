import { UXAction } from "lib/ActionClass";

export class ShiftQuestionAction extends UXAction {
  constructor() {
    super();
    this.name = "SHIFT_QUESTION";
  }

  _consequence(state, action) {
    let nstate = Object.assign({}, state);
    let quiz = nstate.cQuiz;
    quiz.cQ += quiz.cQ + 1 === quiz.questions.length ? 0 : 1;
    return nstate;
  }
}

export const questionShift = (...args) =>
  new ShiftQuestionAction().action(...args);
const instance = new ShiftQuestionAction();
export default instance;
