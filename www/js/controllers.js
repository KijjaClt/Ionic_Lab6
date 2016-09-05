angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  $scope.isLogin = true;
  $scope.isLogout = false;
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.logout = function() {
    $scope.isLogin = true;
    $scope.isLogout = false;
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    if ($scope.loginData.username == 'admin' && $scope.loginData.password == '1234') {
        $scope.isLogin = false;
        $scope.isLogout = true;
        $scope.loginData.username = '';
        $scope.loginData.password = '';
        $scope.loginData.loginErr = '';
        $scope.closeLogin();
    } else {
        $scope.loginData.loginErr = 'Invalid Username or Password';
    }

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    // $timeout(function() {
    //   $scope.closeLogin();
    // }, 1000);
  };
})

.controller("MoviesController", function($scope, $ionicLoading, ContactService, $location) {

    $scope.movies = [];

    $scope.loadMovies = function() {
        $ionicLoading.show();
        ContactService.getPopularMovies().then(function(results) {
            $scope.movies = results;
            $ionicLoading.hide();
        });
    }

    $scope.openDetail = function(id) {
        $location.url('/app/movies/' + id);
    }
})

.controller('MovieDetailController', function($scope, $stateParams, ContactService) {
    $scope.movie = ContactService.getMovieDetail($stateParams.id);

    $div_rating = $scope.movie.vote_average / 2.0;
    $res_rating = Math.round($div_rating);

    $scope.ratingsObject = {
        iconOn: 'ion-ios-star', //Optional
        iconOff: 'ion-ios-star-outline', //Optional
        iconOnColor: '#FFD600', //Optional
        iconOffColor: '#BDBDBD', //Optional
        rating: $res_rating, //Optional
        readOnly: true //Optional
    };

});
