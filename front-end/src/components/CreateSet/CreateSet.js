import { TextField, FormControl, Box, Stack } from "@mui/material"
import { useState, useEffect } from "react"

const CreateSet = (props) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  // const [terms, setTerms] = useState({}) 
  // use a react state object to track each term-def combo

  useEffect(() => {
    console.log(title)
  }, [title])

  return (
    <div>
      <FormControl sx={{ m: 1, width: '30ch'}} variant="outlined">
        <TextField 
          // InputLabelProps={{
          //   style: {
          //     height,
          //   },
          // }}
          
          margin="dense"
          id="filled-basic" label="Subject, chapter, unit, etc" variant="filled" size="small" value={title} helperText="TITLE" onChange={(evt) => {
            console.log(evt.target.value)
            setTitle(evt.target.value)
        }}/>
        <TextField id="filled-basic" label="Enter a description" helperText="DESCRIPTION" variant="filled" multiline rows={3} value={description} onChange={(evt) => {
          console.log(evt.target.value)
          setDescription(evt.target.value)
        }}/>
      </FormControl>

      <Box sx={{
        width: "60vw",
        height: "auto",
        margin: "auto",
        borderRadius: 1,
        // backgroundColor: '#44008b',
      }}>
    
        <Stack spacing={1}>
          <TextField id="filled-basic"  variant="standard" size="small"  helperText="TERM" onChange={(evt) => {
                console.log(evt.target.value)
                
          }}/>
          <TextField id="filled-basic"  variant="standard" size="small"  helperText="DEFINITION" onChange={(evt) => {
                console.log(evt.target.value)
                
          }}/>
        </Stack>

      </Box>

      
      
    </div>
  )
}

export default CreateSet