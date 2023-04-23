import styles from './Flashcard.module.css'
import React from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useTheme, ThemeProvider } from '@mui/material/styles';

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
          <Button size="small" onClick = {props.handlePrev}>Return to Previous Term</Button>
        </CardActions>
        <CardActions>
          <Button size="small" onClick = {props.handleNext}>Skip this Term</Button>
        </CardActions>
        </Card>
        </div>
        </ThemeProvider>
    );
  }
  
  export default Flashcard;

