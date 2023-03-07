//eslint-disable-next-line
import styles from './DailyQuiz.module.css'
import React from "react";
import { useTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

function DailyQuiz() {

    return (
        <ThemeProvider theme={useTheme()}>
          <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '70vh'}}>
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
    </div>
            <Grid className={styles.gridContainer} container>
                <Grid item xs={1} />
                <Grid item xs={8}>
                    <TextField
                        id="outlined-search"
                        label="Enter your answer here"
                        type="search"
                        variant="outlined"
                        className={styles.searchTextField}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={2}>
                    <Button variant="contained" 
                        color="primary" 
                        className={styles.searchButton}
                        fullWidth
                    >
                        Enter
                    </Button>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default DailyQuiz