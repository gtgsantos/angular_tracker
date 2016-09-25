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
            if (user.id) {
                RestSrv.edit('http://localhost:8080/api/private/user', user, function () {
                    delete user.password;

                    for (var i = 0; i < $scope.users.length; i++) {
                        if ($scope.users[i].id === user.id) {
                            $scope.users[i] = user;
                        }
                    }

                    $scope.hide();
                    ngNotify.set('User \'' + user.name + '\' updated.', 'success');
                });
            } else {
                RestSrv.add('http://localhost:8080/api/private/user', user,
                    function (response) {
                        $scope.users.push(response.data);
                        $scope.hide();
                    });
            }
        };

        $scope.deleteUser = function (user) {
            RestSrv.delete('http://localhost:8080/api/private/user', user,
                function (user) {
                    $scope.users.splice($scope.users.indexOf(user), 1);
                    $scope.hide();
                });
        };

        $scope.editUser = function (user) {
            $scope.user = angular.copy(user);
            $scope.show();
        };

        RestSrv.find('http://localhost:8080/api/private/user',
            function (response) {
                $scope.users = response.data;
            }
        );
    });