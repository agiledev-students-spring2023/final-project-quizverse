import styles from './Flashcard.module.css'
import React from "react";
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Flashcard(props) {
    return (
        <div>
        <Card  variant = "outlined" class = "card" >
        <CardContent>
          <Typography variant='h3'  gutterBottom>
          {props.term}
          </Typography>
          <Typography variant="body1">
            {props.definition}
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
    );
  }
  
  export default Flashcard;

