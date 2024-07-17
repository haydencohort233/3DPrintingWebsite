import React, { useState } from "react";
import { Grid, Box, Button } from "@mui/material";
import PhotoGalleryItem from "./PhotoGalleryItem";
import PhotoModal from "./PhotoModal";
import { DeferredContent } from 'primereact/deferredcontent';
import { ScrollTop } from 'primereact/scrolltop';
import { Carousel } from 'primereact/carousel';

export const photos = [
  { 
    src: "/images/slide1.png", 
    tags: ["Arts & Crafts", "Multicolor", "Custom"], 
    description: "A beautiful multicolor art piece", 
    longDescription: "Long description.", 
    date: "2023-05-01", credits: "John Doe", material: "PLA", 
    alternatives: ["/images/slide1-1.png"] 
  },
  { 
    src: "/images/slide2.png", tags: ["Machinery", "Custom"], 
    description: "Custom machinery part", 
    longDescription: "Long description.", 
    date: "2023-06-15", credits: "Valley3DPrints", material: "PLA" 
  },
  { 
    src: "/images/slide3.png", tags: ["Multicolor", "Custom"], 
    description: "Colorful custom design", 
    longDescription: "Long description.", 
    date: "2023-07-20", credits: "Valley3DPrints", material: "PLA" 
  },
  { 
    src: "/images/slide4.png", tags: ["Popular", "Custom"], 
    description: "Stanley Cup Chapstick Holder", 
    longDescription: "Long description.", 
    date: "2023-08-05", credits: "Valley3DPrints", material: "PLA" 
  },
  { 
    src: "/images/slide5.png", tags: ["Custom"], 
    description: "Blueprints of a Modesto Taqueria", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA"
  },
  { 
    src: "/images/slide6-1.png", tags: ["Holiday", "Custom"], 
    description: "Heart-Shape Ashtray & Debowler", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide6-2.png", "/images/slide6-3.png"] 
  },
  { 
    src: "/images/slide7-1.png", tags: ["Arts & Crafts", "Custom"], 
    description: "Candle-Wick Clips", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide7-2.png", "/images/slide7-4.png", "/images/slide7-3.png"] 
  },
  { 
    src: "/images/slide8-1.png", tags: ["Thingiverse"], 
    description: "Miniature Movie Theater Model", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide8-2.png"] 
  },
  { 
    src: "/images/slide9-1.png", tags: ["Holiday", "Custom"], 
    description: "Heart-Shape Bud Scooper", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide9-2.png"] 
  },
  { 
    src: "/images/slide10-1.png", tags: ["Gaming", "Thingiverse"], 
    description: "Master Sword from Legend of Zelda", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "TBA", material: "PLA", 
    alternatives: ["/images/slide10-2.png", "/images/slide10-3.png"] 
  },
  { 
    src: "/images/slide11-1.png", tags: ["Figurines", "Custom"], 
    description: "Miniature Sidewalks", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide11-2.png"] 
  },
  { 
    src: "/images/slide12-1.png", tags: ["Request"], 
    description: "Wind Sensor Mounts", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "N/A", material: "PLA"
  },
  { 
    src: "/images/slide13-1.png", tags: ["Arts & Crafts", "Custom"], 
    description: "Mickey Mouse Beading Tray", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide13-2.png"] 
  },
  { 
    src: "/images/slide14-1.png", tags: ["Thingiverse"], 
    description: "LEGO Skeleton", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "TBA", material: "PLA", 
    alternatives: ["/images/slide14-2.png"] 
  },
  { 
    src: "/images/slide15-1.png", tags: ["Custom"], 
    description: "Baseball Card Holder w/ Logo", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide15-2.png", "/images/slide15-3.png"] 
  },
  { 
    src: "/images/slide16-1.png", tags: ["Thingiverse"], 
    description: "Sticky Note Forklift Desk Holder", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "TBA", material: "PLA", 
    alternatives: ["/images/slide16-2.png", "/images/slide16-3.png"] 
  },
  { 
    src: "/images/slide17-1.png", tags: ["Gaming", "Thingiverse"], 
    description: "Ocarina from Legend of Zelda", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "TBA", material: "PLA", 
    alternatives: ["/images/slide17-2.png"] 
  },
  { 
    src: "/images/slide18-1.png", tags: ["Thingiverse"], 
    description: "DoodleBob Pen Holder", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "TBA", material: "PLA", 
  },
  { 
    src: "/images/slide19-1.png", tags: ["Holiday", "Custom"], 
    description: "K-Cup Holder (Halloween Coffin)", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "TBA", material: "PLA", 
    alternatives: ["/images/slide19-2.png", "/images/slide19-3.png"] 
  },
  { 
    src: "/images/slide20-1.png", tags: ["Holiday", "Custom"], 
    description: "Heart Tealight Candle Holders", 
    longDescription: "Long description.", 
    date: "2023-09-10", credits: "Valley3DPrints", material: "PLA", 
    alternatives: ["/images/slide20-2.png", "/images/slide20-3.png"] 
  },
];

