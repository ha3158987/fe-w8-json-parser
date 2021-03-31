const path = require('path');

//여기도 추가
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: "development",
    entry: ['./src/app.js', './src/index.css' ],
    output: {
        path: path.resolve(__dirname, "public"),
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }, 
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            }
            ,
        ]
    },
    plugins: [new HtmlWebpackPlugin(
        {
            template: 'src/app.html'
        }
        
    )]
}