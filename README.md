# Hiswe website

[hiswe.net](http://hiswe.net)

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
```

## Roadmap

1. **version 3.10** *aka* “mobile beauty”
	- Retina images
	- Responsive images
- **version 3.11** *aka* “clean mailing code”
	- Refactor contact controller with Q
- **more improvements**
	- Disable `trace: true` in js on build
	- See if some performance improvement can be made with [pointer events](http://www.thecssninja.com/javascript/pointer-events-60fps)
	- Images build may be improved with [gulp-streamify](https://github.com/nfroidure/gulp-streamify)
	- No change of page for contact
	- A maintenance page
	- Custom jQuery build

## Release History

- **3.9.0** *aka* “Another Carrousel is possible” – Change carrousel and add loader on projects
- **3.8.0** *aka* “speedup render” – Change from CSS transitions to [velocity](http://julian.com/research/velocity/)
- **3.7.0** *aka* “you can (not) send mail” – Change mail provider
- **3.6.0** *aka* “clean front” – Front JS & lib in commonJs + [Coffeelint](https://www.npmjs.org/package/gulp-coffeelint/)
- **3.5.0** *aka* “clean server” – *JS* & *CSS* on AWS + Express 4
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


## Inspiration

- Icons use from [css-tricks](http://css-tricks.com/svg-sprites-use-better-icon-fonts/) and also [css-tricks](http://css-tricks.com/icon-fonts-vs-svg/) (Hail to css-tricks!)
- Social icons from [perfecticons.com](http://perfecticons.com/)
- [Polygon](http://www.polygon.com/2014/4/7/5582644/mlb-14-the-show-review)
- [Medium](https://medium.com/gulp-js-build/23812e4c9ec1)
- [Velocity](http://julian.com/research/velocity/) for animations
