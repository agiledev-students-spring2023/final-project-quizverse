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
  let parsed = '';
  let username = '';

  useEffect(() => {
    try {
      parsed = JSON.parse(localStorage.getItem('info'));
      token = parsed.token;
      username = parsed.username;
    } catch {
      alert('Please log in.');
      console.log('Not logged in.');
      navigate('/', { state: { redirectedFrom: 'EditSet' } });
    }
  });

  const location = useLocation();
  const [id, setId] = useState(location.pathname.substring(location.pathname.lastIndexOf('/') + 1));
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [editted, setEditted] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:3001/flashcard-set/${username}/${id}`).then((response) => {
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
    console.log(id);
    const field = id.match(/[a-z]+/)[0];
    const index = id.match(/\d+/)[0];
    console.log(`field is ${field}, index is ${index}, value is ${value}`);
    const newCard = cards[index];
    newCard[field] = value;
    setCards(
      cards
        .slice(0, index)
        .concat(newCard)
        .concat(cards.slice(index + 1))
    );
    setEditted(true);
  }

  function handleDelete(index) {
    setEditted(true);
    setCards(cards.slice(0, index).concat(cards.slice(index + 1)));
  }

  function addNew() {
    setEditted(true);
    setCards(cards.concat({ term: '', definition: '' }));
  }

  function handleSubmit(evt) {
    setEditted(false);
    const info = {
      title,
      description,
      cards
    };
    toast
      .promise(
        axios({
          method: 'POST',
          headers: { 'jwt-token': token, username: parsed.username },
          data: {
            info
          },
          withCredentials: true,
          url: `http://localhost:3001/edit-set/${id}`
        }),
        {
          id: 'save-set'
        },
        {
          loading: 'Saving...',
          success: 'Your set has been saved!',
          error: 'Something went wrong saving your set.'
        }
      )
      .then((res) => {
        if ((res.status = 200)) {
          navigate(`/view/${username}/${id}`);
        }
      });
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
            onClick={() => navigate(`/view/${username}/${id}`)}>
            Back to set
          </Button>
          <Button onClick={handleSubmit} disabled={!editted} variant="outlined">
            Save
          </Button>
          <Button>
            Hello
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
