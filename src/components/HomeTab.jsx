import React, { useState, useEffect } from 'react';
import { Box, Typography, Button, useTheme, Card, CardContent, Collapse, Grid, Link, Paper, useMediaQuery } from '@mui/material';
import { Rating } from '@mui/material';
import { Divider } from 'primereact/divider';
import { Galleria } from 'primereact/galleria';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import AssignmentIcon from '@mui/icons-material/Assignment';
import StoreIcon from '@mui/icons-material/Store';
import GoogleIcon from '@mui/icons-material/Google';
import { keyframes } from '@emotion/react';

const HomeTab = ({ onOpenQuoteForm }) => {
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState('CLOSED');
  const isMobile = useMediaQuery((theme) => theme.breakpoints.down('sm'));

  useEffect(() => {
    const checkBusinessStatus = () => {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();

      if (currentHour >= 10 && currentHour < 21) {
        setStatus('OPEN');
      } else if (currentHour === 9 && currentMinute >= 0) {
        setStatus('OPENING SOON');
      } else if (currentHour === 21 && currentMinute >= 0) {
        setStatus('CLOSING SOON');
      } else {
        setStatus('CLOSED');
      }
    };
    checkBusinessStatus();
    const interval = setInterval(checkBusinessStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  const pulseAnimation = keyframes`
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  `;

  const getStatusColor = () => {
    if (status === 'OPEN') return '#4CAF50';
    if (status === 'OPENING SOON') return '#FFC107';
    if (status === 'CLOSING SOON') return '#FFA000';
    return '#F44336';
  };

  const getHoverColor = () => {
    if (status === 'OPEN') return '#388E3C';
    if (status === 'OPENING SOON') return '#FFA000';
    if (status === 'CLOSING SOON') return '#FFD700';
    return '#D32F2F';
  };

  const photos = [
    { 
      itemImageSrc: '/images/slide1.png', 
      thumbnailImageSrc: '/images/slide1.png',
      alt: 'Description for Photo 1' 
    },
    { 
      itemImageSrc: '/images/slide2.png', 
      thumbnailImageSrc: '/images/slide2.png',
      alt: 'Description for Photo 2' 
    },
    { 
      itemImageSrc: '/images/slide3.png', 
      thumbnailImageSrc: '/images/slide3.png',
      alt: 'Description for Photo 1' 
    }
  ]; 
  
  const itemTemplate = (item) => {
    return <img src={item.itemImageSrc} alt={item.alt} style={{ width: '100%' }} />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item.thumbnailImageSrc} alt={item.alt} style={{ width: '100%' }} />;
  };

  return (
    <Box sx={{ p: 1, pb: 8, fontFamily: 'Oswald, sans-serif' }}>
      <Box sx={{ mb: 2 }}>
      <Card 
        sx={{ 
          width: '100%', 
          maxWidth: 700, 
          height: 100, 
          textAlign: 'center', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: 1, 
          bgcolor: getStatusColor(), 
          color: 'white', 
          cursor: 'pointer', 
          mx: 'auto',
          '&:hover': { bgcolor: getHoverColor() },
          transition: 'background-color 0.3s',
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
          <CardContent 
            sx={{ 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              justifyContent: 'center', 
              width: '100%', 
              height: '100%',
            }}
          >
      <Typography variant="h6" component="div" sx={{ marginTop: '15px', whiteSpace: 'nowrap', fontFamily: 'Oswald, sans-serif' }}>
        We are currently: {status}
      </Typography>

      <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontStyle: 'italic', fontSize: '0.875rem', fontFamily: 'Oswald, sans-serif' }}>
        Click below for business hours
      </Typography>

      {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </CardContent>
      </Card>
      <Collapse in={isOpen}>
        <Box 
          sx={{ 
            maxWidth: '600px', 
            width: '70%',
            textAlign: 'center', 
            mx: 'auto', 
            bgcolor: getStatusColor(),
            padding: 1,
            borderBottomLeftRadius: 8,
            borderBottomRightRadius: 8,
            cursor: 'pointer',
            '&:hover': { bgcolor: getHoverColor() },
            transition: 'background-color 0.3s',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
            Business Hours:
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
            Monday: 10 AM - 10 PM
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
            Tuesday: 10 AM - 10 PM
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
            Wednesday: 10 AM - 10 PM
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
            Thursday: 10 AM - 10 PM
          </Typography>
          <Typography variant="body1" sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
            Friday: 10 AM - 10 PM
          </Typography>
        </Box>
      </Collapse>
      </Box>

      <Grid container spacing={2} justifyContent="center" sx={{ mb: 2 }}>
        <Grid item xs={9} sm={6} md={4} sx={{ mb: { xs: 0.5, sm: 0 } }}>
          <Card sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1, height: '60%', bgcolor: '#FF5722' }}>
            <CardContent>
              <Typography variant="h6" component="div" noWrap sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
                Email:
              </Typography>
              <Typography variant="body2" noWrap sx={{ color: 'black', fontFamily: 'Oswald, sans-serif' }}>
                valley3dprints@gmail.com
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9} sm={6} md={4} sx={{ mb: { xs: 0.5, sm: 0 }, mt: { xs: -6, sm: 0 } }}>
          <Card sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1, height: '60%', bgcolor: '#FF5722' }}>
            <CardContent>
              <Typography variant="h6" component="div" noWrap sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
                Phone:
              </Typography>
              <Typography variant="body2" noWrap sx={{ color: 'black', fontFamily: 'Oswald, sans-serif' }}>
                1 (209) 202-3221
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={9} sm={6} md={4} sx={{ mb: { xs: -6, md: 0, sm: -6 }, mt: { xs: -6, sm: -5, md: 0, lg: 0 } }}>
          <Card sx={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 1, height: '60%', bgcolor: '#FF5722' }}>
            <CardContent>
              <Typography variant="h6" component="div" noWrap sx={{ color: 'white', fontFamily: 'Oswald, sans-serif' }}>
                Location:
              </Typography>
              <Typography variant="body2" noWrap sx={{ color: 'black', fontFamily: 'Oswald, sans-serif' }}>
                East Modesto, CA
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: { xs: 0, sm: 0, md: -6, lg: -5 }, display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2, fontFamily: 'Oswald, sans-serif' }}>
        <Rating name="read-only" value={4.6} readOnly precision={0.5} />
        <Typography variant="body1" sx={{ ml: 1, whiteSpace: 'nowrap', fontFamily: 'Oswald, sans-serif' }}>
          4.6 stars based on 11 reviews
        </Typography>
      </Box>

      <Divider align="center" style={{ margin: '20px 0', backgroundColor: '#FF5722' }}>
        <Typography variant="h5" style={{ color: 'black' }}>WELCOME TO VALLEY3DPRINTS</Typography>
      </Divider>

      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img
          src="/images/logo.png"
          alt="Logo"
          style={{ width: '150px', height: 'auto' }}
        />
      </Box>

      <Grid container spacing={2} justifyContent="center" alignItems="center" sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          onClick={onOpenQuoteForm}
          variant="contained"
          color="secondary"
          startIcon={<AssignmentIcon />}
          sx={{
            bgcolor: '#FF5722',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            padding: '12px 18px',
            fontFamily: 'Oswald, sans-serif',
            width: '100%',
            animation: `${pulseAnimation} 2s infinite`,
            '&:hover': { bgcolor: '#EF6C00' }
          }}
        >
          Request a Quote
        </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component="a"
            href="https://www.google.com/search?q=Valley3DPrints"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            startIcon={<GoogleIcon />}
            sx={{
              bgcolor: '#FF5722',
              '&:hover': { bgcolor: '#EF6C00' },
              fontSize: '1.1rem',
              fontWeight: 'bold',
              padding: '6px 12px',
              fontFamily: 'Oswald, sans-serif',
              width: '100%',
            }}
          >
            View Our Google Page
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            component="a"
            href="https://www.etsy.com/shop/valley3dprints"
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
            color="primary"
            startIcon={<StoreIcon />}
            sx={{
              bgcolor: '#FF5722',
              '&:hover': { bgcolor: '#EF6C00' },
              fontSize: '1.1rem',
              fontWeight: 'bold',
              padding: '6px 12px',
              fontFamily: 'Oswald, sans-serif',
              width: '100%',
            }}
          >
            Visit our Etsy Shop
          </Button>
        </Grid>
      </Grid>

      <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
    >
      <Typography variant="body1" paragraph sx={{ mt: 2, mb: 2, fontFamily: 'Oswald, sans-serif', maxWidth: '500px' }}>
        Here you can submit your Contact Information and a{' '}
        <Link href="https://www.thingiverse.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#FF5722', textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}>
          Thingiverse
        </Link>{' '}
        or{' '}
        <Link href="https://www.printables.com" target="_blank" rel="noopener noreferrer" sx={{ color: '#FF5722', textDecoration: 'underline', '&:hover': { textDecoration: 'underline' } }}>
          Printables
        </Link>{' '}
        link request. If your request is original and custom please submit a detailed Description so we can better understand you.
      </Typography>

      <Typography variant="body1" paragraph sx={{ mt: 2, mb: 2, fontFamily: 'Oswald, sans-serif', maxWidth: '500px' }}>
        <u>Our max print size is 250mm x 210mm x 210mm (9.84 x 8.27 x 8.27 inches).</u>
        <br />
        For other questions please visit our FAQ Section.
      </Typography>
    </Box>

        <Divider align="left" style={{ margin: '20px 0', backgroundColor: '#FF5722' }}>
          <Typography variant="h5" style={{ color: 'black' }}>ABOUT US</Typography>
        </Divider>

      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          <Grid item xs={12} md={7}>
            <Typography variant="h5" gutterBottom sx={{ fontFamily: 'Oswald, sans-serif' }}>
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', mt: 2, mb: 4, fontFamily: 'Oswald, sans-serif' }}>
          We are a 3D Printing Service located in Modesto, California. We have been printing since the start of COVID in June 2020,
          we have worked closely with some big local companies and many individuals to provide prototypes and printing requests.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', mt: 2, mb: 4, fontFamily: 'Oswald, sans-serif' }}>
          Some companies that we've worked with are The McHenry Museum, The SoiCo Candle Company, Luperia's Taqueria.
          We've also been at multiple vendor popups or tucked away in local shops.
        </Typography>
        <Typography variant="body1" paragraph sx={{ textAlign: 'center', mt: 2, mb: 4, fontFamily: 'Oswald, sans-serif' }}>
          We are a part-time business and I work from my private residence not a business location. However we can meet in person to discuss a project.
           I try to get things done as soon as possible but there are delays that can happen from my life or due to machine complications.
        </Typography>
          </Grid>
          <Grid item xs={12} md={5} sx={{ mt: { xs: 0, md: 2 }, mb: 4 }}>
            <Galleria 
              value={photos} 
              item={itemTemplate} 
              thumbnail={thumbnailTemplate} 
              numVisible={5} 
              circular 
              style={{ maxWidth: '500px', margin: 'auto' }} 
              showItemNavigators 
              showThumbnails 
              thumbnailsPosition="bottom"
            />
          </Grid>
        </Grid>

        <Divider align="center">
          <Typography variant="h6" fontSize={16} style={{ color: 'black' }}>Valley3DPrints by Hayden Janes</Typography>
        </Divider>

      </Box>
    </Box>
  );
};

export default HomeTab;
