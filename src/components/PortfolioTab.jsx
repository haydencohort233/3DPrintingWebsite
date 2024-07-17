import React, { useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import PhotoGallery from "./PhotoGallery";

const PortfolioTab = () => {
  return (
    <Container maxWidth="md" sx={{ pb: 8 }}> {/* Add bottom padding */}
      <Box sx={{ my: 2 }}>
        <PhotoGallery />
      </Box>
    </Container>
  );
};

export default PortfolioTab;
