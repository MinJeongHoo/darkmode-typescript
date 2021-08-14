module.exports = {
  rules: [
    {
      test: /\.(js|ts)$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: [
            [
              "@babel/preset-env",
              { useBuiltIns: "entry", corejs: 2, targets: { chrome: "55" } },
            ],
            ["@babel/preset-typescript"],
          ],
          plugins: [
            "@babel/proposal-class-properties",
            "@babel/proposal-object-rest-spread",
          ],
        },
      },
    },
  ],
};
