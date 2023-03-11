import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './FlashcardSet.module.css';

function FlashcardSet() {
  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Card className={styles.flashcardSetCard}>
        <CardContent>
          <Typography
            className={styles.flashcardSetTypeTypography}
            color="text.secondary"
            gutterBottom>
            Flashcard Set
          </Typography>
          <Typography className={styles.flashcardSetTitle} variant="h5" component="div">
            Marine Biology
          </Typography>
          <Typography className={styles.flashcardSetCardCount} color="text.secondary">
            3 cards
          </Typography>
          <Typography className={styles.flashcardSetDescription} variant="body2">
            These flashcards should cover everything the professor talked about since the last exam
            up until this newest unit
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">View Set</Button>
        </CardActions>
      </Card>
    </ThemeProvider>
  );
}

export default FlashcardSet;
