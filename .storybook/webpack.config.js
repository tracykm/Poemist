// you can use this file to add your custom webpack plugins, loaders and anything you like.
// This is just the basic way to add addional webpack configurations.
// For more information refer the docs: https://goo.gl/qPbSyX

// IMPORTANT
// When you add this file, we won't add the default configurations which is similar
// to "React Create App". This only has babel loader to load JavaScript.
var path = require('path');

module.exports = {
    plugins: [
        // your custom plugins
    ],
    module: {
        loaders: [
            { test: /\.scss$/, loaders: ['style', 'css', 'sass'] },
            { test: /\.css$/, loader: 'style!css' },
            { test: /\.(png|woff|woff2|eot|ttf|svg|jpg)$/, loader: 'url-loader?limit=100000' }
        ],
    },
    resolve: {
        alias: {
            frontend: path.join(__dirname, '../frontend'),
            images: path.join(__dirname, '../app/assets/images'),
        },
    },
};
