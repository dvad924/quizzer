import App from "App";
import QuizView from "routes/QuizView/containers/";
import HomeView from "routes/Home";
export const createRoutes = store => [
  {
    path: "/",
    component: App,
    indexRoute: HomeView(store),
    childRoutes: [QuizView()]
  }
];

export default createRoutes;
