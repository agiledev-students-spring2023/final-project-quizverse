import React, { useState, useEffect } from 'react';
//import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
//import CameraIcon from '@mui/icons-material/PhotoCamera';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
//import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
//import Link from '@mui/material/Link';
//import { Link } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const theme = createTheme();

function Items() {
  let token = 'Zappy!';
  let parsed = "";
  const [user, setUser] = useState('');
  let username = "";
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'))
      token = parsed.token;
      username = parsed.username
    } catch {
      alert("Please log in.")
      console.log('Not logged in.');
      navigate('/');
    }
  });
  const navigate = useNavigate();
  const [data, setData] = useState([
    {
      term: '',
      definition: ''
    }
  ]);
  // eslint-disable-next-line
  const [term, setTerm] = useState(''); // eslint-disable-next-line
  const [definition, setDefinition] = useState(''); // eslint-disable-next-line
  const [arrLength, setArrLength] = useState(0); // eslint-disable-next-line
  const [arrIndex, setArrIndex] = useState(0);
  useEffect(() => {
    // fetch some items
    axios
      .get('http://localhost:3001/your-items', {
        headers: { 'jwt-token': token, username: username} // pass the token, if any, to the server
      })
      .then((response) => {
        // extract the data from the server response
        console.log(response.data)
        setData(response.data);
        setArrLength(response.data.length);
      })
      .catch((err) => {
        console.error(err); // the server returned an error... probably too many requests... until we pay!
        navigate('/'); //kick back to landing
      });
  }, []);
  return (
    // the following side-effect will be called once upon initial render
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6
          }}>
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom>
              Your Items!
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              These are the items that you currently own. You've earned them!
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth="md">
          {/* End hero unit */}
          <Grid container spacing={4}>
            {data.map((card) => (
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '20%'
                    }}
                    src="http://localhost:3001/static/images/QuizVerseLogo.png"
                    alt="QuizVerse Logo"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.item}
                    </Typography>
                    <Typography>{card.desc}</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small">Use</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Items;
