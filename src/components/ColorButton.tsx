import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const ColorButton = styled(Button)(() => ({
   width: '270px',
   height: '40px',
   background: 'none',
   border: '2px solid #265AAA',
   color: '#fff',
   backgroundColor: '#265AAA',
   fontWeight: 'bold',
   '&:hover': {
      color: '#265AAA',
      backgroundColor: '#fff',
   },
}));
