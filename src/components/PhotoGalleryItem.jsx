import React, { useState } from "react";
import { Card, CardMedia, CardContent, Typography, Box, Chip, IconButton } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";

const PhotoGalleryItem = ({ photo, onClick, onTagClick }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevClick = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + photo.alternatives.length + 1) % (photo.alternatives.length + 1));
  };

  const handleNextClick = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % (photo.alternatives.length + 1));
  };

  const displayedImage = currentImageIndex === 0 ? photo.src : photo.alternatives[currentImageIndex - 1];

  return (
    <Card onClick={onClick} sx={{ cursor: 'pointer', position: 'relative' }}>
      <CardMedia component="img" height="200" image={displayedImage} alt="Photo" />
      {photo.alternatives && photo.alternatives.length > 0 && (
        <>
          <IconButton
            sx={{
              position: 'absolute',
              top: '35%',
              left: 0,
              transform: 'translateY(-50%)',
              color: '#FF5722',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              '&.MuiIconButton-root': {
                margin: '0 auto',
              }
            }}
            onClick={handlePrevClick}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            sx={{
              position: 'absolute',
              top: '35%',
              right: 0,
              transform: 'translateY(-50%)',
              color: '#FF5722',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.7)' },
              '&.MuiIconButton-root': {
                margin: '0 auto',
              }
            }}
            onClick={handleNextClick}
          >
            <ArrowForward />
          </IconButton>
        </>
      )}
      <CardContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 1 }}>
            {photo.description}
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
            {photo.tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag}
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onTagClick(tag);
                }}
                sx={{
                  backgroundColor: '#FF5722',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: { xs: '0.5rem', sm: '0.875rem' },
                  fontWeight: 'bold',
                  padding: { xs: '0.01px 0.01px', sm: '0.2rem 0.5rem' },
                  '&:hover': { backgroundColor: '#FF7043' }
                }}
              />
            ))}
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PhotoGalleryItem;
