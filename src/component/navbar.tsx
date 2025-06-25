import { Box, Typography } from '@mui/material';

import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ClearIcon from '@mui/icons-material/Clear';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  title: string;
  backPath?: string;
  status?: 'back' | 'clear'; // 'back' for arrow, 'clear' for X icon
}

function Navbar({ title, backPath, status = 'back' }: NavbarProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (backPath) {
      navigate(backPath);
    } else {
      navigate(-1);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Box
        sx={{
          padding: '0 15px',
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#ffffff',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {/* Conditional Icon on the Left */}
        <Box
          onClick={handleBack}
          sx={{
            display: 'flex',
            alignItems: 'center',
            cursor: 'pointer',
            position: 'absolute',
            left: '15px',
          }}
        >
          {status === 'clear' ? <ClearIcon /> : <ArrowBackIosIcon />}
        </Box>

        {/* Centered Title */}
        <Typography
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>
      </Box>
    </Box>
  );
}

export default Navbar;
