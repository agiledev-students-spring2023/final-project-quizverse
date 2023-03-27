import * as React from 'react';
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
import logo from './QuizVerseLogo.png';
import { useState, useEffect } from "react"
import axios from "axios"


const theme = createTheme();

function Items() {
  const [data, setData] = useState([{
    "term":"",
    "definition":""
  }])
  // eslint-disable-next-line
  const [term, setTerm] = useState(''); // eslint-disable-next-line
  const [definition, setDefinition] = useState('') // eslint-disable-next-line
  const [arrLength, setArrLength] = useState(0) // eslint-disable-next-line
  const [arrIndex, setArrIndex] = useState(0)
  useEffect(() => {
    // fetch some mock flashcards
    console.log("fetching 10 random flashcards...")
    axios("https://my.api.mockaroo.com/flashcards.json?key=6b3bc3e0")
      .then(response => {
        // extract the data from the server response
        setData(response.data)
        setTerm(response.data[0].term)
        setDefinition(response.data[0].definition)
        setArrLength(response.data.length)
      })
      .catch(err => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`)
        console.error(err) // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data
        const backupData = [{"term":"encryption","definition":"adipiscing elit proin risus praesent lectus vestibulum quam sapien varius ut blandit"},{"term":"instruction set","definition":"convallis nunc proin at turpis a pede posuere nonummy integer non velit donec diam"},{"term":"contingency","definition":"elementum pellentesque quisque porta volutpat erat quisque erat eros viverra eget congue"},{"term":"Sharable","definition":"vivamus tortor duis mattis egestas metus aenean fermentum donec ut mauris eget massa"},{"term":"User-friendly","definition":"praesent blandit nam nulla integer pede justo lacinia eget tincidunt eget tempus"},{"term":"executive","definition":"sed tristique in tempus sit amet sem fusce consequat nulla nisl nunc nisl"},{"term":"model","definition":"elit proin interdum mauris non ligula pellentesque ultrices phasellus id"},{"term":"Ergonomic","definition":"massa quis augue luctus tincidunt nulla mollis molestie lorem quisque ut erat curabitur gravida nisi"},{"term":"intangible","definition":"porttitor id consequat in consequat ut nulla sed accumsan felis ut at dolor quis"},{"term":"challenge","definition":"luctus rutrum nulla tellus in sagittis dui vel nisl duis ac"}]

        setData(backupData)
        setTerm(backupData[0].term)
        setDefinition(backupData[0].definition)
        setArrLength(backupData.length)
      })
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
                  image={logo}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.term}
                  </Typography>
                  <Typography>{card.definition} Cost: 50 coins.</Typography>
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
