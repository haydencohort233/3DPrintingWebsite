import React, { useState } from 'react';
import { AppBar, Toolbar, Button, Box } from '@mui/material';
import QuoteForm from './QuoteForm'; // Adjust the path as needed
import { keyframes } from '@emotion/react';

// Define keyframes for color fade effect
const fadeYellowOrange = keyframes`
  0%, 100% {
    background-color: #FF5722; // Orange
  }
  50% {
    background-color: #FFB300; // Darker Yellow
  }
`;

const DesktopAppBar = ({ value, onChange, onRequestQuote }) => {
  const [isQuoteFormVisible, setIsQuoteFormVisible] = useState(false);

  const handleRequestQuote = () => {
    setIsQuoteFormVisible(true);
    if (onRequestQuote) {
      onRequestQuote();
    }
  };

  const handleCloseQuoteForm = () => {
    setIsQuoteFormVisible(false);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 'auto', bottom: 0, backgroundColor: '#FF5722', height: '64px' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src="/images/logo.png"
              alt="Logo"
              style={{ height: '40px', marginRight: '16px', cursor: 'pointer' }}
              onClick={() => onChange(null, 'home')}
            />
          </Box>
          <Box sx={{ display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              color="inherit"
              onClick={() => onChange(null, 'home')}
              sx={{
                fontWeight: value === 'home' ? 'bold' : 'normal',
                textDecoration: value === 'home' ? 'underline' : 'none',
                fontSize: value === 'home' ? '1.2rem' : '1rem',
                color: 'white',
                '&:hover': { color: '#FFFFFF' }
              }}
            >
              Home
            </Button>
            <Box sx={{ borderLeft: '1px solid #FFFFFF', height: '60%', mx: 2 }} />
            <Button
              color="inherit"
              onClick={() => onChange(null, 'portfolio')}
              sx={{
                fontWeight: value === 'portfolio' ? 'bold' : 'normal',
                textDecoration: value === 'portfolio' ? 'underline' : 'none',
                fontSize: value === 'portfolio' ? '1.2rem' : '1rem',
                color: 'white',
                '&:hover': { color: '#FFFFFF' }
              }}
            >
              Portfolio
            </Button>
            <Box sx={{ borderLeft: '1px solid #FFFFFF', height: '60%', mx: 2 }} />
            <Button
              color="inherit"
              onClick={() => onChange(null, 'faq')}
              sx={{
                fontWeight: value === 'faq' ? 'bold' : 'normal',
                textDecoration: value === 'faq' ? 'underline' : 'none',
                fontSize: value === 'faq' ? '1.2rem' : '1rem',
                color: 'white',
                '&:hover': { color: '#FFFFFF' }
              }}
            >
              FAQ
            </Button>
            <Box sx={{ borderLeft: '1px solid #FFFFFF', height: '60%', mx: 2 }} />
            <Button
              color="inherit"
              onClick={handleRequestQuote}
              sx={{
                fontWeight: value === 'quote' ? 'bold' : 'normal',
                textDecoration: value === 'quote' ? 'underline' : 'none',
                fontSize: value === 'quote' ? '1.2rem' : '1rem',
                color: 'white',
                '&:hover': { color: '#FFFFFF' },
                animation: `${fadeYellowOrange} 2s infinite`,
                borderRadius: '8px',
              }}
            >
              Request Quote
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <QuoteForm isVisible={isQuoteFormVisible} onClose={handleCloseQuoteForm} />
    </>
  );
};

export default DesktopAppBar;
