require('source-map-support/register')
module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const rc = __webpack_require__(15);

const pkg = __webpack_require__(2);

const config = rc(`hiswe`, {
  email: {
    transport: {
      host: `localhost`,
      port: 1025,
      // Maildev config for Nodemailer
      // • https://danfarrelly.nyc/MailDev/#configure
      ignoreTLS: true
    },
    options: {
      from: `Mr contact dev <contact@hiswe.pouic>`
    }
  }
});

config.VERSION = pkg.version;

config.HOST = config.HOST || process.env.HOST || `127.0.0.1`;
config.PORT = config.PORT || process.env.PORT || 3000;

config.NODE_ENV = config.NODE_ENV || "production" || `development`;
config.isDev = config.NODE_ENV === `development`;
config.isProd = config.NODE_ENV === `production`;

module.exports = config;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = {"name":"hiswe-website","author":"Yannick “Hiswe” Aïvayan <yannick.aivayan@hiswe.net>","description":"hiswe's personnal website","homepage":"https://hiswe.net/","version":"4.0.0","license":"MIT","scripts":{"build":"yarn build:svg && yarn build:app","build:app":"nuxt build && backpack build","build:svg":"gulp build:svg","dev":"maildev & backpack dev","serve:mail":"maildev","serve:prod":"yarn build && cross-env NODE_ENV=production node build/main.js","start":"node build/main.js","toc":"doctoc README.md --github","release":"node ./bin/release.js"},"repository":{"type":"git","url":"git://github.com/Hiswe/hiswe-website"},"engines":{"node":"8.11.3"},"dependencies":{"@sindresorhus/slugify":"^0.3.0","axios":"^0.18.0","chalk":"^2.4.1","cheerio":"^1.0.0-rc.2","form-serialize":"^0.7.2","fs-extra":"^7.0.0","koa":"^2.5.2","koa-body":"^4.0.4","koa-compress":"^3.0.0","koa-helmet":"^4.0.0","koa-json":"^2.0.2","koa-logger":"^3.2.0","koa-router":"^7.4.0","koa-session":"^5.8.2","lodash":"^4.17.10","nodemailer":"^4.6.7","nuxt":"^1.4.2","nuxt-sass-resources-loader":"^2.0.3","pug":"^2.0.3","pug-plain-loader":"^1.0.0","rc":"~1.2.8","shortid":"^2.2.12","source-map-support":"^0.5.6","validator":"^10.5.0","vue-axios":"^2.1.3","xml2js":"^0.4.19"},"devDependencies":{"babel-plugin-transform-object-rest-spread":"^6.26.0","backpack-core":"^0.7.0","consolidate":"^0.15.1","cross-env":"^5.2.0","del":"^3.0.0","doctoc":"^1.3.1","gulp":"^4.0.0","gulp-bump":"^3.1.1","gulp-cached":"^1.1.1","gulp-cheerio":"^0.6.3","gulp-doctoc":"^0.1.4","gulp-if":"^2.0.2","gulp-image-resize":"~0.x.x","gulp-load-plugins":"^1.5.0","gulp-plumber":"^1.2.0","gulp-postcss":"^7.0.1","gulp-rename":"^1.4.0","gulp-rev":"^8.1.1","gulp-sass":"^4.0.1","gulp-sourcemaps":"^2.6.4","gulp-streamify":"1.0.2","gulp-svg-symbols":"^3.2.0","gulp-svgmin":"^1.2.4","gulp-uglify":"~3.0.1","image-size":"^0.6.3","inquirer":"^6.0.0","maildev":"^1.0.0-rc3","marked":"^0.4.0","node-sass":"^4.9.2","sass-loader":"^7.1.0","shelljs":"^0.8.2","svgo":"^1.0.5","yargs":"^12.0.1"}}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_util___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_util__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mailing__ = __webpack_require__(16);






//----- MAILING CONNECTION

