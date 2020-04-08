const webpack = require("webpack");

const { VueLoaderPlugin } = require("vue-loader");

const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
module.exports = function (env) {
    let config = {
        entry: {
            index: "./src/index.js",
        },
        output: {
            path: resolve("./dist"),
            filename: "[name].bundle.js",
            publicPath: "/",
        },
        mode: env.NODE_ENV,
        watch: env.NODE_ENV == "development",
        devtool:
            env.NODE_ENV == "development" ? "inline-source-map" : undefined,
        resolve: {
            extensions: [".js", ".vue", "json", "scss"],
            alias: {
                "@": resolve(__dirname, "src"),
            },
            modules: ["./", "node_modules"],
        },
        module: {
            rules: [
                {
                    test: /.(js|jsx)$/,
                    exclude: /(node_modules|bower_components)/,
                    use: [
                        {
                            loader: "babel-loader",
                            options: {
                                presets: ["@babel/preset-env"],
                            },
                        },
                    ],
                },
                {
                    test: /.(scss)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: resolve("./postcss.config.js"),
                                },
                            },
                        },
                        "sass-loader",
                        {
                            loader: "sass-resources-loader",
                            options: {
                                resources: ["src/theme/variable.scss"],
                            },
                        },
                    ],
                },
                {
                    test: /.(css)$/,
                    use: [
                        {
                            loader: MiniCssExtractPlugin.loader,
                        },
                        "css-loader",
                        {
                            loader: "postcss-loader",
                            options: {
                                config: {
                                    path: resolve("./postcss.config.js"),
                                },
                            },
                        },
                    ],
                },
                {
                    test: /.(png|svg|jpg|gif)$/,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                name: "assets/images/[name].[ext]",
                            },
                        },
                    ],
                },
                {
                    test: /.(woff|woff2|eot|ttf|otf)$/,
                    use: ["file-loader"],
                },
                {
                    test: /\.vue$/,
                    use: ["vue-loader"],
                },
            ],
        },
        plugins: [
            new CleanWebpackPlugin(),
            new CopyWebpackPlugin([
                /*                {
                    from: path.join(__dirname, "src/assets"),
                    to: path.join(__dirname, "dist/assets"),
                },*/
                {
                    from: path.join(__dirname, "src/i18n"),
                    to: path.join(__dirname, "dist/i18n"),
                },
            ]),
            new VueLoaderPlugin(),
            new MiniCssExtractPlugin({
                filename: "style.css",
                chunkFilename: "style.css",
                ignoreOrder: false,
            }),
            new HtmlWebpackPlugin({
                title: "live broadcasting",
                filename: "index.html",
                template: resolve("src/index.html"),
            }),
        ],
        optimization: {
            minimize: true,
            noEmitOnErrors: true,
            namedModules: true,
            splitChunks: {
                chunks: "async",
                minSize: 30000,
                maxSize: 0,
                minChunks: 1,
                maxAsyncRequests: 6,
                maxInitialRequests: 4,
                automaticNameDelimiter: "~",
                automaticNameMaxLength: 30,
                cacheGroups: {
                    vendor: {
                        name: "vendor",
                        test: /[\\/]node_modules[\\/]/,
                        chunks: "all",
                        priority: 10, // 优先级
                    },
                    common: {
                        name: "common",
                        test: /[\\/]src[\\/]/,
                        minSize: 1024,
                        chunks: "all",
                        priority: 5,
                    },
                },
            },
        },
        devServer: {
            contentBase: path.join(__dirname, "dist"),
            compress: true,
            port: 8080,
            hot: true,
        },
    };
    return config;
};
