# Hiswe web site

## Purpose

Design a portfolio for myself

### launch

##### On development environment
- npm install .
- bower install
- nf start -j Procfile_dev -e .dev_env

##### On Heroku environment
- grunt build
- git commit + git push
- git push heroku master
- heroku plugins:install git://github.com/ddollar/heroku-config.git
- heroku config:set NODE_ENV=production
- …

## Todo

1. ~~Node JS site~~
- ~~Integration of artworks & content~~
- ~~Responsive~~
- Google analytics
- Nom de domaine
- CV
- Detailed articles
- Blog section with Micro-CMS
