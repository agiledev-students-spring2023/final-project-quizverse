import React from 'react';
import Search from '../Search/Search';
import FlashcardSet from '../FlashcardSet/FlashcardSet';
import styles from './FlashcardSets.module.css';

function FlashcardSets() {
  return (
    <>
      <div className={styles.searchContainer}>
        <Search />
      </div>
      <div className={styles.flashcardSetContainer}>
        <FlashcardSet />
        <FlashcardSet />
        <FlashcardSet />
        <FlashcardSet />
        <FlashcardSet />
        <FlashcardSet />
        <FlashcardSet />
        <FlashcardSet />
        <FlashcardSet />
      </div>
    </>
  );
}

export default FlashcardSets;
