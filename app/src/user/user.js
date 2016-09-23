'use scrict';

angular.module('mutrack')
    .controller('UserCtrl', function ($scope, $http, RestSrv) {
        $scope.users = [];
        $scope.user = {};

        $scope.showAddEditUser = false;
        $scope.show = function () {
            $scope.showAddEditUser = true;
        };

        $scope.hide = function () {
            $scope.showAddEditUser = false;
            $scope.user = {};
        };

        $scope.saveUser = function (user) {
            RestSrv.add('http://localhost:8080/api/private/user', user,
                function () {
                    hide();
                });
        };

        RestSrv.find('http://localhost:8080/api/private/user',
            function (response) {
                $scope.users = response.data;
            }
        );
    });