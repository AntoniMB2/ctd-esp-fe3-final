// components/faqs/Faqs.stories.tsx
import React from 'react';
import Faqs, { FAQProps } from './index.page';
import { Story } from 'utils/storybook';

const faqsStory = {
  title: 'Components/Faqs',
  component: Faqs,
};

export default faqsStory;

const Template: Story<FAQProps> = (args: FAQProps) => <Faqs {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  question: '¿Cuál es la pregunta de prueba?',
  answer: 'Esta es la respuesta de prueba.',
};