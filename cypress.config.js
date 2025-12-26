const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/results',
    overwrite: false,
    html: true,
    json: true
  },

  e2e: {
    baseUrl: "https://qauto.forstudy.space",
    watchForFileChanges: false,
    specPattern: "cypress/e2e/**/*.{spec,test}.{js,jsx,ts,tsx}",
    experimentalRunAllSpecs: true,
    setupNodeEvents(on, config) {
      return config;
    },
  },
});
