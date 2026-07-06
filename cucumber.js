const defaultTags =
  process.env.CUCUMBER_TAGS === undefined ? 'not @requiresCredentials' : process.env.CUCUMBER_TAGS;

module.exports = {
  default: {
    paths: ['features/**/*.feature'],
    requireModule: ['ts-node/register'],
    require: ['src/support/**/*.ts', 'src/step-definitions/**/*.ts'],
    format: [
      'progress',
      'summary',
      'html:reports/cucumber-report.html',
      'json:reports/cucumber-report.json'
    ],
    tags: defaultTags
  }
};
