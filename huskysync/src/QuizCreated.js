import './CustomizeQuiz.css';
import { Link } from 'react-router-dom';

function QuizCreated() {
    return (
        <div className="custom-quiz-panel quiz-created">
            <div className='header'>
                <h2 id="titlet"> Quiz Created Successfully!</h2>
            </div>
            <div>
                <Link to="/GroupMain">
                    <button type="button" className="save-btn">Back</button>
                </Link>
            </div>
        </div>
    );
}

export default QuizCreated;
