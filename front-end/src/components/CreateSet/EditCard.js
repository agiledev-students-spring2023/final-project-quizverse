const EditCard = ({ handleChange, name }) => {
  return (
    <form onChange={handleChange}>
      <Stack spacing={1}>
        <TextField
          id="filled-basic"
          variant="standard"
          size="small"
          helperText="TERM"
          name={'term' + name}
        />
        <TextField
          id="filled-basic"
          variant="standard"
          size="small"
          helperText="DEFINITION"
          name={'def' + name}
        />
      </Stack>
    </form>
  );
};

export default EditCard;
