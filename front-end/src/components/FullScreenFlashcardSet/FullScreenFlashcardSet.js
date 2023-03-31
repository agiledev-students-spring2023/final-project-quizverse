import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import { useState, useEffect, useMemo } from 'react';
import styles from './FullScreenFlashcardSet.module.css';
import Button from '@mui/material/Button';

function FullScreenFlashcardSet() {
  //this one needs to pull flashcard data
  const theme = createTheme();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const cards = useMemo(() => [], []);
  const flashCardInfos = [
    {
      title: 'Abyss',
      description:
        'The great depths of the oceans, usually considered to be depths of 2000 to 6000 m, a region of low temperatures, high pressure and an absence of sunlight.'
    },
    {
      title: 'Adaptation',
      description:
        'A process by which species evolve, and by which individuals adapt, their growth and/or behaviour to better survive and grow in a particular environment.'
    },
    {
      title: 'Bedform',
      description:
        'Sedimentary features of the seabed oriented transverse to flow direction; ripples, dunes and sand waves'
    }
  ];

  useEffect(() => {
    setName('Marine Biology');
    setDescription('Covers the main definitions for the upcoming exam');
    for (let i = 0; i < 3; i++) {
      cards.push(flashCardInfos[i]);
    } // eslint-disable-next-line
  }, [cards]);

  const shareSet = () => {
    const setURL = window.location.href;
    navigator.clipboard.writeText(setURL).then(() => {
      alert(`Link to flashcard set "${name}" has copied to clipboard!`);
    });
  };

  const displayCards = cards.map((card) => {
    return (
      <div>
        <Card className={styles.card}>
          <h2 className={styles.cardTitles}>{card.title}</h2>
          <div className={styles.cardDescription}>{card.description}</div>
        </Card>
      </div>
    );
  });

  return (
    <ThemeProvider theme={theme}>
      <h1 className={styles.setTitle}>{name}</h1>
      <p className={styles.setDescription}>{description}</p>
      <Button className={styles.shareSetButton} onClick={shareSet}>
        Share
      </Button>
      <div className={styles.cardsContainer}>{displayCards}</div>
    </ThemeProvider>
  );
}

export default FullScreenFlashcardSet;
