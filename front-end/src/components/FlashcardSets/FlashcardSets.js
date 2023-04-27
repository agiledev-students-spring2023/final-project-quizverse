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
  let username = '';

  const [sets, setSets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searched, setSearched] = useState(true);
  const [filtered, setFiltered] = useState([]);

  const onSearch = () => {
    setFiltered(
      sets.filter((set) => {
        return set.title.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
    setSearched(true);
    console.log(filtered);
  };

  // jwt
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
      username = parsed.username;
    } catch {
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'FlashcardSets' } });
    }
  });

  useEffect(() => {
    axios('http://localhost:3001/flashcard-sets', {
      headers: { 'jwt-token': token, username: username } // pass the token, if any, to the server
    })
      .then((response) => {
        // extract the data from the server response
        console.log(response);
        setSets(response.data);
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
                value={searchTerm}
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
              <Button
                onClick={() => {
                  setSearchTerm('');
                  setFiltered([]);
                  setSearched(false);
                }}
                disabled={!searched}
                variant="outlined">
                Reset
              </Button>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
      <div className={styles.flashcardSetContainer}>
        {filtered.length > 0
          ? filtered.map((set) => (
              <FlashcardSet
                id={set._id}
                title={set.title}
                description={set.description}
                numCards={set.flashcards.length}
                username={set.createdBy}
              />
            ))
          : sets.map((set) => (
              <FlashcardSet
                id={set._id}
                title={set.title}
                description={set.description}
                numCards={set.flashcards.length}
                username={set.createdBy}
              />
            ))}
      </div>
    </>
  );
}

export default FlashcardSets;
