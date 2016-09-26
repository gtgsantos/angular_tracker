'use scrict';

angular.module('mutrack')
    .controller('UserCtrl', function ($scope, ngNotify, RestSrv, SERVICE_PATH) {
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

        // Manage CRUD operations.
        var userUrl = SERVICE_PATH.PRIVATE_PATH + '/user';

        $scope.saveUser = function (user) {
            if (user.id) {
                RestSrv.edit(userUrl, user, function () {
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
                RestSrv.add(userUrl, user,
                    function (response) {
                        $scope.users.push(response.data);
                        $scope.hide();
                    });
            }
        };

        $scope.deleteUser = function (user) {
            RestSrv.delete(userUrl, user,
                function (user) {
                    $scope.users.splice($scope.users.indexOf(user), 1);
                    $scope.hide();
                });
        };

        $scope.editUser = function (user) {
            $scope.user = angular.copy(user);
            $scope.show();
        };

        RestSrv.find(userUrl,
            function (response) {
                $scope.users = response.data;
            }
        );
    });