var path = require('path');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/Openmct3dModelViewerPlugin',
    output: {
        filename: "openmct-3d-model-viewer.js",
        path: path.resolve(__dirname, "dist"),
        library: "Openmct3dModelViewerPlugin",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            }
        ]
    },
    devtool: "source-map",
    plugins: [
        new UglifyJsPlugin({ sourceMap: true })
    ]
};
