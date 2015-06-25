'use strict';

/**
 * @ngdoc service
 * @name axisJsApp.configChooser
 * @description
 * # configChooser
 * Factory in the axisJsApp.
 */
angular.module('axisJSApp')
  .factory('configChooser', function ($aside) {
    return function() {
      $aside.open({
        placement: 'right',
        backdrop: true,
        controller: /*@ngInject*/ function ($scope, localStorageService, $window, configProvider, $modalInstance) {
          this.name = 'Choose Configuration';
          $scope.themes = [];
          
          configProvider.then(function(res){
            $scope.themes = res.themes;
          });
          
          $scope.cancel = function(e){
            $modalInstance.dismiss();
            e.stopPropagation();
          };
          
          $scope.setConfig = function(config) {
            localStorageService.set('config', config);
            $window.location.reload();
          };
        },
        templateUrl: 'partials/configChooser.html' 
      });
    };
  });