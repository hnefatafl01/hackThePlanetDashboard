(function() {
  'use strict';

  angular.module("app")
  .component("dash", {
    controller: dashCtrl,
    templateUrl: 'dash.html'
  })

  editController.$inject = ['$http','$stateParams','$state']

  function dashCtrl($http, $stateParams, $state) {
    const vm = this;

    vm.$onInit = function() {

    };
  }
}();
