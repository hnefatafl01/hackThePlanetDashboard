(function(){
  'use strict';
  angular.module("app").config(configuration)

  configuration.$inject = ['$stateProvider','$urlRouterProvider','$locationProvider']

  function configuration($stateProvider, $urlRouterProvider, $locationProvider) {

    $stateProvider
      .state({
        name: 'dash',
        url: '/',
        component: 'dash'
      })

  }

}());
