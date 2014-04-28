# Hiswe web site

### Purpose

Design a portfolio for myself

### launch

##### On development environment
- npm install & bower install
- gulp start

##### On Heroku environment
- gulp build
- git commit + git push
- git push heroku master
- heroku plugins:install git://github.com/ddollar/heroku-config.git
- heroku config:set NODE_ENV=production
- …

### Release History

- **3.4.1** — Lazy load of projects cover 
- **3.4.0** — Assets on a CDN
- **3.3.0** — Add carrousel
- **3.0.0** — Revamp
- **2.0.3** — rc conf manager
- **2.0.2** — Gulp build system
- **2.0.1** — Update content
- **2.0.0** — Complete retake

### TODO

1. Static page for projects
- Responsive Website
- Retina images
- Replace matrix by [matrix3d](http://9elements.com/html5demos/matrix3d/)
- Routing can be improved with [express-resource](https://www.npmjs.org/package/express-resource)
- [coffeelint](https://www.npmjs.org/package/gulp-coffeelint/)
- Images build may be improved with [gulp-streamify](https://github.com/nfroidure/gulp-streamify)
- JS front lib in requireJs
- See if some performance improvement can be made with [pointer events](http://www.thecssninja.com/javascript/pointer-events-60fps)

### Ispiration

- [polygon](http://www.polygon.com/2014/4/7/5582644/mlb-14-the-show-review)
- [medium](https://medium.com/gulp-js-build/23812e4c9ec1)