const mailingReady = new Promise((resolve, reject) => {
  __WEBPACK_IMPORTED_MODULE_3__mailing__["a" /* default */].verify().then(() => {
    console.log(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.green(`[MAILING]`), `transport creation – SUCCESS`);
    resolve();
  }).catch(error => {
    console.log(__WEBPACK_IMPORTED_MODULE_1_chalk___default.a.red(`[MAILING]`, `transport creation – ERROR`));
    console.log(__WEBPACK_IMPORTED_MODULE_0_util___default.a.inspect(error, { colors: true }));
    console.log(`original config`);
    console.log(__WEBPACK_IMPORTED_MODULE_2__config___default.a.email);
    reject(`[MAILING] connection failed`);
  });
});

//----- CHECKS

const servicesReady = Promise.all([mailingReady]);
/* harmony export (immutable) */ __webpack_exports__["b"] = servicesReady;


const sendMail = __WEBPACK_IMPORTED_MODULE_3__mailing__["a" /* default */].sendMail.bind(__WEBPACK_IMPORTED_MODULE_3__mailing__["a" /* default */]);
/* harmony export (immutable) */ __webpack_exports__["a"] = sendMail;


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("util");

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_koa___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_koa__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_helmet__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_koa_helmet___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_koa_helmet__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_compress__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_koa_compress___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_koa_compress__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_logger__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_koa_logger___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_koa_logger__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_json__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_koa_json___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_koa_json__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa_router__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_koa_router___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_koa_router__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_koa_body__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_koa_body___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_koa_body__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_koa_session__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_koa_session___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_koa_session__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nuxt__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_nuxt___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_nuxt__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__services__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__latest_blog_post__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__latest_blog_post___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12__latest_blog_post__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__send_contact_mail__ = __webpack_require__(23);
















async function start() {
  //////
  // SERVER CONFIG
  //////

  const app = new __WEBPACK_IMPORTED_MODULE_1_koa___default.a();

  // for signed cookies
  app.keys = [`e05fa6f6e4c078ad997ec324e6d69f59829b2e2237c5e1d9e3610fea291793f4`, `64241b9838c5d0d5f94f7e83c71d83af4674f8c84e406a138263a8803a3b1e6f`];

  app.use(__WEBPACK_IMPORTED_MODULE_2_koa_helmet___default()());
  app.use(__WEBPACK_IMPORTED_MODULE_3_koa_compress___default()());
  app.use(__WEBPACK_IMPORTED_MODULE_4_koa_logger___default()());
  app.use(__WEBPACK_IMPORTED_MODULE_5_koa_json___default()());
  app.use(__WEBPACK_IMPORTED_MODULE_8_koa_session___default()({
    key: 'hiswe-website'
  }, app));

  //----- ERROR HANDLING

  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      console.log(util.inspect(err, { colors: true }));
      ctx.status = err.statusCode || err.status || 500;
      ctx.body = ctx.render(`error`, {
        code: ctx.status,
        reason: err.message,
        stacktrace: err.stacktrace || err.stack || false
      });
    }
  });

  //////
  // API ROUTING
  //////

  //----- API

  const router = new __WEBPACK_IMPORTED_MODULE_6_koa_router___default.a({ prefix: `/api` });

  router.get(`/latest-blog-post`, async ctx => {
    const blogEntries = await __WEBPACK_IMPORTED_MODULE_12__latest_blog_post___default()();
    ctx.body = blogEntries;
  });

  router.post(`/contact`, __WEBPACK_IMPORTED_MODULE_7_koa_body___default()(), async ctx => {
    const state = await Object(__WEBPACK_IMPORTED_MODULE_13__send_contact_mail__["a" /* default */])(ctx.request.body);
    const isJSON = ctx.request.type === `application/json`;
    if (isJSON) return ctx.body = state;
    ctx.session = state;
    ctx.redirect(`/`);
  });

  //----- MOUNT ROUTER TO APPLICATION

  app.use(router.routes());
  app.use(router.allowedMethods());

  //////
  // NUXT
  //////

  // Import and Set Nuxt.js options
  const nuxtConfig = __webpack_require__(26);
  nuxtConfig.dev = __WEBPACK_IMPORTED_MODULE_10__config___default.a.isDev;

  // Instantiate nuxt.js
  const nuxt = new __WEBPACK_IMPORTED_MODULE_9_nuxt__["Nuxt"](nuxtConfig);

  // Build in development
  if (__WEBPACK_IMPORTED_MODULE_10__config___default.a.isDev) {
    const builder = new __WEBPACK_IMPORTED_MODULE_9_nuxt__["Builder"](nuxt);
    await builder.build();
  }

  // Nuxt middleware
  // • take a different take from the one in examples
  //   to fix the error “Error: Can’t set headers after they are sent”
  // • see this ticket:
  //   https://github.com/nuxt/nuxt.js/issues/1206#issuecomment-319271260
  //   https://github.com/nuxt-community/koa-template/pull/39/commits/f478d18dcd613490da8271193bb2f16199360f8c
  app.use(function nuxtMiddleware(ctx) {
    ctx.status = 200;
    ctx.respond = false; // Mark request as handled for Koa
    // useful for nuxtServerInit
    ctx.req.session = ctx.session;
    // make session act like flash messages
    ctx.session = {};
    nuxt.render(ctx.req, ctx.res);
  });

  //////
  // LAUNCHING
  //////

  try {
    await __WEBPACK_IMPORTED_MODULE_11__services__["b" /* servicesReady */];
    app.listen(__WEBPACK_IMPORTED_MODULE_10__config___default.a.PORT, __WEBPACK_IMPORTED_MODULE_10__config___default.a.HOST, function endInit() {
      console.log(`APP Server is listening on`, __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.cyan(`${__WEBPACK_IMPORTED_MODULE_10__config___default.a.HOST}:${__WEBPACK_IMPORTED_MODULE_10__config___default.a.PORT}`), `on mode`, __WEBPACK_IMPORTED_MODULE_0_chalk___default.a.cyan(__WEBPACK_IMPORTED_MODULE_10__config___default.a.NODE_ENV));
    });
  } catch (error) {
    console.log(__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.red(`[APP] not launched – needed services errored`));
    console.log(error);
  }
}

