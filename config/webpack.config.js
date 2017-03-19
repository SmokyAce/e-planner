const webpack = require('webpack');
const cssnano = require('cssnano');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OfflinePlugin = require('offline-plugin');
const project = require('./project.config');
const debug = require('debug')('app:config:webpack');

const __DEV__ = project.globals.__DEV__;
const __PROD__ = project.globals.__PROD__;
const __TEST__ = project.globals.__TEST__;

debug('Creating configuration.');
const webpackConfig = {
    name   : 'client',
    target : 'web',
    devtool: project.compiler_devtool,
    resolve: {
        modules   : [project.paths.client(), 'node_modules'],
        extensions: ['.js', '.jsx', '.json']
    },
    module     : {},
    performance: { hints: false }
};
// ------------------------------------
// Entry Points
// ------------------------------------
const APP_ENTRY = project.paths.client('main.js');

webpackConfig.entry = {
    app: __DEV__
        ? [APP_ENTRY].concat(`webpack-hot-middleware/client?path=${project.compiler_public_path}__webpack_hmr`)
        : [APP_ENTRY],
    vendor: project.compiler_vendors
};

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
    filename     : `[name].[${project.compiler_hash_type}].js`,
    chunkFilename: `[name].[${project.compiler_hash_type}].chunk.js`,
    path         : project.paths.dist(),
    publicPath   : project.compiler_public_path
};

// ------------------------------------
// Externals
// ------------------------------------
webpackConfig.externals = [
    'react/lib/ExecutionEnvironment',
    'react/lib/ReactContext',
    'react/addons'
];

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
    new webpack.DefinePlugin(project.globals),
    new webpack.LoaderOptionsPlugin({
        options: {
            context: '/',
            postcss: [
                cssnano({
                    autoprefixer: {
                        add     : true,
                        remove  : true,
                        browsers: ['last 2 versions']
                    },

                    discardComments: {
                        removeAll: true
                    },

                    discardUnused: false,
                    mergeIdents  : false,
                    reduceIdents : false,
                    safe         : true,
                    sourcemap    : true
                })
            ],
            sassLoader: {
                includePaths: project.paths.client('styles')
            }
        }
    }),
    new HtmlWebpackPlugin({
        template: project.paths.client('index.html'),
        hash    : false,
        favicon : project.paths.public('favicon.ico'),
        filename: 'index.html',
        inject  : 'body',

        minify: {
            collapseWhitespace: false
        }
    }),
    // Put it in the end to capture all the HtmlWebpackPlugin's
    // assets manipulations and do leak its manipulations to HtmlWebpackPlugin
    new OfflinePlugin({
        relativePaths: false,
        publicPath   : '/',

        // No need to cache .htaccess. See http://mxs.is/googmp,
        // this is applied before any match in `caches` section
        excludes: ['.htaccess'],

        caches: {
            main: [':rest:'],

            // All chunks marked as `additional`, loaded after main section
            // and do not prevent SW to install. Change to `optional` if
            // do not want them to be preloaded at all (cached only when first loaded)
            additional: ['*.chunk.js']
        },

        // Removes warning for about `additional` section usage
        safeToUseOptionalCaches: true,

        AppCache: false
    })
];

// Ensure that the compiler exits on errors during testing so that
// they do not get skipped and misreported.
/*
 if (__TEST__ && !argv.watch) {
 webpackConfig.plugins.push(function () {
 this.plugin('done', function (stats) {
 if (stats.compilation.errors.length) {
 // Pretend no assets were generated. This prevents the tests
 // from running making it clear that there were warnings.
 throw new Error(
 stats.compilation.errors.map(err => err.message || err)
 )
 }
 })
 })
 }
 */

if (__DEV__) {
    debug('Enabling plugins for live development (HMR, NoErrors).');
    webpackConfig.plugins.push(
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    );
} else if (__PROD__) {
    debug('Enable plugins for production (OccurenceOrder, UglifyJS).');
    webpackConfig.plugins.push(
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused   : true,
                dead_code: true,
                warnings : false
            }
        })
    );
}

// Don't split bundles during testing, since we only want import one bundle
if (!__TEST__) {
    webpackConfig.plugins.push(
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        })
    );
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.rules = [
    {
        test   : /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query  : project.compiler_babel
    },
    {
        test  : /\.json$/,
        loader: 'json-loader'
    }
];

// ------------------------------------
// Style Loaders
// ------------------------------------
// We use cssnano with the postcss loader, so we tell
// css-loader not to duplicate minimization.
const BASE_CSS_LOADER = 'css-loader?sourceMap&-minimize';

webpackConfig.module.rules.push({
    test: /\.scss$/,
    use : ['style-loader', BASE_CSS_LOADER, 'postcss-loader',
        { loader: 'sass-loader?sourceMap' }]
});
webpackConfig.module.rules.push({
    test: /\.css$/,
    use : ['style-loader', BASE_CSS_LOADER, 'postcss-loader']
});

// File loaders
/* eslint-disable */
webpackConfig.module.rules.push(
    {
        test  : /\.woff(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff'
    }, {
        test  : /\.woff2(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2'
    }, {
        test  : /\.otf(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype'
    }, {
        test  : /\.ttf(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream'
    }, {
        test: /\.eot(\?.*)?$/,
        loader: 'file-loader?prefix=fonts/&name=[path][name].[ext]'
    }, {
        test  : /\.svg(\?.*)?$/,
        loader: 'url-loader?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml'
    }, {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader?limit=8192'
    }
/*    { test: /\.gif$/, loader: "url-loader?limit=10000&mimetype=image/gif" },
    { test: /\.jpg$/, loader: "url-loader?limit=10000&mimetype=image/jpg" }*/

);
/* eslint-enable */

// ------------------------------------
// Finalize Configuration
// ------------------------------------
// when we don't know the public path (we know it only when HMR is enabled [in development]) we
// need to use the extractTextPlugin to fix this issue:
// http://stackoverflow.com/questions/34133808/webpack-ots-parsing-error-loading-fonts/34133809#34133809

if (!__DEV__) {
    debug('Applying ExtractTextPlugin to CSS loaders.');
    webpackConfig.module.rules.filter((loader) =>
        loader.loaders && loader.loaders.find((name) => /css/.test(name.split('?')[0]))
    ).forEach((loader) => {
        const first = loader.loaders[0];
        const rest = loader.loaders.slice(1);

        loader.loader = ExtractTextPlugin.extract(first, rest.join('!'));
        delete loader.loaders;
    });

    webpackConfig.plugins.push(
        new ExtractTextPlugin({ filename: '[name].bundle.css', disable: false, allChunks: true })
    );
}

module.exports = webpackConfig;
