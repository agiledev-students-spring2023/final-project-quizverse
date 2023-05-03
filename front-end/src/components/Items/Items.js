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
import toast from 'react-hot-toast';

const theme = createTheme();

function Items() {
  let token = 'Zappy!';
  let parsed = '';
  const [user, setUser] = useState('');
  let username = '';
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
    } catch {
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'Items' } });
    }
  });
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [term, setTerm] = useState(''); // eslint-disable-next-line
  const [definition, setDefinition] = useState(''); // eslint-disable-next-line
  const [arrLength, setArrLength] = useState(0); // eslint-disable-next-line
  const [arrIndex, setArrIndex] = useState(0);
  const [doubleCoinsDesc, setDoubleCoinsDesc] = useState('');
  const [streakFreezeDesc, setStreakFreezeDesc] = useState('');
  function itemUse(item_id) {
    axios({
      method: 'POST',
      withCredentials: true,
      headers: { 'jwt-token': token, username: parsed.username, item_id: item_id },
      url: `${process.env.REACT_APP_APIURL}/use-items`
    })
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          toast.success(`Item used!`, {
            id: 'item-use-success'
          });
        }
        if (response.status == 201) {
          toast.error(`Item not owned!`, {
            id: 'item-not-owned'
          });
        }
      })
      .catch((err) => {
        console.log('Item use fail!');
        console.log(err);
        toast.error('Item use fail!', {
          id: 'item-use-fail'
        });
      });
  }
  useEffect(() => {
    // fetch some items
    axios
      .get(`${process.env.REACT_APP_APIURL}/your-items`, {
        headers: { 'jwt-token': token, username: username } // pass the token, if any, to the server
      })
      .then((res) => {
        // extract the data from the server response
        if (res.status == 200) {
          //console.log(`res: ${res}`)
          console.log(res.data.inventory);
          setData(res.data.inventory);
          console.log(`data: ${data}`);
          setArrLength(res.data.inventory.length);
          //console.log('Inventory retrieved!');
          let temp = res.data.inventory;
          temp.forEach((val, i, arr) => {
            if (val.number_owned == 0) {
              arr[i].item_desc = 'You do not own this item.';
              if (i == 0) {
                setDoubleCoinsDesc(arr[i].item_desc);
              } else {
                setStreakFreezeDesc(arr[i].item_desc);
              }
            } else {
              if (val.in_use) {
                arr[i].item_desc = 'This item is in use.';
                if (i == 0) {
                  setDoubleCoinsDesc(arr[i].item_desc);
                } else {
                  setStreakFreezeDesc(arr[i].item_desc);
                }
              } else {
                arr[i].item_desc += `You own ${val.number_owned} of these.`;
                if (i == 0) {
                  setDoubleCoinsDesc(arr[i].item_desc);
                } else {
                  setStreakFreezeDesc(arr[i].item_desc);
                }
              }
            }
          });
          console.log(`temp: ${temp}`);
          setData(temp);

          //console.log(`data: ${data}`)
          // console.log(res);
          // } else if (res.status == 201) {
          //   console.log('Item use fail!');
          //   toast.fail(`You don\'t actually own this item!`, {
          //     id: 'item-use-fail-no-own'
          //   });
          // }
        } else {
          setArrLength(0);
          console.log('Nothing found in response');
          console.log(res);
        }
      })
      .catch((err) => {
        console.error(err); // the server returned an error... probably too many requests... until we pay!
        navigate('/'); //kick back to landing
      });
  }, []);

  // console.log(arrLength);
  // console.log(data);
  let x2CoinsCard =
    arrLength == 0 ? (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            You have no items.
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: '20%'
            }}
            src={`${process.env.REACT_APP_APIURL}/static/images/QuizVerseLogo.png`}
            alt="QuizVerse Logo"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              Double Coins
            </Typography>
            <Typography>{doubleCoinsDesc}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => itemUse(1)}>
              Use
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );

  let streakFreezeCard =
    arrLength == 0 ? (
      <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h5" component="h2">
            You have no items.
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <Grid item xs={12} sm={6} md={4}>
        <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <CardMedia
            component="img"
            sx={{
              // 16:9
              pt: '20%'
            }}
            src={`${process.env.REACT_APP_APIURL}/static/images/QuizVerseLogo.png`}
            alt="QuizVerse Logo"
          />
          <CardContent sx={{ flexGrow: 1 }}>
            <Typography gutterBottom variant="h5" component="h2">
              Streak Freeze
            </Typography>
            <Typography>{streakFreezeDesc}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={() => itemUse(2)}>
              Use
            </Button>
          </CardActions>
        </Card>
      </Grid>
    );

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
            {x2CoinsCard}
            {streakFreezeCard}
          </Grid>
        </Container>
      </main>
    </ThemeProvider>
  );
}

export default Items;
