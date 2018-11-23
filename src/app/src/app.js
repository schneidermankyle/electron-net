'use strict';

// This is our angular handler
var app = angular.module('Electron-net', []);

// Once the page is loaded, we want to go ahead and bootstrap our angular app
document.addEventListener('DOMContentLoaded', function(){
  angular.bootstrap(document, ['Electron-net']);
})

// We look through the page for the corrosponding ng-controller with the name
// "AlgorithmCtrl". We then call an anon function and pass in the service
app.controller('AlgorithmCtrl', function(AlgoService){
  var ctrl = this;
  ctrl.title = "Algorithm Test";

  getData();

  // This makes a request to our C# backend and sets the data to the placeholder
  // template values.
  function getData(){
    AlgoService.Get().then( function(dataSet){
      ctrl.dataSet = dataSet;
    }, (error) => {
      ctrl.ErrorMessage = error;
    });
  }
});

// This is the definition for our AlgoService
// When ready it makes a request to the C# restful api and returns the data
// to be set to our template.
app.service("AlgoService", function($http){
  var svc = this;
  var apiUrl = 'http://localhost:5000/api';

  svc.Get = function() {
    return $http.get(apiUrl + '/algorithmTest').then(function success(response){
      return response.data;
    });
  }
});
