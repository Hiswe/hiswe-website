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

### Release History

- **2.0.2** — add exec command to grunt for launching server
- **2.0.1** — Update content
- **2.0.0** — Complete retake
