'use scrict';

angular.module('mutrack').controller('UserCtrl', function($scope, $http) {
    $scope.users = [];

    $http.get('http://localhost:8080/api/private/user').then(
    function(response) {
        $scope.users = response.data;
    }
)
});