import { TextField, FormControl, Box, Stack, IconButton, Button, Container } from '@mui/material';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

const CreateSet = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <Container
        style={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'auto',
          overflowY: 'scroll'
        }}>
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

        <Box
          sx={{
            width: '80vw',
            height: 'auto',
            margin: 'auto',
            borderRadius: 1,
            backgroundColor: 'rgba(0, 7, 111, 0.4)',
            padding: '10px'
          }}>
          <Stack spacing={1}>
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="TERM"
              onChange={(evt) => {}}
            />
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="DEFINITION"
              onChange={(evt) => {}}
            />
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="TERM"
              onChange={(evt) => {}}
            />
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="DEFINITION"
              onChange={(evt) => {}}
            />
          </Stack>

          <Stack spacing={1}>
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="TERM"
              onChange={(evt) => {}}
            />
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="DEFINITION"
              onChange={(evt) => {}}
            />
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="TERM"
              onChange={(evt) => {}}
            />
            <TextField
              id="filled-basic"
              variant="standard"
              size="small"
              helperText="DEFINITION"
              onChange={(evt) => {}}
            />
          </Stack>
        </Box>
        <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
          Add
        </Button>
        <Button variant="outlined">Create</Button>
      </Container>
    </div>
  );
};

export default CreateSet;
