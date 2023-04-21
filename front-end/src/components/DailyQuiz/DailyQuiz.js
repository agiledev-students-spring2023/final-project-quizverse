//eslint-disable-next-line
import styles from './DailyQuiz.module.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import Flashcard from './Flashcard/Flashcard';
import { useNavigate } from 'react-router-dom';

const DailyQuiz = (props) => {
  const navigate = useNavigate();
  let token = 'Zappy!';
  useEffect(() => {
    try {
      token = JSON.parse(localStorage.getItem('info')).token;
    } catch {
      console.log('Oh noes!');
      navigate('/');
    }
  });
  const [data, setData] = useState([
    {
      term: '',
      definition: ''
    }
  ]);
  const [answer, setAnswer] = useState('');
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [arrLength, setArrLength] = useState(0);
  const [arrIndex, setArrIndex] = useState(0); // eslint-disable-next-line
  const [displayTerm, setDisplayTerm] = useState(false); // eslint-disable-next-line
  const [displayDefinition, setDisplayDefinition] = useState(true);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const submitButton = (e) => {
    e.preventDefault();
    const foundUser = answer;
    if (foundUser === term) {
      alert('Correct!');
      setCorrect([...correct, term]);
      Next();
    } else {
      alert('Incorrect!');
      setIncorrect([...incorrect, term]);
    }
  };
  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock flashcards
    console.log('fetching 10 random flashcards...');
    axios
      .get('http://localhost:3001/daily-quiz', {
        headers: { 'jwt-token': token } // pass the token, if any, to the server
      })
      .then((response) => {
        // extract the data from the server response
        setData(response.data);
        setTerm(response.data[0].term);
        setDefinition(response.data[0].definition);
        setArrLength(response.data.length);
      })
      .catch((err) => {
        console.log(err);
        navigate('/'); //kick back to landing
      });
  }, []);
  useEffect(() => {
    setTerm(data[arrIndex].term);
    setDefinition(data[arrIndex].definition); // eslint-disable-next-line
  }, [arrIndex]);
  const Prev = () => {
    setDisplayTerm(false);
    if (arrIndex - 1 < 0) {
      return;
    } else {
      setArrIndex(arrIndex - 1);
    }
  };

  const Next = () => {
    setDisplayTerm(false);
    if (arrIndex + 1 >= arrLength) {
      alert(`Congratulations on finishing your Quiz! Score: ${correct.length} out of ${arrLength}`);
      axios
        .post('http://localhost:3001/study-stats', { correct: correct, incorrect: incorrect })
        .then(console.log('Success!'))
        .catch((err) => console.log(err));
      return;
    } else {
      setArrIndex(arrIndex + 1);
    }
  };

  const showAnswer = () => {
    setDisplayTerm(true);
  };

  return (
    <>
      <h1>Daily Quiz</h1>
      <h2>Current flashcard:</h2>
      <div class="flashcard">
        <Flashcard
          term={term}
          definition={definition}
          handleNext={Next}
          handlePrev={Prev}
          displayTerm={displayTerm}
          displayDefinition={displayDefinition}
        />
      </div>
      <p></p>
      <form className="login-page-form" onSubmit={submitButton}>
        <div className="login-page-input-container">
          <label htmlFor="password" className="login-page-label">
            Answer:
          </label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="answer-input"
          />
        </div>
        <button type="button" className="answer-button" onClick={submitButton}>
          Submit
        </button>
        <div>
          <button type="button" className="show-answer-button" onClick={showAnswer}>
            Show answer
          </button>
        </div>
      </form>
      <div>
        <h2>Topics You Got Right:</h2>
        {correct.map((word) => (
          <p>{word}</p>
        ))}
      </div>
      <div>
        <h2>Topics You Got Wrong:</h2>
        {incorrect.map((word) => (
          <p>{word}</p>
        ))}
      </div>
    </>
  );
};

export default DailyQuiz;
