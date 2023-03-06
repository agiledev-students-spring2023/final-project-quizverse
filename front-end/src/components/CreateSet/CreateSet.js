import { TextField, FormControl, Box, Stack, IconButton, Button, Container } from "@mui/material"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import {faCirclePlus} from '@fortawesome/free-solid-svg-icons'

const CreateSet = (props) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")


  return (
    <Container 
      style={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: 'auto',
        overflow: "hidden",
        overflowY: "scroll",
      }}>
      <FormControl sx={{ m: 1, width: '30ch'}} variant="outlined">
        <TextField 
          margin="dense"
          id="filled-basic" label="Subject, chapter, unit, etc" variant="filled" size="small" value={title} helperText="TITLE" onChange={(evt) => {
            setTitle(evt.target.value)
        }}/>
        <TextField id="filled-basic" label="Enter a description" helperText="DESCRIPTION" variant="filled" multiline rows={3} value={description} onChange={(evt) => {
          setDescription(evt.target.value)
        }}/>
      </FormControl>

      <Box sx={{
        width: "60vw",
        height: "auto",
        margin: "auto",
        borderRadius: 1,
      }}>
        <Stack spacing={1}>
          <TextField id="filled-basic"  variant="standard" size="small"  helperText="TERM" onChange={(evt) => {
                
          }}/>
          <TextField id="filled-basic"  variant="standard" size="small"  helperText="DEFINITION" onChange={(evt) => {
                
          }}/>
          <TextField id="filled-basic"  variant="standard" size="small"  helperText="TERM" onChange={(evt) => {
                
              }}/>
              <TextField id="filled-basic"  variant="standard" size="small"  helperText="DEFINITION" onChange={(evt) => {
                    
              }}/>
        </Stack>
        
      </Box>
      <Button variant="outlined" startIcon={<FontAwesomeIcon icon={faCirclePlus} />}>
        Add
      </Button>
      <Button variant="outlined">Create</Button>
    </Container>
  )
}

export default CreateSet