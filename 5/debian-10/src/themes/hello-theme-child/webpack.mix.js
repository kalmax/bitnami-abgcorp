let mix = require('laravel-mix');
// your Wordpress theme name here
var themename = "hello-theme-child";
const themePath = './';
const resources = themePath + '/src';
mix.setPublicPath(`${themePath}/assets`);

mix.sass(`${resources}/scss/theme.scss`, `${themePath}/assets/css`).sourceMaps();
mix.js(`${resources}/js/theme.js`, `${themePath}/assets/js`)

//mix.browserSync('https://mywebsite.test');