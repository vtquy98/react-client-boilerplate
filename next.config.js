const path = require("path");
const Dotenv = require("dotenv-webpack");
const withCSS = require("@zeit/next-css");

module.exports = withCSS({
  cssModules: true,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]"
  },
  webpack: config => {
    config.node = {
      fs: "empty"
    };

    config.plugins = config.plugins || [];

    config.plugins = [
      ...config.plugins,
      // Read the .env file
      new Dotenv({
        path: path.join(__dirname, "./.env"),
        systemvars: true
      })
    ];

    return config;
  }
});
