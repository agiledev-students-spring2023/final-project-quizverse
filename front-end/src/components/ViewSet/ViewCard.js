import { Card, CardContent, Typography } from '@mui/material';

const ViewCard = ({ index, term, def }) => {
  return (
    <Card
      sx={{
        width: '90vw',
        height: 'auto',
        margin: '6px',
        borderRadius: 1,
        backgroundColor: 'rgba(0, 7, 111, 0.4)',
        textAlign: 'left'
      }}>
      <CardContent>
        <Typography name={'term' + index}>{term}</Typography>
        <Typography name={'definition' + index}> {def}</Typography>
      </CardContent>
    </Card>
  );
};

export default ViewCard;
