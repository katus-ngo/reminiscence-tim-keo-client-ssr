require('dotenv').config();
const path = require('path');

const Dotenv = require('dotenv-webpack');
const withCSS = require('@zeit/next-css');
module.exports = withCSS(
    {
        webpack: config => {
            // Fixes npm packages that depend on `fs` module
            config.node = {
                fs: 'empty',
                net: 'empty'
            };

            config.plugins = config.plugins || [];

            config.module.rules.push({
                test: /\.(png|svg|eot|otf|ttf|woff|woff2|gif)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 100000,
                        publicPath: './',
                        outputPath: 'static/',
                        name: '[name].[ext]'
                    }
                }
            });

            config.plugins = [
                ...config.plugins,

                // Read the .env file
                new Dotenv({
                    path: path.join(__dirname, '.env'),
                    systemvars: true
                })
            ];

            return config
        }

}
);