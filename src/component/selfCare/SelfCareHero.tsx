import { useNavigate } from "react-router-dom";
import "./SelfCareHero.css";

const SelfCareHero = () => {
  const navigate = useNavigate();
  const handleStartQuiz = () => {
    navigate("/quiz");
  };
  return (
    <section className="hero">
      <div className="hero-overlay">
        <h1 className="hero-title">
          Build a self care routine
          <br />
          suitable for you
        </h1>
        <p className="hero-subtitle">
          Take out test to get a personalised self care
          <br />
          routine based on your needs.
        </p>
        <button className="hero-button" onClick={handleStartQuiz}>
          Start the quiz
        </button>
      </div>
    </section>
  );
};

export default SelfCareHero;
