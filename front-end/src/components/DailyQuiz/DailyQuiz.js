//eslint-disable-next-line
import styles from './DailyQuiz.module.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import Flashcard from './Flashcard/Flashcard';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import ViewCard from '../ViewSet/ViewCard';
import { TextField, FormControl, Button, Container, Stack } from '@mui/material';

const DailyQuiz = (props) => {
  const navigate = useNavigate();
  let token = 'Zappy!';
  let parsed = '';
  const [user, setUser] = useState('');
  let username = '';
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
    } catch {
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'DailyQuiz' } });
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
  const [arrIndex, setArrIndex] = useState(0);
  const [displayTerm, setDisplayTerm] = useState(false); // eslint-disable-next-line
  const [displayDefinition, setDisplayDefinition] = useState(true);
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const [complete, setComplete] = useState(false);
  let noDupesCorrect = [];
  let noDupesIncorrect = [];

  const submitButton = (e) => {
    e.preventDefault();
    const foundUser = answer;
    if (foundUser === term) {
      toast.success('Correct!', {
        id: 'correct'
      });
      setCorrect([
        ...correct,
        { term: term, definition: definition, set_id: data[arrIndex].set_id }
      ]);
      console.log(correct);
      Next();
    } else {
      toast.error('Incorrect!', {
        id: 'incorrect'
      });
      setIncorrect([
        ...incorrect,
        { term: term, definition: definition, set_id: data[arrIndex].set_id }
      ]);
      noDupesIncorrect = [...new Set(incorrect)];
      console.log(incorrect);
    }
  };
  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock flashcards
    console.log('fetching 10 random flashcards...');
    axios
      .get('http://localhost:3001/daily-quiz', {
        headers: { 'jwt-token': token, username: username } // pass the token, if any, to the server
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
      setComplete(true);
      toast.success(
        `Congratulations on finishing your Quiz! Score: ${correct.length} out of ${arrLength}`,
        {
          id: 'quiz-finished'
        }
      );
      axios({
        method: 'POST',
        data: {
          correct: correct,
          incorrect: incorrect
        },
        withCredentials: true,
        headers: { 'jwt-token': token, username: parsed.username },
        url: 'http://localhost:3001/study-stats'
      })
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
      <form onSubmit={submitButton}>
        <TextField
          id="filled-basic"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          label="Type the answer"
          disabled={complete}
        />
        <div>
          <Button
            sx={{ m: 1, width: '25vw' }}
            onClick={submitButton}
            variant="contained"
            disabled={complete}>
            submit
          </Button>
          <Button
            sx={{ m: 1, width: '25vw' }}
            onClick={showAnswer}
            variant="contained"
            disabled={complete}>
            hint
          </Button>
        </div>
      </form>
      <div>
        <h2>Topics You Got Right:</h2>
        {correct.map((o) => (
          <p>{o.term}</p>
        ))}
      </div>
      <div>
        <h2>Topics You Got Wrong:</h2>
        {noDupesIncorrect.map((o) => (
          <p>{o.term}</p>
        ))}
      </div>
    </>
  );
};

export default DailyQuiz;
