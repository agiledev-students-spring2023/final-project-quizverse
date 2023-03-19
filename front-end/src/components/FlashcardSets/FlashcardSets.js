import React from 'react';
import Search from '../Search/Search';
import FlashcardSet from '../FlashcardSet/FlashcardSet';
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
    console.log("fetching 10 random flashcard sets...")
    axios("https://my.api.mockaroo.com/sets.json?key=6b3bc3e0")
      .then(response => {
        // extract the data from the server response
        setData(response.data)
      })
      .catch(err => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err) // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data
        const backupData = [{"numCards":12,"title":"Polarised next generation analyzer","description":"Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla."},{"numCards":6,"title":"Compatible needs-based analyzer","description":"Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum."},{"numCards":17,"title":"Decentralized real-time open system","description":"Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat. Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede. Morbi porttitor lorem id ligula."},{"numCards":20,"title":"Vision-oriented asymmetric protocol","description":"Phasellus in felis. Donec semper sapien a libero. Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla. Sed accumsan felis. Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi."},{"numCards":49,"title":"Face to face even-keeled instruction set","description":"Nulla nisl. Nunc nisl."},{"numCards":1,"title":"Profound zero tolerance methodology","description":"Ut at dolor quis odio consequat varius. Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi. Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum."},{"numCards":54,"title":"Pre-emptive interactive model","description":"Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros. Vestibulum ac est lacinia nisi venenatis tristique."},{"numCards":63,"title":"Organized scalable projection","description":"Proin interdum mauris non ligula pellentesque ultrices. Phasellus id sapien in sapien iaculis congue."},{"numCards":80,"title":"Realigned background approach","description":"Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi. Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit."},{"numCards":92,"title":"Robust responsive success","description":"Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla."}]
        setData(backupData);
      })
  }, []);
  return (
    <>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <div className={styles.flashcardSetContainer}>
        {data.map((set) => (
          <FlashcardSet title = {set.title} description = {set.description} numCards = {set.numCards}/>
        )
        )}
      </div>
    </>
  );
}

export default FlashcardSets;
