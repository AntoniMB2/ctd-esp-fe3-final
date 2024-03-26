// components/FAQ.tsx
import React from 'react';

interface FAQProps {
  question: string;
  answer: string;
}

const faqs: React.FC<FAQProps> = ({ question, answer }) => {
  return (
    <div>
      <h2>{question}</h2>
      <p>{answer}</p>
    </div>
  );
}

export default faqs;