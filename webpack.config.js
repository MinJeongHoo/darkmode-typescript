const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const jsLoader = require("./loader/jsLoader.ts");
module.exports = {
  mode: "development",
  entry: {
    main: "./src/app.ts",
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  devServer: {
    port: 8000,
  },
  module: {
    rules: [jsLoader],
  },
};
