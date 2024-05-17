import './CustomizeQuiz.css';
import { Link } from 'react-router-dom';

function QuizCreated() {
    return (
        <div className="settings-container create-quiz-container">
            <h1>Quiz Created Successfully!</h1>
            <Link to="/CreateQuiz">
                <button type="button" className="back-btn">Back</button>
            </Link>
        </div>
    );
}

export default QuizCreated;
