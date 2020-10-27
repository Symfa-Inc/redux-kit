/* eslint-disable  */
const {
  override,
  addWebpackAlias,
  addDecoratorsLegacy,
} = require('customize-cra');
const path = require('path');

const overrideProcessEnv = (value) => (config) => {
  const { plugins } = config;
  const plugin = plugins.find((p) => p.constructor.name === 'DefinePlugin');
  const processEnv = plugin.definitions['process.env'] || {};

  plugin.definitions['process.env'] = {
    ...processEnv,
    ...value,
  };

  return config;
};

module.exports = override(
  addDecoratorsLegacy(),
  addWebpackAlias({
    '@components': path.resolve(__dirname, './src/components'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@store': path.resolve(__dirname, './src/store'),
    '@utils': path.resolve(__dirname, './src/utils'),
  }),

  overrideProcessEnv({
    API_URL: JSON.stringify(process.env.API_URL || '__API_URL'),
  }),
);
