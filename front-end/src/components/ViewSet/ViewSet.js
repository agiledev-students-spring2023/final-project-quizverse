import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
//import Card from '@mui/material/Card';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './ViewSet.module.css';
import Button from '@mui/material/Button';
import ViewCard from './ViewCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCirclePlus, faPen } from '@fortawesome/free-solid-svg-icons';
import toast from 'react-hot-toast';

function FullScreenFlashcardSet() {
  const navigate = useNavigate();
  let token = 'Zappy!';
  let parsed = '';
  let username = '';
  const [logged_in, setLoggedIn] = useState(false);
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
      console.log('logged in');
      setLoggedIn(true);
    } catch {
      console.log('Not logged in.');
    }
  });
  //this one needs to pull flashcard data
  const theme = createTheme();
  const location = useLocation();
  const [id, setId] = useState(location.pathname.substring(location.pathname.lastIndexOf('/') + 1));
  const [user, setUser] = useState(location.pathname.split('/')[2]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_APIURL}/flashcard-set/${user}/${id}`).then((response) => {
      const data = response.data;
      setTitle(data.title);
      setDescription(data.description);
      setCards(data.flashcards);
    });
    console.log(id);
  }, []);

  function handleChange(evt) {
    const value = evt.target.value;
    const id = evt.target.name;
    const field = id.slice(0, -1);
    const index = id.slice(id.length - 1);
    const newCard = cards[index];
    newCard[field] = value;
    setCards(
      cards
        .slice(0, index)
        .concat(newCard)
        .concat(cards.slice(index + 1))
    );
    console.log(cards);
  }

  function handleDelete(index) {
    setCards(cards.slice(0, index).concat(cards.slice(index + 1)));
  }

  function addNew() {
    setCards(cards.concat({ term: '', definition: '' }));
  }

  function handleSubmit(evt) {
    const info = {
      title: { title },
      description: { description },
      cards: { cards }
    };
    toast.promise(
      axios.post(`${process.env.REACT_APP_APIURL}/edit-set?id=${id}`, info),
      {
        loading: 'Saving changes...',
        success: () => `Saved changes to set ${title}`,
        error: (err) => `Error saving changes. Please try again.`
      },
      {
        id: 'save-changes'
      }
    );
  }

  const cardElements = cards.map((info, i) => {
    return (
      <>
        <ViewCard
          handleChange={handleChange}
          handleDelete={handleDelete}
          index={i}
          term={info.term}
          def={info.definition}></ViewCard>
      </>
    );
  });

  const shareSet = () => {
    const setURL = window.location.href;
    toast.promise(
      navigator.clipboard.writeText(setURL),
      {
        loading: 'Copying link to clipboard...',
        success: `Copied link for "${title}".`,
        error: (err) => `Error copying link to clipboard. Please try again.`
      },
      {
        id: 'copy-link'
      }
    );
  };

  const deleteSet = () => {
    let input = prompt(
      "THIS WILL DELETE YOUR SET PERMANENTLY. TYPE 'ok' in this box to confirm deletion of your set."
    );
    if (input === 'ok') {
      toast.promise(
        axios.get(`${process.env.REACT_APP_APIURL}/delete-set/${id}`, {
          headers: { 'jwt-token': token, username: username } // pass the token, if any, to the server
        }),
        {
          loading: 'Deleting set...',
          success: () => `Deleted set ${title}`,
          error: (err) => `Error deleting. Please try again.`
        },
        {
          id: 'delete-set'
        }
      );
      navigate('/flashcards');
    } else {
      toast.error('Incorrect input!');
      console.log('Incorrect input!');
    }
  };

  if (logged_in) {
    return (
      <ThemeProvider theme={theme}>
        <div className={styles['set-buttons']}>
          <Button
            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate('/flashcards')}>
            My Sets
          </Button>
          <Button
            startIcon={<FontAwesomeIcon icon={faPen} />}
            onClick={() => navigate(`/edit/${id}`)}></Button>
        </div>
        <h1 className={styles.setTitle}>{title}</h1>
        <p className={styles.setDescription}>{description}</p>
        <Button className={styles.shareSetButton} onClick={shareSet}>
          Share
        </Button>
        <Button className={styles.deleteSetButton} onClick={deleteSet}>
          Delete Set
        </Button>
        <div className={styles.cardsContainer}>{cardElements}</div>
      </ThemeProvider>
    );
  } else {
    return (
      <ThemeProvider theme={theme}>
        <p>Please log in to edit this set.</p>
        <h1 className={styles.setTitle}>{title}</h1>
        <p className={styles.setDescription}>{description}</p>
        <Button className={styles.shareSetButton} onClick={shareSet}>
          Share
        </Button>
        <div className={styles.cardsContainer}>{cardElements}</div>
      </ThemeProvider>
    );
  }
}

export default FullScreenFlashcardSet;
