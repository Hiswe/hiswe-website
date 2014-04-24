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

- **2.0.3** — rc conf manager
- **2.0.2** — Gulp build system
- **2.0.1** — Update content
- **2.0.0** — Complete retake

### TODO

- Amazon s3 static files with:
  - [amazon s3](http://aws.amazon.com/fr/s3/)
  - [AWS JS SDJ](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-intro.html)
  - [gulp-awspublish](https://www.npmjs.org/package/gulp-awspublish)
  - [Static routing](http://stackoverflow.com/questions/17516820/serving-files-stored-in-s3-in-express-nodejs-app)

- replace matrix by [matrix3d](http://9elements.com/html5demos/matrix3d/)
- Retina images
- Responsive images
- See if some performance improvement can be made with [pointer events](http://www.thecssninja.com/javascript/pointer-events-60fps)
- [coffeelint](https://www.npmjs.org/package/gulp-coffeelint/)
- JS front lib in requireJs
- Routeing can be improved with [express-resource](https://www.npmjs.org/package/express-resource)

### Ispiration

- [polygon](http://www.polygon.com/2014/4/7/5582644/mlb-14-the-show-review)
- [medium](https://medium.com/gulp-js-build/23812e4c9ec1)