import styles from './Flashcard.module.css'
import React from "react";
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function Flashcard() {
    return (
        <Card sx={{ maxWidth: 500 }}>
        <CardContent>
          <Typography variant='h3'  gutterBottom>
            Abyss
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Marine Biology Terms
          </Typography>
          <Typography variant="body1">
            The great depths of the oceans, usually considered to be depths of 2000 to 6000 m, a region of low temperatures, high pressure, and an absence of sunlight.
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Flip Card</Button>
        </CardActions>
        <CardActions>
          <Button size="small">Previous Card</Button>
        </CardActions>
        <CardActions>
          <Button size="small">Next Card</Button>
        </CardActions>
        </Card>
    );
  }
  
  export default Flashcard;

