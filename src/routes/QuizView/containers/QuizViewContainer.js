import { connect } from "react-redux";
import QuizView from "../components/QuizView";

const mapStateToProps = s => {
  return {
    content: s.quizzes.greeting
  };
};

export default connect(mapStateToProps)(QuizView);
