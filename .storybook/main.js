const path = require('path')

module.exports = {
  "stories": ["../components/**/*.mdx", "../components/**/*.stories.@(js|jsx|ts|tsx)"],

  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],

  "typescript": { reactDocgen: false },

  "framework": {
    name: "@storybook/nextjs",

    options: {
      nextConfigPath: "C:\\Users\\Estefania\\OneDrive\\Documentos\\Front3\\finalFront\\ctd-esp-fe3-final\\next.config.js"
    }
  },

  docs: {
    autodocs: true
  }
}