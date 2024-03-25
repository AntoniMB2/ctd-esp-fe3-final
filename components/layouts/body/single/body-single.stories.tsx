import React from 'react';
import BodySingle, { BodySingleProps } from "./body-single";
import { Story } from 'utils/storybook';

const bodySingle = {
  title: 'Layout/Body/BodySingle',
  component: BodySingle,
}; 

export default bodySingle;

const Template: Story<BodySingleProps> = (args: BodySingleProps) => <BodySingle {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  title: 'Single body',
  // containerProps: {sx: {backgroundColor:'#faa' }}
};