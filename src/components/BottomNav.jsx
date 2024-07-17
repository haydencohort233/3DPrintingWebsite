import React, { useState } from 'react';
import { BottomNavigation, BottomNavigationAction, Paper, Box } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import WorkIcon from '@mui/icons-material/Work';
import HelpIcon from '@mui/icons-material/Help';
import AssignmentIcon from '@mui/icons-material/Assignment';
import QuoteForm from './QuoteForm';
import { keyframes } from '@emotion/react';

// Define keyframes for color fade effect
const fadeYellowOrange = keyframes`
  0%, 100% {
    background-color: #FF5722; // Orange
  }
  50% {
    background-color: #FFB300; // Yellow
  }
`;

const BottomNav = ({ value, onChange, onRequestQuote }) => {
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
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, backgroundColor: '#FF5722' }} elevation={3}>
        <BottomNavigation
          value={value}
          onChange={(event, newValue) => {
            if (newValue === 'quote') {
              handleRequestQuote();
            } else {
              onChange(event, newValue);
            }
          }}
          showLabels
          sx={{ backgroundColor: 'inherit' }}
        >
          <BottomNavigationAction
            label="Home"
            value="home"
            icon={<HomeIcon />}
            sx={{
              color: value === 'home' ? 'white' : '#FFCCBC',
              '&.Mui-selected': { color: 'white' },
              '& .MuiBottomNavigationAction-label': {
                fontSize: value === 'home' ? '1rem' : '0.75rem',
                transition: 'font-size 0.3s',
              },
              '&:hover': {
                backgroundColor: '#EF6C00',
                borderRadius: '0px', // Keep it rectangular
              },
            }}
          />
          <Box sx={{ borderLeft: '1px solid #FFCCBC', height: '100%', alignSelf: 'center' }} />
          <BottomNavigationAction
            label="Portfolio"
            value="portfolio"
            icon={<WorkIcon />}
            sx={{
              color: value === 'portfolio' ? 'white' : '#FFCCBC',
              '&.Mui-selected': { color: 'white' },
              '& .MuiBottomNavigationAction-label': {
                fontSize: value === 'portfolio' ? '1rem' : '0.75rem',
                transition: 'font-size 0.3s',
              },
              '&:hover': {
                backgroundColor: '#EF6C00',
                borderRadius: '0px', // Keep it rectangular
              },
            }}
          />
          <Box sx={{ borderLeft: '1px solid #FFCCBC', height: '100%', alignSelf: 'center' }} />
          <BottomNavigationAction
            label="FAQ"
            value="faq"
            icon={<HelpIcon />}
            sx={{
              color: value === 'faq' ? 'white' : '#FFCCBC',
              '&.Mui-selected': { color: 'white' },
              '& .MuiBottomNavigationAction-label': {
                fontSize: value === 'faq' ? '1rem' : '0.75rem',
                transition: 'font-size 0.3s',
              },
              '&:hover': {
                backgroundColor: '#EF6C00',
                borderRadius: '0px', // Keep it rectangular
              },
            }}
          />
          <Box sx={{ borderLeft: '1px solid #FFCCBC', height: '100%', alignSelf: 'center' }} />
          <BottomNavigationAction
            label="Request Quote"
            value="quote"
            icon={<AssignmentIcon />}
            onClick={handleRequestQuote}
            sx={{
              color: 'white',
              backgroundColor: '#D32F2F',
              '&.Mui-selected': { color: 'white' },
              '& .MuiBottomNavigationAction-label': {
                fontSize: '1rem',
                fontWeight: 'bold',
                transition: 'font-size 0.3s',
                whiteSpace: 'nowrap', // Prevent text wrapping
              },
              animation: `${fadeYellowOrange} 2s infinite`,
              borderRadius: '0px', // Keep it rectangular
            }}
          />
        </BottomNavigation>
      </Paper>
      <QuoteForm isVisible={isQuoteFormVisible} onClose={handleCloseQuoteForm} />
    </>
  );
};

export default BottomNav;
