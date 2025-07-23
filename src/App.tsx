import "./App.css";
import QuizPage from "./component/quiz/Quiz";
import ResultsPage from "./component/result/Result";
import SelfCareHero from "./component/selfCare/SelfCareHero";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SelfCareHero />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/results" element={<ResultsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
