import React, { useState } from 'react';
import { Modal, Box, Typography, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const PhotoModal = ({ photo, initialIndex, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const images = [photo.src, ...(photo.alternatives || [])];

  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: '80%', md: '60%', lg: '40%' },
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '90vh',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    borderRadius: 2,
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <Modal open={!!photo} onClose={onClose}>
      <Box sx={style}>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          {photo.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton
            onClick={handlePrev}
            disabled={images.length <= 1}
            sx={{
              color: '#FF5722',
              '&:hover': { backgroundColor: '#FF7043' },
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          <Box
            component="img"
            src={images[currentIndex]}
            alt={photo.description}
            sx={{
              width: '100%',
              height: 'auto',
              borderRadius: 2,
            }}
          />
          <IconButton
            onClick={handleNext}
            disabled={images.length <= 1}
            sx={{
              color: '#FF5722',
              '&:hover': { backgroundColor: '#FF7043' },
            }}
          >
            <ArrowForwardIcon />
          </IconButton>
        </Box>
        {photo.alternatives && (
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 2 }}>
            {images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`${photo.description} alternative ${index + 1}`}
                sx={{
                  width: { xs: '60px', sm: '80px', md: '100px' },
                  height: 'auto',
                  borderRadius: 1,
                  cursor: 'pointer',
                  boxShadow: currentIndex === index ? 3 : 1,
                  border: currentIndex === index ? '2px solid #FF5722' : 'none',
                }}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </Box>
        )}
        <Typography variant="body2" sx={{ mb: 2 }}>
          {photo.longDescription}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Date: {photo.date}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Credits: {photo.credits}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Material: {photo.material}
        </Typography>
        {photo.tags && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1, flexWrap: 'wrap' }}>
            {photo.tags.map((tag, index) => (
              <Button
                key={index}
                variant="contained"
                sx={{
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  padding: '0.2rem 0.5rem',
                  backgroundColor: '#FF5722',
                  color: 'white',
                  '&:hover': { backgroundColor: '#FF7043' },
                }}
              >
                {tag}
              </Button>
            ))}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default PhotoModal;
