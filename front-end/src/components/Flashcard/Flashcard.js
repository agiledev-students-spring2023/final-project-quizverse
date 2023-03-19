import styles from './Flashcard.module.css'
import React from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme, ThemeProvider } from '@mui/material/styles';

/*
* This is the Flashcard class.
*/
/*
* This is not a screen, but is used in other screens.
*/
/*
* The following props are used in the Flashcards class:
*/
/*
* displayTerm
*/
/*
* displayTerm should be a boolean (true or false) to show whether the term is displayed
*/
/*
* term
*/
/*
* term should contain the term that we want on the flashcard
*/
/*
* displayDefinition should be a boolean (true or false) to show whether the definition is displayed
*/
/*
* definition should contain the word's definition
*/
/*
* handlePrev should be a function for the "Previous Card" button
*/
/*
* handleNext should be a function for the "Next Card" button
*/

function Flashcard(props) {
    return (
      <ThemeProvider theme={useTheme()}>
        <div>
        <Card class = {styles.default_card} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent>
            <Typography variant='h3'  gutterBottom>
            {props.displayTerm===true?props.term:null}
            </Typography>
            <Typography variant="body1">
            {props.displayDefinition===true?props.definition:null}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick = {props.handlePrev}>Previous Card</Button>
        </CardActions>
        <CardActions>
          <Button size="small" onClick = {props.handleNext}>Next Card</Button>
        </CardActions>
        </Card>
        </div>
        </ThemeProvider>
    );
  }
  
  export default Flashcard;