start();

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = require("koa");

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = require("koa-helmet");

/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("koa-compress");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("koa-logger");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("koa-json");

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = require("koa-router");

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("koa-body");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("koa-session");

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports = require("nuxt");

/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("rc");

/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nodemailer__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_nodemailer___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_nodemailer__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__config__);




const { transport, provider } = __WEBPACK_IMPORTED_MODULE_1__config___default.a.email;
const usedTransport = provider ? provider : transport;
const transporter = __WEBPACK_IMPORTED_MODULE_0_nodemailer___default.a.createTransport(usedTransport);

/* harmony default export */ __webpack_exports__["a"] = (transporter);

/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("nodemailer");

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const util = __webpack_require__(4);
const axios = __webpack_require__(19);
const _ = __webpack_require__(20);
const xml2js = __webpack_require__(21);
const cheerio = __webpack_require__(22);

const parseXml = util.promisify(xml2js.parseString);

function cleanSummary(summary) {
  const $ = cheerio.load(summary);
  $(`h2`).remove();
  $(`a`).each((index, element) => {
    const $link = $(element);
    const content = $link.html();
    $link.replaceWith(`<span>${content}</span>`);
  });
  return $(`body`).html().trim();
}

module.exports = async function getLatestBlogPost() {
  const atomResponse = await axios.get(`https://hiswe.github.io/atom.xml`);
  if (!atomResponse.status === 200) return ctx.body = [{}];

  const atomJS = await parseXml(atomResponse.data);
  const blogEntries = _.get(atomJS, `feed.entry`);
  if (!Array.isArray(blogEntries)) return ctx.body = [{}];

  return blogEntries.map(post => {
    const link = _.get(post, `link[0].$.href`);
    const summary = _.get(post, `summary[0]._`);
    return {
      title: _.get(post, `title[0]`),
      link: link,
      cover: `${link}cover.png`,
      published: _.get(post, `published[0]`),
      summary: cleanSummary(summary)
    };
  });
};

