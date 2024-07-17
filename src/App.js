import React, { useState } from 'react';
import HomeTab from './HomeTab';
import QuoteForm from './QuoteForm';
import BottomNav from './BottomNav';
import { ThemeProvider } from '@mui/material/styles'; // Correct import for ThemeProvider
import theme from './theme';

const App = () => {
  const [isQuoteFormVisible, setIsQuoteFormVisible] = useState(false);
  const [navValue, setNavValue] = useState('home');

  const handleOpenQuoteForm = () => {
    console.log('Opening QuoteForm modal...');
    setIsQuoteFormVisible(true);
  };

  const handleCloseQuoteForm = () => {
    console.log('Closing QuoteForm modal...');
    setIsQuoteFormVisible(false);
  };

  const handleNavChange = (event, newValue) => {
    if (newValue === 'quote') {
      handleOpenQuoteForm();
    } else {
      setNavValue(newValue);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      {navValue === 'home' && <HomeTab onOpenQuoteForm={handleOpenQuoteForm} />}
      <QuoteForm isVisible={isQuoteFormVisible} onClose={handleCloseQuoteForm} />
      <BottomNav value={navValue} onChange={handleNavChange} onRequestQuote={handleOpenQuoteForm} />
    </ThemeProvider>
  );
};

export default App;
