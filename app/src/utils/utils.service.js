'use strict';

angular.module('mutrack')
    .service('HttpRequestSrv', function ($http) {
        return function (url, method, data, callback) {
            var requestParams = {
                method: method,
                url: url,
                headers: { 'Content-type': 'application/json' },
                data: data
            };

            $http(requestParams).then(
                function successCallback(response) {
                    callback && callback(response);
                },
                function errorCallback(response) {

                });
        };
    })
    .service('RestSrv', function (HttpRequestSrv) {
        var restFactory = {};

        restFactory.find = function (url, callback) {
            HttpRequestSrv(url, 'GET', {}, callback);
        };

        restFactory.add = function (url, data, callback) {
            HttpRequestSrv(url, 'POST', data, callback);
        };

        restFactory.edit = function (url, data, callback) {
            HttpRequestSrv(url, 'PUT', data, callback);
        };

        restFactory.delete = function (url, data, callback) {
            HttpRequestSrv(url, 'DELETE', data, callback);
        };

        return restFactory;
    });