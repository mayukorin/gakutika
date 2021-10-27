module.exports = {
    transpileDependencies: ["vuetify"],
    outputDir: "../app/assets/stylesheets/static",
    indexPath: "../views/home/index.html.erb",

    publicPath: process.env.NODE_ENV === "production" ? "/app/static/" : "/",

    configureWebpack: {
        devServer: {
            watchOptions: {
                poll: true,
            },
        },
    },
};
