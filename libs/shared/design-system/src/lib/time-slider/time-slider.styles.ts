import { SxProps } from '@mui/system';

export const sliderStyles: SxProps = {
  color: '#1976d2',
  height: 8,
  '& .MuiSlider-track': {
    border: 'none',
    backgroundColor: '#1976d2',
    zIndex: 1,
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    zIndex: 2,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:hover': {
      boxShadow: '0px 0px 0px 8px rgba(25,118,210,0.16)',
    },
    '& .Mui-active': {
      boxShadow: '0px 0px 0px 14px rgba(25,118,210,0.16)',
    },
  },
  '& .MuiSlider-rail': {
    opacity: 1,
    backgroundColor: '#E7E7E7',
  },
  '& .MuiSlider-mark': {
    backgroundColor: '#D8D8D8',
    height: 12,
    width: 2,
  },
  '& .MuiSlider-markLabel': {
    color: '#9e9e9e',
    fontSize: '12px',
  },
};
