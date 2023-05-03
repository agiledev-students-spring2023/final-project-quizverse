import React from 'react';
//import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import styles from './FlashcardSet.module.css';
import { useNavigate } from 'react-router-dom';

function FlashcardSet(props) {
  const theme = createTheme();
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Card
        className={styles.flashcardSetCard}
        sx={{ width: 1 }}
        onClick={() => {
          navigate(`/view/${props.username}/${props.id}`);
        }}>
        <CardContent>
          <Typography className={styles.flashcardSetTitle} variant="h5" component={'span'}>
            {props.title}
          </Typography>
          <Typography className={styles.flashcardSetCardCount} color="text.secondary">
            {props.numCards} cards
          </Typography>
          <Typography className={styles.flashcardSetDescription} variant="body2">
            {props.description}
          </Typography>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default FlashcardSet;
