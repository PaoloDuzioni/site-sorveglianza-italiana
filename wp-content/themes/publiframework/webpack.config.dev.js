const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'assets'),
    entry: {
        main: ['./src/index.js', './src/index.scss'],
        editor: './src/editor.js',
        style_login: './src/scss/admin/style-login.scss',
        style_admin: './src/scss/admin/style-admin.scss',
        style_buttons: './src/scss/admin/style-buttons.scss',
    },
    output: {
        path: path.resolve(__dirname, 'assets/dist'),
        filename: 'js/[name].js',
        assetModuleFilename: 'css/[name][ext]',
    },
    devtool: 'source-map',
    watch: true,
    module: {
        rules: [
            {
                test: /\.(s[ac]ss|css)$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            url: false,
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[name].css',
            chunkFilename: '[id].css',
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                path.resolve(__dirname, 'assets/dist/js/*'),
                path.resolve(__dirname, 'assets/dist/css/*'),
            ],
            dangerouslyAllowCleanPatternsOutsideProject: true,
            dry: false,
        }),
        new BrowserSyncPlugin(
            {
                proxy: 'https://localhost/site-sorverglianza-italia',
                notify: true,
                open: false,
                // Reloads the browser when PHP files change.
                files: [
                    './assets/dist/css/*.css',
                    './assets/dist/js/*.js',
                    '**/*.php',
                    '**/*.twig',
                ],
            },
            // plugin options
            {},
        ),
    ],
    optimization: {
        minimizer: [new CssMinimizerPlugin()],
        minimize: true,
    },
};
