import { Card, Typography } from '@mui/material';

const ViewCard = ({ index, term, def }) => {
  return (
    <Card
      sx={{
        width: '90vw',
        height: 'auto',
        margin: '6px',
        borderRadius: 1,
        backgroundColor: '#9AABBD',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'column'
      }}>
      <Typography sx={{ margin: '10px' }} variant="h6" name={'term' + index} component={'span'}>
        {term}
      </Typography>
      <Typography
        sx={{ 'margin-left': '10px', 'margin-bottom': '10px' }}
        variant="h7"
        name={'definition' + index}
        component={'span'}>
        {def}
      </Typography>
    </Card>
  );
};

export default ViewCard;
