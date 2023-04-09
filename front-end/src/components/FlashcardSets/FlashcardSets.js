import React from 'react';
import Search from '../Search/Search';
import FlashcardSet from './FlashcardSet/FlashcardSet';
import styles from './FlashcardSets.module.css';
import { useState, useEffect } from "react"
import axios from "axios"

function FlashcardSets() {
  const [data, setData] = useState([{
    "title":"",
    "description":"",
    "numCards":0
  }]

  )
  useEffect(() => {
    // fetch some mock sets
    // make this a backend request!
    //set name and description
    axios('http://localhost:3001/flashcard-sets')
      .then((response) => {
        // extract the data from the server response
        setData(response.data);
      })
      .catch((err) => {
        console.error(err); // the server returned an error... probably too many requests... until we pay!

      });
  }, []);
  return (
    <>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <div className={styles.flashcardSetContainer}>
        {data.map((set) => (
          <FlashcardSet
            id={Math.floor(1000 + Math.random() * 9000)} // generate random set id that will be replaced by db id later
            title={set.title}
            description={set.description}
            numCards={set.numCards}
          />
        ))}
      </div>
    </>
  );
}

export default FlashcardSets;
