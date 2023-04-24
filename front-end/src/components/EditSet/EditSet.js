import { TextField, FormControl, Button, Container } from '@mui/material';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './EditSet.module.css';
import EditCard from '../CreateSet/EditCard';
import axios from 'axios';
import toast from 'react-hot-toast';

const EditSet = (props) => {
  const navigate = useNavigate();
  let token = 'Zappy!';
  let parsed = "";
  const [user, setUser] = useState('');
  let username = "";
  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
    } catch {
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'EditSet' } });
    }
  });
  const location = useLocation();
  const id = location.pathname.substring(location.pathname.lastIndexOf('/') + 1);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editted, setEditted] = useState(false);
  const [cards, setCards] = useState([
    {
      term: '',
      definiion: ''
    }
  ]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/flashcard-set/${id}`, {
        headers: { 'jwt-token': token, username: username } // pass the token, if any, to the server
      })
      .then((response) => {
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setCards(data.cards);
      });
  }, []);

  function handleChange(evt) {
    setEditted(true);
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
  }

  function handleDelete(index) {
    setCards(cards.slice(0, index).concat(cards.slice(index + 1)));
  }

  function addNew() {
    setCards(cards.concat({ term: '', definition: '' }));
  }

  function handleSubmit(evt) {
    setEditted(false);
    const info = {
      title,
      description,
      cards
    };

    toast.promise(
      axios({
        method: 'POST',
        data: {
          info
        },
        withCredentials: true,
        url: 'http://localhost:3001/create-set'
      }),
      {
        id: 'save-set'
      },
      {
        loading: 'Saving...',
        success: 'Your set has been saved!',
        error: 'Something went wrong saving your set.'
      }
    );
  }

  const cardElements = cards.map((info, i) => {
    return (
      <>
        <EditCard
          handleChange={handleChange}
          handleDelete={handleDelete}
          index={i}
          term={info.term}
          def={info.definition}></EditCard>
      </>
    );
  });

  return (
    <div className={styles.SetContainer}>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
          overflowY: 'scroll'
        }}>
        <div className={styles['set-controls']}>
          <Button
            startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
            onClick={() => navigate(`/view/${id}`)}>
            Back to set
          </Button>
          <Button onClick={handleSubmit} disabled={!editted} variant="outlined">
            Save
          </Button>
        </div>
        <FormControl sx={{ m: 1, width: '86vw' }} variant="outlined">
          <TextField
            margin="dense"
            id="filled-basic"
            label="Subject, chapter, unit, etc"
            variant="filled"
            size="small"
            value={title}
            helperText="TITLE"
            onChange={(evt) => {
              setEditted(true);
              setTitle(evt.target.value);
            }}
          />
          <TextField
            id="filled-basic"
            label="Enter a description"
            helperText="DESCRIPTION"
            variant="filled"
            multiline
            rows={3}
            value={description}
            onChange={(evt) => {
              setEditted(true);
              setDescription(evt.target.value);
            }}
          />
        </FormControl>

        {cardElements}

        <div className={styles['form-actions']}>
          <Button
            variant="outlined"
            onClick={addNew}
            startIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
            Add Card
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default EditSet;
