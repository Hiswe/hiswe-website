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

- **3.4.3** — Async load of projects content 
- **3.4.2** — Static page for projects + direct link to originals
- **3.4.1** — Lazy load of projects cover 
- **3.4.0** — Assets on a CDN
- **3.3.0** — Add carrousel
- **3.0.0** — Revamp
- **2.0.3** — rc conf manager
- **2.0.2** — Gulp build system
- **2.0.1** — Update content
- **2.0.0** — Complete retake

### TODO


1.
  - Responsive top menu
  - Change icons to SVG (see [CSS-trick](http://css-tricks.com/icon-fonts-vs-svg/))
- Update Content
- Add a robot.txt
- Replace matrix by [matrix3d](http://9elements.com/html5demos/matrix3d/)
- Retina images
- Responsive images 
- [coffeelint](https://www.npmjs.org/package/gulp-coffeelint/)
- See if some performance improvement can be made with [pointer events](http://www.thecssninja.com/javascript/pointer-events-60fps)
- Images build may be improved with [gulp-streamify](https://github.com/nfroidure/gulp-streamify)
- JS front lib in requireJs
- No change of page for contact
- Are improvements can be made with [velocity](http://julian.com/research/velocity/) ?

### Inspiration

- icons use from [css-tricks](http://css-tricks.com/svg-sprites-use-better-icon-fonts/)
- social icons from [perfecticons.com](http://perfecticons.com/)
- [polygon](http://www.polygon.com/2014/4/7/5582644/mlb-14-the-show-review)
- [medium](https://medium.com/gulp-js-build/23812e4c9ec1)