'use strict';

angular.module('mutrack')
    .filter('formatPermission', function() {
        return function(input) {
            switch (input) {
                case 'ROLE_ADMIN':
                    return 'Administrador';
                case 'ROLE_USER':
                    return 'Usuario';            
                default:
                    return 'desconhecido';
            }
        }
    });