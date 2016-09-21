'use strict';

angular.module('mutrack')
    .service('HttpRequestSrv', function($http) {
        return function(url, method, data, callback) {
            var requestParams = {
                method: method,
                url: url,
                headers: {'Content-type' : 'application/json'},
                data: data
            };

            $http(requestParams).then(
                function successCallback(response) {
                    callback && callback(response);
                },

                function errorCallback( {
                })
            );
        };
    })
    .service('RestSrv', function(HttpRequestSrv) {

    });