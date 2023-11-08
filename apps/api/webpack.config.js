const path = require('path');

module.exports = {
  entry: './src/main.ts', // Entry point of your NestJS app
  target: 'node',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'main.js', // Output file name
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: 'ts-loader',
          options: {
            configFile: 'tsconfig.json',
          },
        },
      },
    ],
  },
};
