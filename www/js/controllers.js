angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $location, $firebaseArray, CONFIG, $document, $state) {
  $scope.isLogin = true;
  $scope.isLogout = false;
  // Form data for the login modal
  $scope.loginData = {};

  $scope.logout = function() {
    $scope.isLogin = true;
    $scope.isLogout = false;
    $location.url('/app/about');
  };

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

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(userLogin) {
    if ($document[0].getElementById("user_name").value != "" && $document[0].getElementById("user_pass").value != "") {
      firebase.auth().signInWithEmailAndPassword(userLogin.username, userLogin.password).then(function() {
        // Sign-In successful.
        //console.log("Login successful");
        var user = firebase.auth().currentUser;
        var name, email, photoUrl, uid;
        if (user.emailVerified) { //check for verification email confirmed by user from the inbox
          console.log("email verified");

          $document[0].getElementById("user_name").value = "";
          $document[0].getElementById("user_pass").value = "";
          // $state.go('app.contact');
          $state.go("app.contact", {}, {reload: true});

          //window.location("#/app/search")
          name = user.displayName;
          email = user.email;
          photoUrl = user.photoURL;
          uid = user.uid;
          localStorage.setItem("photo", photoUrl);
          localStorage.setItem("displayName", name);
          $scope.isLogin = false;
          $scope.isLogout = true;
          $scope.closeLogin();

        } else {
          alert("Email not verified, please check your inbox or spam messages")
          return false;
        } // end check verification email
      }, function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        if (errorCode === 'auth/invalid-email') {
          alert('Enter a valid email.');
          return false;
        } else if (errorCode === 'auth/wrong-password') {
          alert('Incorrect password.');
          return false;
        } else if (errorCode === 'auth/argument-error') {
          alert('Password must be string.');
          return false;
        } else if (errorCode === 'auth/user-not-found') {
          alert('No such user found.');
          return false;
        } else if (errorCode === 'auth/too-many-requests') {
          alert('Too many failed login attempts, please try after sometime.');
          return false;
        } else if (errorCode === 'auth/network-request-failed') {
          alert('Request timed out, please try again.');
          return false;
        } else {
          alert(errorMessage);
          return false;
        }
      });
    } else {
      alert('Please enter email and password');
      return false;
    } //end check client username password
  }
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

.controller('SignupController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG',
function($scope, $state, $document, $firebaseArray, CONFIG) {
  $scope.doSignup = function(userSignup) {
    //console.log(userSignup);
    if ($document[0].getElementById("cuser_name").value != "" && $document[0].getElementById("cuser_pass").value != "") {
      firebase.auth().createUserWithEmailAndPassword(userSignup.cusername, userSignup.cpassword).then(function() {
        // Sign-In successful.
        //console.log("Signup successful");
        var user = firebase.auth().currentUser;
        user.sendEmailVerification().then(function(result) {
          console.log(result)
        }, function(error) {
          console.log(error)
        });
        user.updateProfile({
          displayName: userSignup.displayname,
          photoURL: userSignup.photoprofile
        }).then(function() {
          // Update successful.
          $state.go("app.about");
        }, function(error) {
          // An error happened.
          console.log(error);
        });
      }, function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        if (errorCode === 'auth/weak-password') {
          alert('Password is weak, choose a strong password.');
          return false;
        } else if (errorCode === 'auth/email-already-in-use') {
          alert('Email you entered is already in use.');
          return false;
        }
      });
    } else {
      alert('Please enter email and password');
      return false;
    } //end check client username password
  }; // end $scope.doSignup()
}
])

.controller('ResetController', ['$scope', '$state', '$document', '$firebaseArray', 'CONFIG',
function($scope, $state, $document, $firebaseArray, CONFIG) {
  $scope.doResetemail = function(userReset) {
    //console.log(userReset);
    if ($document[0].getElementById("ruser_name").value != "") {
      firebase.auth().sendPasswordResetEmail(userReset.rusername).then(function() {
        // Sign-In successful.
        //console.log("Reset email sent successful");
        $state.go("app.about");
      }, function(error) {
        // An error happened.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        if (errorCode === 'auth/user-not-found') {
          alert('No user found with provided email.');
          return false;
        } else if (errorCode === 'auth/invalid-email') {
          alert('Email you entered is not complete or invalid.');
          return false;
        }
      });
    } else {
      alert('Please enter registered email to send reset link');
      return false;
    } //end check client username password
  }; // end $scope.doSignup()
}
])

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

})
.controller('dashboardController', ['$scope', '$firebaseArray', 'CONFIG',
  function($scope, $firebaseArray, CONFIG) {
    $scope.user = firebase.auth().currentUser;
  }
])
.controller('IntroCtrl', function($scope, $state, $ionicSlideBoxDelegate) {

  // Called to navigate to the main app
  $scope.startApp = function() {
    $state.go('app.about');
  };
  $scope.next = function() {
    $ionicSlideBoxDelegate.next();
  };
  $scope.previous = function() {
    $ionicSlideBoxDelegate.previous();
  };

  // Called each time the slide changes
  $scope.slideChanged = function(index) {
    $scope.slideIndex = index;
  };
});
