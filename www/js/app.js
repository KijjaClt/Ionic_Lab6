// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','ionic-ratings','firebase','starter.configs'])

.run(function($ionicPlatform,CONFIG) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    firebase.initializeApp({
      apiKey: CONFIG.FIREBASE_API,
      authDomain: CONFIG.FIREBASE_AUTH_DOMAIN,
      databaseURL: CONFIG.FIREBASE_DB_URL,
      storageBucket: CONFIG.FIREBASE_STORAGE,
      messagingSenderId: CONFIG.FIREBASE_STORAGE
    });
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })
  .state('app.about', {
    url: '/about',
    views: {
      'menuContent': {
        templateUrl: 'templates/about.html'
      }
    }
  })
  .state('app.contact', {
    url: '/contact',
    views: {
      'menuContent': {
        templateUrl: 'templates/contact-us.html',
        controller: 'dashboardController'
      }
    }
  })
  .state('app.movies', {
    url: '/movies',
    views: {
      'menuContent': {
        templateUrl: 'templates/movies.html',
        controller: 'MoviesController'
      }
    }
  })
  .state('app.movie-detail', {
    url: '/movies/:id',
    views: {
      'menuContent': {
        templateUrl: 'templates/movie-detail.html',
        controller: 'MovieDetailController'
      }
    }
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupController'
  })
  .state('reset', {
    url: '/reset',
    templateUrl: 'templates/resetemail.html',
    controller: 'ResetController'
  })
  .state('intro', {
    url: '/',
    templateUrl: 'templates/intro.html',
    controller: 'IntroCtrl'
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');
});
