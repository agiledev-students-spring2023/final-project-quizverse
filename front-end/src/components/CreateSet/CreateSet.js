import { TextField, FormControl, Button, Container } from '@mui/material';
import { useState, useEffect, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import styles from './CreateSet.module.css';
import EditCard from './EditCard';
import axios from 'axios';
import toast from 'react-hot-toast';

const CreateSet = (props) => {
  const navigate = useNavigate();
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
      navigate('/', { state: { redirectedFrom: 'CreateSet' } });
    }
  });
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([
    {
      term: '',
      definition: ''
    }
  ]);
  function handleChange(evt) {
    const value = evt.target.value;
    const id = evt.target.name;
    const field = id.match(/[a-z]+/)[0];
    const index = parseInt(id.match(/\d+/)[0]);
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

  const shouldCreateBeDisabled = useMemo(() => {
    if (title === '' || description === '') {
      return true;
    }

    return cards.some((card) => card.term === '' || card.definition === '');
  }, [cards]);

  function handleSubmit(evt) {
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
        headers: { 'jwt-token': token, username: parsed.username },
        url: `${process.env.REACT_APP_APIURL}/create-set`
      }),
      {
        loading: 'Saving your set...',
        success: 'Your set has been saved!',
        error: 'Something went wrong. Please try again.'
      },
      {
        id: 'create-set'
      }
    );
    navigate('/flashcards');
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
        <Button
          className={styles.backBtn}
          startIcon={<FontAwesomeIcon icon={faArrowLeft} />}
          onClick={() => navigate(`/home`)}>
          Back to home
        </Button>
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
          <Button onClick={handleSubmit} disabled={shouldCreateBeDisabled} variant="outlined">
            Create Set
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateSet;
