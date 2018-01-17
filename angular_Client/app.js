var app = angular.module("app", ['ui.router']).
config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home')
    $stateProvider
        .state('search', {
                templateUrl:    'views/1.html',
                controller:     'SearchCtrl'
            })
        .state('searched', {
            templateUrl:    'views/2.html',
            controller:     'SearchedCtrl'
        })
        .state('images', {
            templateUrl:    'views/3.html',
            controller:     'ImagesCtrl'
        })
});

app.controller('NavCtrl',
    ['$scope', '$state', function ($scope, $state) {
        $state.go('search')

}]);

app.controller('AboutCtrl', function($scope, $compile) {
    console.log('inside about controller');

});

app.controller('HomeCtrl', function($scope, $compile) {
    console.log('inside home controller');

});

app.controller('ContactCtrl', function($scope, $compile) {
    console.log('inside contact controller');

});