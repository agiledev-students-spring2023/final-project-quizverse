import React, { useState, useEffect,useCallback } from 'react';
//import Search from '../Search/Search';
import FlashcardSet from './FlashcardSet/FlashcardSet';
import styles from './FlashcardSets.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const theme = createTheme()
function FlashcardSets() {
  
  const navigate = useNavigate();
  let token = 'Zappy!';
  let parsed = "";
  const [user, setUser] = useState('');
  const [data, setData] = useState([
    {
      title: '',
      description: '',
      numCards: 0
    }
  ]);
  const [filteredData, setFilteredData] = useState([
    {
      title: '',
      description: '',
      numCards: 0
    }
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  let username = "";
  const onSearch = (() => {
    console.log("visited onsearch")
    setFilteredData(data.filter((item) => {
      return item.title.toLowerCase().includes(searchTerm.toLowerCase());
     }));
     console.log(filteredData)
  });
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
  
  useEffect(() => {
    // fetch some mock sets
    // make this a backend request!
    //set name and description
    
    axios('http://localhost:3001/flashcard-sets', {
      headers: { 'jwt-token': token, username: username} // pass the token, if any, to the server
    })
      .then((response) => {
        // extract the data from the server response
        setData(response.data);
        onSearch();
      })
      .catch((err) => {
        console.error(err); // the server returned an error... probably too many requests... until we pay!
      });
  }, []);
  return (
    <>
      <div className={styles.searchContainer}>
      <ThemeProvider theme={theme}>
        <Grid className={styles.gridContainer} container>
          <Grid item xs={1} />
          <Grid item xs={8}>
            <TextField
              id="outlined-search"
              label="Enter your search term"
              type="search"
              variant="outlined"
              className={styles.searchTextField}
              onChange={(e) => setSearchTerm(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              variant="contained"
              color="primary"
              onClick={onSearch}
              className={styles.searchButton}
              fullWidth>
              Search
            </Button>
          </Grid>
        </Grid>
      </ThemeProvider>
      </div>
      <div className={styles.flashcardSetContainer}>
        {filteredData.map((set) => (
          <FlashcardSet
            id={Math.floor(1000 + Math.random() * 9000)} // generate random set id that will be replaced by db id later
            title={set.title}
            description={set.description}
            numCards={set.numCards}
          />
        ))}
      </div>
    </>
  );
}

export default FlashcardSets;
