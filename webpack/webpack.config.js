const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const PROD_PUBLIC = '/public/assets/';
const DEV_PUBLIC = '/';

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new HtmlWebpackPlugin({
    inject: true,
    template: './public/index.html',
  }),
];

const commonPlugins = [
  new MiniCssExtractPlugin({
    filename: './styles/main.css',
    chunkFilename: '[id].css',
  }),
  new CleanWebpackPlugin({
    root: process.cwd(),
    verbose: true,
    cleanOnceBeforeBuildPatterns: ['./build/**'],
  }),
  new HtmlWebpackPlugin({
    filename: 'index.ejs',
    template: './public/index.ejs',
    minify: {
      removeComments: true,
      collapseWhitespace: true,
      removeRedundantAttributes: true,
      useShortDoctype: true,
      removeEmptyAttributes: true,
      removeStyleLinkTypeAttributes: true,
      keepClosingSlash: true,
      minifyJS: true,
      minifyCSS: true,
      minifyURLs: true,
    },
    inject: true,
  }),
  new CopyWebpackPlugin([
    { from: './public/favicon.png', to: './favicon.png' },
  ]),
  new CopyWebpackPlugin([
    { from: './public/manifest.json', to: './manifest.json' },
  ]),
];

const getPlugins = isDev => {
  let plugins = [...commonPlugins];

  if (isDev) {
    plugins = plugins.concat([...devPlugins]);
  }
  return plugins;
};

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';

  return {
    mode: isDev ? argv.mode : 'production',
    entry: [
      require.resolve('babel-polyfill'),
      path.join(process.cwd(), './src/main.jsx'),
    ],
    output: {
      path: path.resolve('build/assets'),
      publicPath: isDev ? DEV_PUBLIC : PROD_PUBLIC,
      filename: 'bundle.js',
    },
    devServer: {
      contentBase: './build',
      compress: true,
      hot: true,
      historyApiFallback: true,
      disableHostCheck: true,
      port: 3001,
      stats: {
        children: false,
        maxModules: 0,
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.css$/,
          use: [{ loader: MiniCssExtractPlugin.loader }, 'css-loader'],
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-url-loader',
              options: {
                limit: 10 * 1024,
                noquotes: true,
                encoding: 'base64',
              },
            },
          ],
        },
        {
          test: /\.(jpg|png|gif)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10 * 1024,
              },
            },
          ],
        },
        {
          test: /\.html$/,
          use: 'html-loader',
        },
        {
          test: /\.ejs$/,
          use: 'raw-loader',
        },
        {
          test: /\.(eot|otf|ttf|woff|woff2)$/,
          use: 'file-loader',
        },
      ],
    },
    plugins: getPlugins(isDev),
    node: {
      fs: 'empty',
    },

  };
};
