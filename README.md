# Hiswe website

[hiswe.net](http://hiswe.net)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [prerequisite](#prerequisite)
- [commands](#commands)
  - [building dependencies](#building-dependencies)
  - [building for production](#building-for-production)
  - [serving production files locally](#serving-production-files-locally)
  - [development](#development)
- [configuration](#configuration)
  - [dev](#dev)
  - [heroku](#heroku)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## prerequisite

- [Node.js](https://nodejs.org/en/) >=10.12.0
- [yarn](https://yarnpkg.com/lang/en/) >= 1.10.1

## commands

### building dependencies

```sh
yarn install
```

### building for production

```sh
yarn build
```

### serving production files locally

```sh
yarn serve:prod
```

application will be running on https://127.0.0.1:3000

### development

```sh
yarn dev
```

application will be running on http://localhost:3000

## configuration

see `.hiswerc-example` file

### dev

copy `.hiswerc-example` to `.hiswerc` and modify this file

### heroku

set Config Vars

**global**

see [nuxt config for heroku](https://nuxtjs.org/faq/heroku-deployment)

| key      | value      |
| -------- | ---------- |
| NODE_ENV | production |
| HOST     | 0.0.0.0    |

**email**

```
hiswe_email__provider__service
hiswe_email__provider__auth__user
hiswe_email__provider__auth__pass
hiswe_email__options__from
```

### recaptcha

manage on [the console](https://www.google.com/recaptcha/admin#list)
