const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
//const CheckerPlugin = require('ts-loader').CheckerPlugin;

module.exports = (env) => {
    // Configuration in common to both client-side and server-side bundles
    const isDevBuild = !(env && env.prod);
    const sharedConfig = {
        stats: { modules: false },
        context: __dirname,
        resolve: {
            extensions: ['.js', '.ts', '.d.ts'],
            //modules: [path.resolve(path.join(__dirname, 'node_modules'))],
            symlinks: false
        },
        resolveLoader: {
            //modules: [path.resolve(path.join(__dirname, 'node_modules'))],
            symlinks: false
        },
        output: {
            path: path.resolve(__dirname, 'wwroot/dist'),
            filename: '[name].js',
            publicPath: '/dist/' // Webpack dev middleware, if enabled, handles requests for this URL prefix
        },
        module: {
            rules: [
                { test: /\.ts|\d.ts$/, use: ['ts-loader?silent=true'] },
                { test: /\.html$/, use: 'html-loader?minimize=false' },
                { test: /\.css$/, use: [ 'to-string-loader', isDevBuild ? 'css-loader' : 'css-loader?minimize' ] },
                { test: /\.(png|jpg|jpeg|gif|svg)$/, use: 'url-loader?limit=25000' }
            ]
        },
        plugins: [
//            new CheckerPlugin(),
            new webpack.DefinePlugin({
                DEV: JSON.stringify(isDevBuild)
            })]
    };

    // Configuration for client-side bundle suitable for running in browsers
    const clientBundleOutputDir = './wwwroot/dist';
    const clientBundleConfig = merge(sharedConfig, {
        entry: { 'main': ['whatwg-fetch', './src/app.ts'] },
        output: { path: path.join(__dirname, clientBundleOutputDir) },
        plugins: isDevBuild ? [
            // Plugins that apply in development builds only
            new webpack.SourceMapDevToolPlugin({
                filename: '[file].map', // Remove this line if you prefer inline source maps
                moduleFilenameTemplate: path.relative(clientBundleOutputDir, '[resourcePath]') // Point sourcemap entries to the original file locations on disk
            })
        ] : [
            // Plugins that apply in production builds only
            new webpack.optimize.UglifyJsPlugin()
        ]
    });

    return clientBundleConfig;
};