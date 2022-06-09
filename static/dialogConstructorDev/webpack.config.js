const path = require("path");
const production = false;
process.env.NODE_ENV === "production";
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  mode: production ? "production" : "development",
  ...(production ? { devtool: "inline-source-map" } : {}),
  entry: "./src/main.tsx",
  output: {
    path: path.join(__dirname, "../js/dist"),
    filename: "graphConstructor.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
  ...(production
    ? {
        optimization: {
          minimize: true,
          minimizer: [new TerserPlugin()],
        },
      }
    : {}),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        options: {
          transpileOnly: true,
        },
      },
    ],
  },

  devServer: {
    host: "localhost",
    compress: true,
    port: "34567",
    disableHostCheck: true,
    overlay: true,
  },
};
