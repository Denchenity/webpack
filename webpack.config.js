const path = require('path')// встроенные модуль в node js, позволяет комфортно работать с путями на нашей платформе
const HTMLWebpackPlugin = require('html-webpack-plugin') // подключаем плагин html-webpack-plugin
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // Подключаем плагин для очистки папки dist
const CopyWebpackPlugin = require('copy-webpack-plugin')// Подключаем плагин для копирования
const MiniCssExtractPlugin = require('mini-css-extract-plugin')// Подключаем плагин для css
const TerserWebpackPlugin = require('terser-webpack-plugin') // минификация js 
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin') // минификация css
const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer')
const { userInfo } = require('os')

const isDev = process.env.NODE_ENV === 'development';
const IsProd = !isDev;

const optimization = ()=>{
    const config = {
        splitChunks: {
            chunks: 'all'
        }
    }
    if(IsProd){
        config.minimizer = [
            new OptimizeCssAssetsWebpackPlugin(),
            new TerserWebpackPlugin(),
        ]
    }
    return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`


const cssLoaders = extra => {
    const loaders = [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                
            },
        },
        'css-loader'
    ]

    if(extra){
        loaders.push(extra)
    }
    return loaders;
}

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ],
        plugins:[
            '@babel/plugin-proposal-class-properties'
        ]
    }
    if(preset){
        opts.presets.push(preset)
    }

    return opts
} 

const jsLoaders = () => {
    const loaders = [{
        loader: 'babel-loader',
        options: babelOptions(),
    }]

    if(isDev){
        loaders.push('eslint-loader')
    }
    return loaders
}

const plugins = () =>{
    const base = [
        new HTMLWebpackPlugin({
            template: './index.html',
            minify:{
                collapseWhitespace: IsProd,
            }
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                  from: path.resolve(__dirname,'src/favicon.ico'),
                  to: path.resolve(__dirname,'dist'),  
                },
            ],
        }),
        new MiniCssExtractPlugin({
                filename: filename('css'),
        }),
    ]
    if(IsProd){
        base.push(new BundleAnalyzerPlugin())
    }
    return base
}


module.exports = {
    context: path.resolve(__dirname, 'src'),
    mode: 'development',
    entry:{
        main: ['@babel/polyfill','./index.jsx'],
        analitics: './analitics.ts'
      },
    output: { // результат работы вебпака 
        filename: filename('js'),
        path: path.resolve(__dirname, 'dist') //__dirname - cистемная переменная, тут мы все складваем в папку dist
    },
    plugins: plugins(),
    resolve:{
        extensions: ['.js','.json','.png'],
        alias: {
            '@models': path.resolve(__dirname, 'src/models'),
            '@': path.resolve(__dirname, 'src')
        }
    },
    devtool: isDev ? `source-map` : false,
    devServer:{
        port: 4200
    },
    optimization: optimization(),
   
    module:{
        rules:[
            {
                test: /\.css$/,
                use: cssLoaders(),
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                use: ['file-loader']
            },
            {
                test: /\.(ttf|woff|woff2|eot)$/,
                use:['file-loader']
            },
            {
                test: /\.xml$/,
                use:['xml-loader']
            },
            {
                test: /\.csv$/,
                use:['csv-loader']
            },
            {
                test: /\.less$/,
                use: cssLoaders('less-loader'),
            },
            {
                test: /\.s[ac]ss$/,
                use: cssLoaders('sass-loader'),
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: jsLoaders(),
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:babelOptions('@babel/preset-typescript'), 
                }
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options:babelOptions('@babel/preset-react'), 
                }
            },
        ]
    }
}
