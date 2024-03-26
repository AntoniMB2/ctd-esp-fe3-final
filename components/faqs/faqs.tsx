// components/FAQ.tsx
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export interface FAQProps {
  question: string;
  answer: string;
}

const faqs: React.FC<FAQProps> = ({ question, answer }) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>{question}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>
          {answer}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

export default faqs;