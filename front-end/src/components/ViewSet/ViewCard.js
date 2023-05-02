import { Card, CardContent, Typography } from '@mui/material';

const ViewCard = ({ index, term, def }) => {
  return (
    <Card
      sx={{
        width: '90vw',
        height: 'auto',
        margin: '6px',
        borderRadius: 1,
        backgroundColor: '#9AABBD',
        textAlign: 'left'
      }}>
      <CardContent>
        <Typography variant="h6" name={'term' + index} component={'span'}>
          {term}
        </Typography>
        <Typography variant="body1" name={'definition' + index} component={'span'}>
          {def}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ViewCard;
