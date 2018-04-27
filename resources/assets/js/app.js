
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */
const Vue = require('vue');
const axios = require('axios');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

const spotifyKey = 'BQBuvOivp0Cmswf-_pPl0dsKLTwkVkI3v6T9IXN8UfBwkpFLqTWRgg6sWjhuKAbA_FtFjjEsS4hsQIGlQFEFX7aCpIm25M5tgjsUyHcW-d_6PRGXxgJsw6NNAp7uiEAYOnHmXAWEfQIrApCnLa71Hab2fNYt-XK_YO8DpgeXUiWT1pYPDSxPgIab5kAPnEypQx9TGtAszDwsoi7Kk5uyJGhevHDNV9DigHuphpPnnkAgNfCT9IAoNFrQ5xqZy-iKFnStw2jMX9Ay1xsr5KzEcvpKmRg';
const spotifyHttp = axios.create({
  baseURL: 'https://api.spotify.com/v1/',
  headers: {
    Authorization: `Bearer ${spotifyKey}`,
  },
});

Vue.prototype.$http = axios;
Vue.prototype.$spotifyHttp = spotifyHttp;

Vue.component('example-component', require('./components/ExampleComponent.vue'));

const app = new Vue({
  el: '#app',
  template: `
    <example-component />
  `,
});
