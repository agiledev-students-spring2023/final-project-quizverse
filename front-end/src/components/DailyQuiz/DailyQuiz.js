//eslint-disable-next-line
import styles from './DailyQuiz.module.css';
import React, { useState, useEffect } from "react"
import axios from "axios"
import Flashcard from '../Flashcard/Flashcard'


const DailyQuiz = (props) => {
  
  const [data, setData] = useState([{
    "term":"",
    "definition":""
  }])
  const [answer, setAnswer] = useState('');
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('')
  const [arrLength, setArrLength] = useState(0)
  const [arrIndex, setArrIndex] = useState(0)
  const [displayTerm, setDisplayTerm] = useState(true)
  const [displayDefinition, setDisplayDefinition] = useState(false)
  const [correct, setCorrect] = useState([]);
  const [incorrect, setIncorrect] = useState([]);
  const submitButton = (e) => {
    e.preventDefault()
    const foundUser = answer;
    if (foundUser==definition) {
      alert('Correct!');
      setCorrect([...correct, term])
    } else {
      alert('Incorrect!');
      setIncorrect([...incorrect, term])
    }
  };
  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock flashcards
    console.log("fetching 10 random flashcards...")
    axios("https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0")
      .then(response => {
        // extract the data from the server response
        setData(response.data)
        setTerm(response.data[0].term)
        setDefinition(response.data[0].definition)
        setArrLength(response.data.length)
      })
      .catch(err => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err) // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data
        const backupData = [{"term":"encryption","definition":"adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit"},{"term":"instruction set","definition":"convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam"},{"term":"contingency","definition":"elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue"},{"term":"Sharable","definition":"vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa"},{"term":"User-friendly","definition":"praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus"},{"term":"executive","definition":"sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl"},{"term":"model","definition":"elit proin interdum mauris non ligula pellentesque ultrices phasellus id"},{"term":"Ergonomic","definition":"massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi"},{"term":"intangible","definition":"porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis"},{"term":"challenge","definition":"luctus rutrum nulla tellus in sagittis dui vel nisl duis ac"}]

        setData(backupData)
        setTerm(backupData[0].term)
        setDefinition(backupData[0].definition)
        setArrLength(backupData.length)
      })
  }, []) 

;useEffect(()=>{
  setTerm(data[arrIndex].term)
  setDefinition(data[arrIndex].definition)
},[arrIndex])


  ;const Prev = () => {
    setDisplayDefinition(false)
    if (arrIndex - 1< 0){
      return
    }
    else{
      setArrIndex(arrIndex-1)
    }
  }

  ;const Next = () => {
    setDisplayDefinition(false)
    if (arrIndex + 1>= arrLength){
      return
    }
    else{
      setArrIndex(arrIndex+1)
    }
  }

  ;const showAnswer = () => {
    setDisplayDefinition(true)
  }

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