/***/ }),
/* 19 */
/***/ (function(module, exports) {

module.exports = require("axios");

/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = require("lodash");

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = require("xml2js");

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports = require("cheerio");

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_chalk___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_chalk__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_validator_lib_isEmail__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_validator_lib_isEmail___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_validator_lib_isEmail__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_validator_lib_isEmpty__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_validator_lib_isEmpty___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_validator_lib_isEmpty__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__config___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3__config__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__services__ = __webpack_require__(3);







const PREFIX = `[MAIL]`;

async function contactMail(formData) {
  const { email, message } = formData;

  const validation = {
    email: {
      valid: __WEBPACK_IMPORTED_MODULE_1_validator_lib_isEmail___default()(email),
      value: email
    },
    message: {
      valid: !__WEBPACK_IMPORTED_MODULE_2_validator_lib_isEmpty___default()(message),
      value: message
    }
  };
  const hasError = Object.values(validation).map(field => field.valid).includes(false);
  if (hasError) {
    console.log(__WEBPACK_IMPORTED_MODULE_0_chalk___default.a.red(PREFIX), `validation error`);
    return {
      validation,
      notification: {
        content: `you need to fill the form`,
        type: `error`
      }
    };
  }
  try {
    await Object(__WEBPACK_IMPORTED_MODULE_4__services__["a" /* sendMail */])({
      from: __WEBPACK_IMPORTED_MODULE_3__config___default.a.email.options.from,
      to: __WEBPACK_IMPORTED_MODULE_3__config___default.a.email.options.from,
      replyTo: email,
      text: message
    });
  } catch (error) {
    return {
      validation,
      notification: {
        content: `an error as occurred while sending the mail. Please try again`,
        type: `error`
      }
    };
  }
  return {
    validation,
    notification: { content: `message send`, type: `info` }
  };
}

/* harmony default export */ __webpack_exports__["a"] = (contactMail);

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = require("validator/lib/isEmail");

/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = require("validator/lib/isEmpty");

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

const pkg = __webpack_require__(2);

const NAME = `hiswe website`;

module.exports = {
  router: {
    middleware: `reset-form`
  },
  head: {
    titleTemplate: 'Hiswe – %s',
    meta: [{ charset: `utf-8` }, { name: `viewport`, content: `width=device-width, initial-scale=1` }, { 'http-equiv': `X-UA-Compatible`, content: `IE=edge` }, { hid: `author`, name: `author`, content: pkg.author }, { hid: `description`, name: `description`, content: pkg.description },
    // open graph
    { hid: `og:title`, name: `og:title`, content: NAME }, { hid: `og:type`, name: `og:type`, content: `website` }, {
      hid: `og:description`,
      name: `og:description`,
      content: pkg.description
    }, { hid: `og:url`, name: `og:url`, content: pkg.homepage },
    // twitter
    { hid: `twitter:card`, name: `twitter:card`, content: `summary` }, { hid: `twitter:site`, name: `twitter:site`, content: `@hiswehalya` }, {
      hid: `twitter:creator`,
      name: `twitter:creator`,
      content: `@hiswehalya`
    }],
    link: [{ rel: `icon`, type: `image/png`, href: `/favicon.png` }]
  },
  loading: {
    color: `hsl(332, 100%, 50%)`,
    height: `5px`
  },
  css: [`@/nuxt-assets/css/global.scss`, `@/nuxt-assets/css/page-transitions.scss`],
  // inject scss files in every module
  // • https://github.com/anteriovieira/nuxt-sass-resources-loader
  // • https://hackernoon.com/how-i-use-scss-variables-mixins-functions-globally-in-nuxt-js-projects-while-compiling-css-utilit-58bb6ff30438
  modules: [[`nuxt-sass-resources-loader`, [`@/nuxt-assets/css/scss-vars.scss`, `@/nuxt-assets/css/scss-mixin.scss`]]],
  plugins: [`@/nuxt-plugins/global-components.js`, { src: `@/nuxt-plugins/browser.js`, ssr: false }],
  build: {
    babel: {
      plugins: [`transform-object-rest-spread`]
    },
    postcss: {
      plugins: {
        'postcss-cssnext': {
          features: {
            // processing custom properties make them fail
            customProperties: false
          }
        }
      }
    }
  }
};

/***/ })
/******/ ]);
//# sourceMappingURL=main.map