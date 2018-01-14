var app = angular.module("app", ['ui.router']).
config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/home')
    $stateProvider
        .state('/home', {
                go: '/home',
                templateUrl:    'viwes/1.html',
                controller:     'HomeCtrl'
            })
        .state('/about', {
            go: '/about',
            templateUrl:    'viwes/2.html',
            controller:     'AboutCtrl'
        })
        .state('/contact', {
            go: '/contact',
            templateUrl:    'viwes/3.html',
            controller:     'ContactCtrl'
        })
});

app.controller('NavCtrl',
    ['$scope', '$state', function ($scope, $state) {
        $scope.navClass = function (page) {
            var currentRoute = page || 'home';
            return page === currentRoute ? 'active' : '';
        };

        $scope.loadHome = function () {
            $state.go('/home');
        };

        $scope.loadAbout = function () {
            $state.go('/about');
        };

        $scope.loadContact = function () {
            $state.go('/contact');
        };

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