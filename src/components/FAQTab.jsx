import React, { useState } from "react";
import { Container, Typography, Box, Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTheme } from '@mui/material/styles';

const faqs = [
  {
    question: "How do I place an order?",
    answer: "Use our \"Request Quote\" feature or contact us via Instagram Chat, or our Email Address."
  },
  {
    question: "How much does 3D printing cost?",
    answer: `Simple Thingiverse & Printables requests range from $20 - $100.<br /><br />
             Longer answer: It's all determined by printer use time, amount of material used, type of material used, supports, custom color requests, and if CAD services or priority printing are involved.`
  },
  {
    question: "How long does it usually take?",
    answer: "Generally, it takes 1-2 weeks for basic requests. Custom requests, materials, or orders all take more time for shipping or CAD work."
  },
  {
    question: "What is \"CAD\"?",
    answer: "CAD stands for Computer-Aided Design, and it involves creating objects on a 3D modeling program such as Fusion360, Blender, or TinkerCAD. It can also be used to edit files from Thingiverse or Printables to add custom text or remove unwanted features."
  },
  {
    question: "Where can I find files to send you for printing?",
    answer: `Click <a href="https://www.thingiverse.com/">here</a> to go to Thingiverse and <a href="https://www.printables.com/">here</a> to go to Printables.<br />
             These websites have many unique ideas, and you can start there or request something more custom.`
  },
  {
    question: "Do you offer shipping?",
    answer: "Yes we offer shipping through USPS, but we generally meet with our clients in Modesto, CA."
  },
  {
    question: "Can I stock my store with your prints?",
    answer: "Yes but only if you ask! We want our prints displayed everywhere!"
  }
];

const FAQTab = () => {
  const theme = useTheme(); // Use the theme
  const [expanded, setExpanded] = useState(0);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Container maxWidth="md" sx={{ pb: 8, fontFamily: theme.typography.fontFamily }}>
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Frequently Asked Questions
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Find answers to the most common questions about our services
        </Typography>
        {faqs.map((faq, index) => (
          <Accordion 
            key={index} 
            expanded={expanded === index} 
            onChange={handleChange(index)} 
            sx={{ 
              mb: 1, 
              '& .MuiAccordionSummary-root': { 
                backgroundColor: expanded === index ? '#FF5722' : '#8B4513', 
                color: 'white',
                '&:hover': {
                  backgroundColor: expanded === index ? '#EF6C00' : '#A0522D',
                },
                justifyContent: 'center',
                '& .MuiAccordionSummary-content': {
                  justifyContent: 'center',
                  textAlign: 'center'
                }
              },
              '& .MuiAccordionDetails-root': { 
                backgroundColor: expanded === index ? '#666666' : '#444444', 
                color: 'white',
                textAlign: 'center'
              }
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}>
              <Typography variant="h6" align="center">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography dangerouslySetInnerHTML={{ __html: faq.answer }} align="center" />
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </Container>
  );
};

export default FAQTab;
