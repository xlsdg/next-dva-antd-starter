const _ = require('lodash');
const withLess = require('@zeit/next-less');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
// const { PHASE_PRODUCTION_BUILD, PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_SERVER } = require('next/constants');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

const Theme = require('./config/theme');
const Define = require('./config/define');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

module.exports = (phase, { defaultConfig }) => {
  let config = {};

  const isBuildForProd = process.env.BUILD_ENV === 'prod';
  const setConfig = cfg => _.assign({},/* defaultConfig, */config, cfg);

  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   config = setConfig({});
  // }

  // if (phase === PHASE_PRODUCTION_SERVER) {
  //   config = setConfig({});
  // }

  // config = setConfig({
  //   env: {},
  // });

  config = setConfig({
    // cssModules: true,
    // cssLoaderOptions: {
    //   importLoaders: 1,
    //   localIdentName: '[local]--[hash:base64:5]'
    // },
    lessLoaderOptions: {
      javascriptEnabled: true,
      modifyVars: Theme,
    },
  });

  config = setConfig({
    webpack(config, options) {
      const { webpack } = options;

      config.plugins.push(
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new webpack.DefinePlugin(Define(isBuildForProd)),
        new LodashWebpackPlugin({
          collections: true,
          paths: true,
        })
      );

      return config;
    },
    // webpackDevMiddleware: config => {
    //   return config;
    // },
  });

  config = setConfig({
    analyzeServer: _.includes(['server', 'both'], process.env.BUNDLE_ANALYZE),
    analyzeBrowser: _.includes(['browser', 'both'], process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
      server: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/server.html',
      },
      browser: {
        analyzerMode: 'static',
        reportFilename: '../../bundles/client.html',
      },
    },
  });

  return withLess(withBundleAnalyzer(config));
};
