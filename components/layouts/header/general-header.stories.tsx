import React from 'react';
import GeneralHeader, { Props } from "./general-header.component";
import { Story } from 'utils/storybook';

const generalHeader = {
  title: 'Layout/Header/GeneralHeader',
  component: GeneralHeader,
};

export default generalHeader;

const Template: Story<Props> = (args: Props) => <GeneralHeader {...args} />;

export const Primary = Template.bind({});
Primary.args = {
};

export const Simple = Template.bind({});
Simple.args = {
  variant: 'simple'
};