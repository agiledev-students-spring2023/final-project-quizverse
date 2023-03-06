//eslint-disable-next-line
import styles from './DailyQuiz.module.css'
import React, {useState} from 'react';
import Box from '@mui/material/Box';

const DailyQuiz = props => {
  const words = ['monkey','birch','virus']
  //const definitions = ['animal','plant','not alive']
  //const [flashcard, setFlashcard] = useState('');
  const [answer, setAnswer] = useState('');
  let word = words[0]
  const handleSubmit = (event) => {
    event.preventDefault();
    const foundUser = answer;
    if (foundUser) {
      word=words[1]
      alert('Correct!');
    } else {
      alert('Incorrect!');
    }
  }
  return (
      <>
      <h1>THIS IS THE DAILY QUIZ SCREEN</h1>
      <p>Current flashcard:</p>
      <Box sx={{ p: 2, border: '5px dashed grey' }}><h2>{word}</h2></Box>
      <form className="login-page-form" onSubmit={handleSubmit}>
        <div className="login-page-input-container">
          <label htmlFor="password" className="login-page-label">Answer:</label>
          <input
            type="text"
            id="answer"
            value={answer}
            onChange={(event) => setAnswer(event.target.value)}
            className="answer-input"
          />
        </div>
        <button type="submit" className="answer-button">Submit</button>
        </form>
        <div>
          <h2>Topics You Got Right:</h2>
        </div>
        <div>
          <h2>Topics You Got Wrong:</h2>
        </div>
        <div>
          <h2>Graph of Current Statistics:</h2>
        </div>
      </>
  )
}

export default DailyQuiz