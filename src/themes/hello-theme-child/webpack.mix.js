let mix = require('laravel-mix');
// your Wordpress theme name here
var themename = "hello-theme-child";
const themePath = './';
const resources = themePath + '/src';
mix.setPublicPath(`${themePath}/assets`);

if(!mix.inProduction()) {
  mix.sass(`${resources}/scss/theme.scss`, `${themePath}/assets/css`).sourceMaps();
  mix.js(`${resources}/js/theme.js`, `${themePath}/assets/js`)
} else {
  mix.sass(`${resources}/scss/theme.scss`, `${themePath}/assets/css/theme.min.css`).sourceMaps();
  mix.js(`${resources}/js/theme.js`, `${themePath}/assets/js/theme.min.js`)
}

//mix.browserSync('https://mywebsite.test');