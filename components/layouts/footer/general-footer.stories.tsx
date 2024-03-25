import React from 'react';
import GeneralFooter from "./general-footer.component";
import { Story } from 'utils/storybook';

const generalFooter = {
  title: 'Layout/Footer/GeneralFooter',
  component: GeneralFooter,
};

export default generalFooter;

const Template: Story<any> = (args: any) => <GeneralFooter {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};