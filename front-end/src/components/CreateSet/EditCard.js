import { Stack, Box } from '@mui/system';
import { TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './CreateSet.module.css';

const EditCard = ({ handleChange, handleDelete, index, term, def }) => {
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
      <FontAwesomeIcon
        className={styles['delete-card']}
        icon={faXmark}
        onClick={() => handleDelete(index)}
      />
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
