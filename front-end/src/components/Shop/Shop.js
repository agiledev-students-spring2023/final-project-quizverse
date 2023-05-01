import React, {useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
//import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import toast from 'react-hot-toast';

export default function Shop() {
  const navigate = useNavigate();
  let token = 'Zappy!';
  let parsed = '';
  const [user, setUser] = useState('');
  const [data, setData] = useState([]); // eslint-disable-next-line
  const [streak, setStreak] = useState(0); // eslint-disable-next-line
  const [coins, setCoins] = useState(0);
  let username = "";
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
    } catch {
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'Shop' } });
    }
    
    
  });
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_APIURL}/home`, {
        headers: { 'jwt-token': token, username: username } // pass the token, if any, to the server
      })
      .then((response) => {
        // extract the data from the server response
        if (
          response.data === null ||
          response.data.streak == null ||
          response.data.coins == null ||
          response.data.username == null
        ) {
          navigate('/', { state: { redirectedFrom: 'Shop' } });
        }

        setData(response.data);
        setStreak(response.data.streak);
        setCoins(response.data.coins);
        setUser(response.data.username);
      })
      .catch((err) => {
        console.log(err);
        console.log(err.status);
        navigate('/', { state: { redirectedFrom: 'Shop' } });
      });
  }, []);
  function linkItems() {
    navigate('/items');
  }
  function linkStudy() {
    navigate('/daily-quiz');
  }
  function purchase(itemNum) {
    axios({
      method: 'POST',
      withCredentials: true,
      headers: { 'jwt-token': token, username: parsed.username, item: itemNum },
      url: `${process.env.REACT_APP_APIURL}/shop`
    })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          toast.success(`Item purchased!`, {
            id: 'purchase-success'
          });
        }
        if (response.status === 201) {
          toast.error('You already own this item.', {
            id: 'already-own'
          });
        }
        if (response.status === 202) {
          toast.error('You do not have enough coins to buy this item.', {
            id: 'not-enough-coins'
          });
        }
      })
      .catch((err) => {
        console.log('Purchase fail!');
        console.log(err);
        toast.error('Purchase fail!');
      });
  }
  return (
    <ThemeProvider theme={useTheme()}>
      <CssBaseline />
      <main>
        <div className="shop-background">
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
                Item Shop
              </Typography>
              <Typography variant="h5" align="center" color="text.secondary" paragraph>
                Redeem your coins here! Earn coins by studying everyday.You have {coins} coins.
              </Typography>
              <Stack sx={{ pt: 4 }} direction="row" spacing={2} justifyContent="center">
                <Button variant="contained" onClick={linkStudy}>
                  Study to Earn Coins
                </Button>
                <Button variant="outlined" onClick={linkItems}>
                  View my Items
                </Button>
              </Stack>
            </Container>
          </Box>
          <Container sx={{ py: 3 }} maxWidth="md">
            {/* End hero unit */}
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '20%'
                    }}
                    src={`${process.env.REACT_APP_APIURL}/static/images/QuizVerseLogo.png`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Coins x2
                    </Typography>
                    <Typography>Double your coins when studying. Cost: 50 coins.</Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => purchase(1)}>
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{
                      // 16:9
                      pt: '20%'
                    }}
                    src={`${process.env.REACT_APP_APIURL}/static/images/QuizVerseLogo.png`}
                    alt="random"
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h5" component="h2">
                      Streak Freeze
                    </Typography>
                    <Typography>
                      Protect your streak for 1 day in the future. Cost: 150 coins.
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={() => purchase(2)}>
                      Buy
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </div>
      </main>
      {/* Footer */}
      {/* End footer */}
    </ThemeProvider>
  );
}
