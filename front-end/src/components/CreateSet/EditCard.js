import { Stack, Box } from '@mui/system';
import { TextField } from '@mui/material';

const EditCard = ({ handleChange, index, term, def }) => {
  return (
    <Box
      sx={{
        width: '80vw',
        height: 'auto',
        margin: '8px',
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
            value={term}
            name={'term' + index}
          />
          <TextField
            id="filled-basic"
            variant="standard"
            size="small"
            helperText="DEFINITION"
            value={def}
            name={'definition' + index}
          />
        </Stack>
      </form>
    </Box>
  );
};

export default EditCard;
