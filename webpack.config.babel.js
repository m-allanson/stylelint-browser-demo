import webpack from "webpack"
import path from "path"

export default {
  entry: "./site/index.js",
  output: {
    path: path.resolve(__dirname, "site"),
    publicPath: "/",
    filename: "bundle.js",
  },
  resolve: {
    root: path.resolve(__dirname),
    alias: {
      "resolve-from": "empty-module",
      cosmiconfig: "empty-module",
      doiuse: "empty-module",
      globby: "empty-module",
      globjoin: "empty-module",
      multimatch: "empty-module",
      path: "empty-module",
    },
    modulesDirectories: [
      "node_modules",
      "site",
    ]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },
    ],
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    // stylelint's postcssPlugin dynamically requires stylelint plugins which
    // are not used in the browser. Tell Webpack to ignore them with the
    // ContextReplacementPlugin. See https://github.com/webpack/webpack/issues/198
    new webpack.ContextReplacementPlugin(/stylelint/, /NEVER_MATCH^/),
  ],
  node: {
    fs: "empty",
    module: "empty",
  },
}
