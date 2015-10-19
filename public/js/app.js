var app = angular.module('dateABook', ['ngRoute', 'ngMaterial'])
.config(function($routeProvider, $mdThemingProvider){




  $routeProvider
    .when('/home', {
      templateUrl: 'templates/home.html'

    })

    .when('/browseBooks', {
      templateUrl: 'templates/browseBooks.html'


    })

    .when('/pastReads', {
      templateUrl: 'templates/pastReads.html'

    })

    .otherwise({
      redirectTo: '/home'
    }),



  $mdThemingProvider.theme('default')
              .primaryPalette('deep-purple', {
                'default': '100',
                'hue-1': '300',
                'hue-2': '600',
                'hue-3': '900'
              })
              .backgroundPalette('blue-grey', {
                'default': '50',
                'hue-1': '100',
                'hue-2': '600',
                'hue-3': 'A100'
              })
              .accentPalette('brown', {
                'default': '300',
                'hue-1': '100',
                'hue-2': '600',
                'hue-3': 'A100'
              });


});
