// pages/faqs.tsx
import React from 'react';
import FAQ from '../../components/preguntas-frecuentes/index.page';
import LayoutGeneral from '../../components/layouts/layout-general';
interface FAQData {
  id: number;
  question: string;
  answer: string;
}

export async function getStaticProps() {
  const res = await fetch('https://ctd-esp-fe3-final-ten-liard.vercel.app/api/preguntas-frecuentes');
  const faqsData: FAQData[] = await res.json();

  return {
    props: {
      faqsData,
    },
  };
}

interface FaqsProps {
  faqsData: FAQData[];
}

const Faqs: React.FC<FaqsProps> = ({ faqsData }) => {
  
  return (
    <LayoutGeneral>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
      {faqsData.map((faq) => (
        <FAQ key={faq.id} question={faq.question} answer={faq.answer} />
      ))}
      </div>
    </LayoutGeneral>
  );
}

export default Faqs;