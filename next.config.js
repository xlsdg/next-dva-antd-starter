const _ = require('lodash');
const withPlugins = require('next-compose-plugins');
const withLess = require('next-less-v2');
const withBundleAnalyzer = require("@zeit/next-bundle-analyzer");
const {
  PHASE_PRODUCTION_BUILD,
  // PHASE_DEVELOPMENT_SERVER,
  // PHASE_PRODUCTION_SERVER,
  // PHASE_EXPORT,
} = require('next/constants');
const LodashWebpackPlugin = require('lodash-webpack-plugin');

const Theme = require('./config/theme');
const Define = require('./config/define');

// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
  require.extensions['.less'] = file => {};
}

const plugins = [];

plugins.push([withLess, {
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: '[local]--[hash:base64:5]'
  },
  [PHASE_PRODUCTION_BUILD]: {
    cssLoaderOptions: {
      importLoaders: 1,
      localIdentName: '[hash:base64:8]',
    },
  },
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: Theme,
  },
}]);

plugins.push([withBundleAnalyzer, {
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
}]);

const nextConfig = {
  // env: {},
  webpack(config, options) {
    const { webpack } = options;
    const isBuildForProd = process.env.BUILD_ENV === 'prod';

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
};

module.exports = withPlugins(plugins, nextConfig);
