
var app = angular.module('Application',['ngRoute','ngMessages']);
            app.constant('API_PREFIX','https://zenways-contact.herokuapp.com/api/');
            app.config(function($routeProvider){
                $routeProvider.when('/register',{
                    templateUrl: 'views/register.html'
                });
                $routeProvider.when('/list',{
                    templateUrl: 'views/userTable.html'
                });
                $routeProvider.when('/view',{
                    templateUrl: 'views/userView.html'
                });
                $routeProvider.when('/card',{
                    templateUrl: 'views/card.html'
                });
                $routeProvider.when('/error',{
                    templateUrl: 'views/error404.html'
                });
                $routeProvider.otherwise({
                    redirectTo:'/register'
                });
            });
            // secure_email
            // to, subject, text
            app.controller('RegisterController',function($location,$rootScope,$scope,$q,$http,API_PREFIX){
                $scope.user = {};
                $scope.registerSubmit = function(){
                    console.log('herwe')
                    $http({
                        url :API_PREFIX+"contact",
                        headers : {
                            key: "ZENWAYS01PIET01"
                        },
                        method:'POST',
                        data : $scope.user
                    }).then(function(response){
                        if(response.data.status){
                            console.log($scope.user);
                            $scope.user = {};
                            
                            $scope.refresh();
                        }
                    },function(response){
                        $location.path('/error')
                    });
                    $location.path('/list');
                };
                $scope.reset = function(){
                    console.log("It is reset");
                    $location.path('/register');
                };
                $scope.back = function(){
                    $location.path('/list');
                };
                $scope.edit = function(obj){
                    $location.path('/register');
                    $scope.user = obj;
                };
                $scope.update = function(){
                    console.log($scope.user._id);
                    $http({
                        url : API_PREFIX+"contact/"+$scope.user._id,
                        headers : {
                            key :"ZENWAYS01PIET01"
                        },
                        data: $scope.user,
                        method : "PUT"
                    }).then(function(response){
                        console.log("pass");
                    },function(response){
                        console.log("fail");
                    });
                    $scope.user = {};
                    $scope.refresh();
                    $location.path('/list');
                };
                $scope.remove = function(index){
                    console.log("This is "+index);
                    $http({
                        url : API_PREFIX+"contact/"+index,
                        headers : {
                            key :"ZENWAYS01PIET01"
                        },
                        method : "DELETE"
                    }).then(function(response){
                        console.log("pass");
                    },function(response){
                        console.log("fail");
                    });
                    $scope.refresh();
                };
                $scope.showMap = function(obj){
                    $location.path('/view');
                    $scope.map = obj;
                };
                $scope.refresh = function(){
                    $http({
                        url : API_PREFIX+"contacts",
                        headers : {
                            key : "ZENWAYS01PIET01"
                        }
                    }).then(function(response){
                        if(response.data.status){
                            $rootScope.display = response.data.contacts;
                        } else{
                            $location.path('/error');
                        }
                    },function(response){
                        console.log(response)
                        $location.path('/error');
                    });
                };
                $scope.errorBack = function(){
                    $location.path('/list');
                };
                $scope.refresh();
            });
