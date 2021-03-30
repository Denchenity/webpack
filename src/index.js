import * as $ from 'jquery'

import Post from '@models/post'

import json from './assets/json'

import xml from './assets/data.xml'

import csv from './assets/data.csv'

import WebpackLogo from './assets/webpack-logo.png'

import './styles/styles.css'

import './styles/less.less'

import './styles/scss.scss'

import './babel'

const post = new Post('Webpack POST TITLE', WebpackLogo);


$('pre').html(post.ToString())

console.log('post to string:', post.ToString());

console.log('Json:', json)

console.log('Xml:', xml)

console.log('CSV:', csv)

