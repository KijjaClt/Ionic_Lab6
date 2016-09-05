angular.module('starter.services', [])

.factory('ContactService', function($http) {
    var api_key = "8ecc15abb3b724833fdd7e9c5b3c6deb";
    var data = [];

    return {
        getPopularMovies: function() {
            return $http.get('http://api.themoviedb.org/3/movie/popular?api_key=' + api_key).then(
                function(response) {
                    return data = response.data.results;
                }
            );
        },
        getMovieDetail: function(id) {
            for (var i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    return data[i];
                }
            }
            return null;
        }
    }
});
