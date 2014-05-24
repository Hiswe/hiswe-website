# Hiswe web site

## Purpose

Design a portfolio for myself

## launch

##### Requirements

- [node](http://nodejs.org/download/)
- [heroku toolbelt](https://toolbelt.heroku.com/)
- [heroku config](https://github.com/ddollar/heroku-config)
- ```npm install -g gulp bower && npm install && bower install```


##### On development environment

```
gulp server
```

##### On Heroku environment

```
gulp build
git commit + git push
git push heroku master
heroku config:set hiswe_KEY=value --app APPNAME
```

## Release History

- **3.5.0**
   - *JS* and *CSS* on AWS
   - Express 4
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

## Roadmap

1. **version 3.6** *aka* “clean front”
   - JS front lib in requireJs
      - As jQuery mobile can't be require maybe look at [jquery.hammer.js](https://github.com/EightMedia/jquery.hammer.js)
      - for imagesloaded look at this [issue](https://github.com/desandro/imagesloaded/issues/119)
   - [coffeelint](https://www.npmjs.org/package/gulp-coffeelint/)
- **version 3.7** *aka* “you can (not) send mail”
   - Change mail provider as [amail.io](http://amail.io) is down…
   - Loader on project
- **version 3.8** *aka* “speedup render”
   - Replace matrix by [matrix3d](http://9elements.com/html5demos/matrix3d/)
   - Are improvements can be made with [velocity](http://julian.com/research/velocity/)?
- **version 3.9** *aka* “mobile beauty”
   - Retina images
   - Responsive images 
- **more improvements**
   - See if some performance improvement can be made with [pointer events](http://www.thecssninja.com/javascript/pointer-events-60fps)
   - Images build may be improved with [gulp-streamify](https://github.com/nfroidure/gulp-streamify)
   - No change of page for contact
   - A maintenance page
   - Custom jQuery build

## Inspiration

- Icons use from [css-tricks](http://css-tricks.com/svg-sprites-use-better-icon-fonts/) and also [css-tricks](http://css-tricks.com/icon-fonts-vs-svg/) (Hail to css-tricks!)
- Social icons from [perfecticons.com](http://perfecticons.com/)
- [Polygon](http://www.polygon.com/2014/4/7/5582644/mlb-14-the-show-review)
- [Medium](https://medium.com/gulp-js-build/23812e4c9ec1)