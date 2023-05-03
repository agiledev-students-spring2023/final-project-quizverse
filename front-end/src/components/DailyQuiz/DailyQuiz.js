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


  useEffect(() => {
    // fetch some mock flashcards
    axios
      .get(`${process.env.REACT_APP_APIURL}/daily-quiz`, {
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
        if (err.response.data.msg === 'User has no sets') {
          toast.error('You have no sets to study! Please create a set and try again later!', {
            id: 'no-sets'
          });
          navigate('/home');
        } else {
          navigate('/'); //kick back to landing
        }
      });
  }, []);

  useEffect(() => {
    setTerm(data[arrIndex].term);
    setDefinition(data[arrIndex].definition);
  }, [arrIndex]);

  useEffect(() => {
    if (correct.length >= 1 || incorrect.length >= 1) {
      console.log(correct);
      console.log(incorrect);
      Next();
    }
  }, [correct, incorrect]);

  const submitButton = (e) => {
    e.preventDefault();
    console.log('submitted');
    if (answer == term) {
      toast.success('Correct!', {
        id: 'correct'
      });
      setCorrect([
        ...correct,
        { term: term, definition: definition, set_id: data[arrIndex].set_id }
      ]);
      console.log('finished saving answer');
      setAnswer('');
    } else {
      toast.error('Incorrect!', {
        id: 'incorrect'
      });
      setIncorrect([
        ...incorrect,
        { term: term, definition: definition, set_id: data[arrIndex].set_id }
      ]);
      setAnswer('');
    }
  };
  // the following side-effect will be called once upon initial render

  // const Prev = () => {
  //   setDisplayTerm(false);
  //   if (arrIndex - 1 < 0) {
  //     return;
  //   } else {
  //     setArrIndex(arrIndex - 1);
  //   }
  // };

  const Next = () => {
    setDisplayTerm(false);
    if (arrIndex + 1 >= arrLength) {
      let uniqueCorrects = correct.filter((ans, i, arr) => {
        return i === arr.findIndex((item) => item.term === ans.term);
      });

      let uniqueIncorrect = incorrect.filter((ans, i, arr) => {
        return i === arr.findIndex((item) => item.term === ans.term);
      });
      setComplete(true);
      toast.success(
        `Congratulations on finishing your Quiz! Score: ${uniqueCorrects.length} out of ${
          uniqueCorrects.length + uniqueIncorrect.length
        }`,
        {
          id: 'quiz-finished'
        }
      );
      console.log('correct terms: ', correct);
      console.log('incorrect terms: ', incorrect);
      axios({
        method: 'POST',
        data: {
          correct: correct,
          incorrect: incorrect
        },
        withCredentials: true,
        headers: { 'jwt-token': token, username: parsed.username },
        url: `${process.env.REACT_APP_APIURL}/study-stats`
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
      <div>
        <Flashcard
          term={term}
          definition={definition}
          // handleNext={Next}
          // handlePrev={Prev}
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
            show answer
          </Button>
        </div>
      </form>
      <div className={styles['quiz-results']}>
        <div>
          <h3>Topics You Got Right:</h3>
          {correct.map((o) => (
            <p>{o.term}</p>
          ))}
        </div>
        <div>
          <h3>Topics You Got Wrong:</h3>
          {incorrect
            .filter((ans, i, arr) => {
              return i === arr.findIndex((item) => item.term === ans.term);
            })
            .map((o) => (
              <p>{o.term}</p>
            ))}
        </div>
      </div>
    </>
  );
};

export default DailyQuiz;
