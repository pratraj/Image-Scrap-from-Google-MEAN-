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
            controller:     'ImagesCtrl',
            params:{keyword:undefined}
        })
});

app.controller('NavCtrl',
    ['$scope', '$state', function ($scope, $state) {
    $state.go('search')

}]);

app.controller('SearchCtrl', function($scope, HTTP_Service) {
    $scope.imageSearch = "";
    $scope.aImage = [];
    $scope.searchMe = function () {
        if($scope.imageSearch.toString().length>0){
            HTTP_Service.search($scope.imageSearch)
                .then(function (res) {
                    if(res.data && res.data.data && res.data.data.imgUrls){
                        $scope.aImage = res.data.data.imgUrls;
                    }else {
                        $scope.aImage = [];
                    }
                },function (err) {
                    console.log(err);
                })
        }
    }

});

app.controller('SearchedCtrl', function($scope, $state, HTTP_Service) {
    $scope.aImage = [];
    $scope.searched = function () {
        HTTP_Service.searched()
            .then(function (res) {
                if(res.data && res.data.data){
                    $scope.aImage = res.data.data;
                }else {
                    $scope.aImage = [];
                }
            },function (err) {
                console.log(err);
            })
    }
    $scope.searched();

    $scope.showImage = function (key) {
        $state.go('images',{keyword:key})
    }
});

app.controller('ImagesCtrl', function($scope, $stateParams,HTTP_Service) {
    if($stateParams.keyword){
        $scope.keyword = $stateParams.keyword
        HTTP_Service.search($stateParams.keyword)
            .then(function (res) {
                if(res.data && res.data.data && res.data.data.imgUrls){
                    $scope.aImage = res.data.data.imgUrls;
                }else {
                    $scope.aImage = [];
                }
            },function (err) {
                console.log(err);
            })
    }

});

app.service('HTTP_Service', function($http) {
    this.search = function (key) {
        return $http({
            method: 'GET',
            url: '/api/img/find?searchKey='+key
        });
    }
    this.searched = function () {
        return $http({
            method: 'GET',
            url: '/api/img/all'
        });
    }

});