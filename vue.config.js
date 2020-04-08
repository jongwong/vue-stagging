const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}

module.exports = {
    assetsDir: "assets",
    productionSourceMap: false,
    configureWebpack: {
        resolve: {
            modules: ["./", "node_modules"],
        },
    },
    publicPath: "./",
    chainWebpack: (config) => {
        config.resolve.alias
            .set("@", resolve("src"))
            .set("@assets", resolve("src/assets"))
            .set("@c", resolve("src/layout/components"))
            .set("@p", resolve("src/layout/pages"));
        /* config.resolve.modules.splice(0, 0, "./");*/
        config.plugin("html").tap((args) => {
            const options = args[0];
            options.title = "live broadcasting";
            return args;
        });
    },

    devServer: {},
    pluginOptions: {
        "style-resources-loader": {
            preProcessor: "scss",
            patterns: ["src/theme/variable.scss"],
        },
        i18n: {
            locale: "zh",
            fallbackLocale: "zh",
            localeDir: "i18n",
            enableInSFC: true,
        },
    },
};
