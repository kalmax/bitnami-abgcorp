let mix = require('laravel-mix');
// your Wordpress theme name here
var themename = "hello-theme-child";
const themePath = './';
const resources = themePath + '/src';
mix.setPublicPath(`${themePath}/assets`);


if(!mix.inProduction()) {
  mix.sass(`${resources}/scss/theme.scss`, `${themePath}/assets/css`).sourceMaps();
  mix.scripts([
    `${resources}/js/animations-global.js`,
    `${resources}/js/theme.js`,
    `${resources}/js/header-scroll.js`,
    `${resources}/js/home.js`,
    `${resources}/js/esg.js`,
    `${resources}/js/esg-diversity.js`,
  ], 
    `${themePath}/assets/js/theme.js`
  )
} else {
  mix.sass(`${resources}/scss/theme.scss`, `${themePath}/assets/css/theme.min.css`).sourceMaps();
  mix.scripts([
    `${resources}/js/animations-global.js`,
    `${resources}/js/theme.js`,
    `${resources}/js/header-scroll.js`,
    `${resources}/js/home.js`,
    `${resources}/js/esg.js`,
    `${resources}/js/esg-diversity.js`,
  ], 
    `${themePath}/assets/js/theme.min.js`
  )
}

//mix.browserSync('https://mywebsite.test');