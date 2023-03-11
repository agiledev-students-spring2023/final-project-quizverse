import { TextField, FormControl, Box, Stack, IconButton, Button, Container } from "@mui/material"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'
import styles from './CreateSet.module.css';

const CreateSet = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState([
    {
      term: '',
      definiion: ''
    }
  ]);

  function handleChange(evt) {
    const value = evt.target.value;
    setCards({
      [evt.target.name]: value
    });
    console.log(`Field ${evt.target.name} was changed to ${value}`);
  }

  const cardElements = cards.map(() => {
    return (
      <>
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
        <Box
          sx={{
            width: '80vw',
            height: 'auto',
            margin: 'auto',
            borderRadius: 1,
            backgroundColor: 'rgba(0, 7, 111, 0.4)',
            padding: '10px'
          }}>
          <form onChange={handleChange}>
            <Stack spacing={1}>
              <TextField
                id="filled-basic"
                variant="standard"
                size="small"
                helperText="TERM"
                name="term1"
              />
              <TextField
                sx={{ padding: '5px' }}
                id="filled-basic"
                variant="standard"
                size="small"
                helperText="DEFINITION"
                name="def1"
              />
            </Stack>
          </form>
        </Box>

        <Box
          sx={{
            width: '80vw',
            height: 'auto',
            margin: 'auto',
            borderRadius: 1,
            backgroundColor: 'rgba(0, 7, 111, 0.4)',
            padding: '10px',
            margin: '7px'
          }}>
          <form onChange={handleChange}>
            <Stack spacing={1}>
              <TextField
                id="filled-basic"
                variant="standard"
                size="small"
                helperText="TERM"
                name="term1"
              />
              <TextField
                sx={{ padding: '5px' }}
                id="filled-basic"
                variant="standard"
                size="small"
                helperText="DEFINITION"
                name="def1"
              />
            </Stack>
          </form>
        </Box>

        <Box
          sx={{
            width: '80vw',
            height: 'auto',
            margin: 'auto',
            borderRadius: 1,
            backgroundColor: 'rgba(0, 7, 111, 0.4)',
            padding: '10px'
          }}>
          <form onChange={handleChange}>
            <Stack spacing={1}>
              <TextField
                id="filled-basic"
                variant="standard"
                size="small"
                helperText="TERM"
                name="term1"
              />
              <TextField
                sx={{ padding: '5px' }}
                id="filled-basic"
                variant="standard"
                size="small"
                helperText="DEFINITION"
                name="def1"
              />
            </Stack>
          </form>
        </Box>
        <div className={styles['form-actions']}>
          <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
            Add Card
          </Button>
          <Button variant="outlined">Create Set</Button>
        </div>
      </Container>
    </div>
  );
};

export default CreateSet