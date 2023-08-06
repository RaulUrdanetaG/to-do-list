const path = require("path");
const common = require("./webpack.common");
const { merge } = require('webpack-merge');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");



module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    plugins: [new MiniCssExtractPlugin({ filename: "[name].[contentHas].css" }),
              new CleanWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
});