export const frontPhotos = photos.filter(photo => photo.tags.includes('FRONT'));

const uniqueTags = [...new Set(photos.flatMap(photo => photo.tags))];

const PhotoGallery = () => {
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [initialIndex, setInitialIndex] = useState(0);

  const filteredPhotos = selectedTag === "all"
    ? photos
    : photos.filter(photo => photo.tags.includes(selectedTag));

  const handleTagClick = (tag) => {
    setSelectedTag(tag);
  };

  const handlePhotoClick = (photo, index) => {
    setSelectedPhoto(photo);
    setInitialIndex(index);
  };

  const customStyle = {
    bottom: '80px'
  };

  return (
    <Box sx={{ minWidth: '320px', width: '100%' }}>
      <Box sx={{ my: 2, display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 0.5 }}>
        <Button
          variant="contained"
          onClick={() => setSelectedTag("all")}
          sx={{
            fontSize: { xs: '0.65rem', sm: '0.75rem' },
            padding: { xs: '0.1rem 0.3rem', sm: '0.15rem 0.4rem' },
            backgroundColor: selectedTag === "all" ? '#FFA726' : '#FF5722',
            color: 'white',
            '&:hover': { backgroundColor: selectedTag === "all" ? '#FF9800' : '#FF7043' },
            margin: '0.05rem'
          }}
        >
          All
        </Button>
        {uniqueTags.map(tag => (
          <Button
            key={tag}
            variant="contained"
            onClick={() => setSelectedTag(tag)}
            sx={{
              fontSize: { xs: '0.65rem', sm: '0.75rem' },
              padding: { xs: '0.1rem 0.3rem', sm: '0.15rem 0.4rem' },
              backgroundColor: selectedTag === tag ? '#FFA726' : '#FF5722',
              color: 'white',
              '&:hover': { backgroundColor: selectedTag === tag ? '#FF9800' : '#FF7043' },
              margin: '0.05rem'
            }}
          >
            {tag}
          </Button>
        ))}
      </Box>

      <Grid container spacing={1}>
        {filteredPhotos.map((photo, index) => (
          <Grid item xs={6} sm={6} md={4} key={index}>
            <DeferredContent>
              <PhotoGalleryItem
                photo={photo}
                onClick={() => handlePhotoClick(photo, index)}
                onTagClick={handleTagClick}
              />
            </DeferredContent>
          </Grid>
        ))}
      </Grid>
      {selectedPhoto && (
        <PhotoModal
          photo={selectedPhoto}
          initialIndex={initialIndex}
          onClose={() => setSelectedPhoto(null)}
        />
      )}
      <ScrollTop threshold={200} className="custom-scrolltop" icon="pi pi-arrow-up" style={customStyle} />
    </Box>
  );
};

export default PhotoGallery;
