# Flickr search (Angular JS)

Demo app build with Angular JS to perform live Flickr image search

## Live demo

### Heroku

https://limitless-lake-97136.herokuapp.com

### Google App Engine

https://flickr-angular-demo.appspot.com

## Features

![Logo](docs/assets/gulp.png)
![Logo](docs/assets/angular.png)
![Logo](docs/assets/bootstrap.png)
![Logo](docs/assets/bower.png)
![Logo](docs/assets/webpack.png)
![Logo](docs/assets/karma.png)
![Logo](docs/assets/browsersync.png)
![Logo](docs/assets/jasmine.png)
![Logo](docs/assets/protractor.png)
![Logo](docs/assets/babel.png)
![Logo](docs/assets/sass.png)

## Little Features

* Deployed to Paas services(Heroku & GAE) for easy demo
* Nearly 100% (99.15%) unit test coverage
* Detect when user input finishes before firing up API calls to Flickr
* Auto refresh/inject on code change to all connected devices in local development mode (powered by Gulp with browserSync)
* Using [Masonry](https://github.com/desandro/masonry) for search result layout

## Usage

### Install

##### Install required tools `gulp` and `bower`:
```
npm install -g gulp bower
```

##### Clone this repo and goto its directory

##### Install node packages:
```
npm install
```

##### Install bower packages:
```
bower install
```

### Run

#### Use Gulp tasks

* `gulp` or `gulp build` to build an optimized version of your application in `/dist`
* `gulp serve` to launch a browser sync server on your source files
* `gulp serve:dist` to launch a server on your optimized application
* `gulp test` to launch your unit tests with Karma
* `gulp test:auto` to launch your unit tests with Karma in watch mode
* `gulp protractor` to launch your e2e tests with Protractor
* `gulp protractor:dist` to launch your e2e tests with Protractor on the dist files
