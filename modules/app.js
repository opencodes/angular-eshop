(function(){                                                                     

    //Angular module
	angular.module("eShop", ['ngRoute']);  

	//Angular Routes
	angular.module('eShop').config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', 			
				{ templateUrl : 'views/home.html', 				controller : 'HomePageController' })
			.when('/category', 	
				{ templateUrl : 'views/category.html', 			controller : 'CategoryController' })
			.when('/category/:catid', 	
				{ templateUrl : 'views/category.html', 			controller : 'CategoryController' })
			.when('/product', 	
				{ templateUrl : 'views/product-details.html', 	controller : 'ProductController' })
			.when('/product/:productId', 	
				{ templateUrl : 'views/product-details.html', 	controller : 'ProductController' })
			.when('/cart', 		
				{ templateUrl : 'views/cart.html', 				controller : 'CartController' })
			.when('/checkout', 	
				{ templateUrl : 'views/checkout.html', 			controller : 'CheckoutController' })
			.when('/signup', 	
				{ templateUrl : 'views/signup.html', 			controller : 'SignupController' })
			.when('/login', 	
				{ templateUrl : 'views/login.html', 			controller : 'SettingController' })
			.when('/404', 		
				{ templateUrl : 'views/404.html', 				controller : '404Controller' })
			//Otherwise redirect to error page
			.otherwise({redirectTo:'/404'});
	}]);
	
	//Angular Controllers
	angular.module('eShop').controller('HomePageController', ['$scope','webService','$rootScope', function($scope, webService, $rootScope) {
		if (!$rootScope.eshop) {
			$rootScope.eshop = {};
			webService.loadJson().then(function(data){
				$rootScope.eshop = data;
			})
		};		
	}])
	angular.module('eShop').controller('CategoryController', ['$scope','webService','$rootScope','$routeParams', function($scope, webService, $rootScope, $routeParams) {
		if (!$rootScope.eshop) {
			$rootScope.eshop = {};
			webService.loadJson().then(function(data){
				$rootScope.eshop = data;
			})
		}

		
	}])
	angular.module('eShop').controller('ProductController',['$scope','webService','$rootScope', function($scope, webService, $rootScope) {
		if (!$rootScope.eshop) {
			$rootScope.eshop = {};
			webService.loadJson().then(function(data){
				$rootScope.eshop = data;
			})
		};
		
		
	}])
	angular.module('eShop').controller('CartController', ['$scope','webService','$rootScope', function($scope, webService, $rootScope) {
		if (!$rootScope.eshop) {
			$rootScope.eshop = {};
			webService.loadJson().then(function(data){
				$rootScope.eshop = data;
			})
		};
		
	}])
	angular.module('eShop').controller('CheckoutController', ['$scope','webService','$rootScope', function($scope, webService, $rootScope) {
		if (!$rootScope.eshop) {
			$rootScope.eshop = {};
			webService.loadJson().then(function(data){
				$rootScope.eshop = data;
			})
		};
		
	}])
	
	angular.module('eShop').controller('404Controller', ['$scope', function($scope) {
		
	}]);

	//Directive
	angular.module('eShop').directive('productTile',  function() {
		return {
			restrict : 'E',
			templateUrl : "views/product-tile.html",
			scope : {
				productinfo : '=product'
			}
		}
	});
	angular.module('eShop').service('webService', ['$http','$q', function($http, $q) { 

		// I transform the error response, unwrapping the application dta from
                // the API response payload.
        function handleError( response ) {
            // The API response from the server should be returned in a
            // nomralized format. However, if the request was not handled by the
            // server (or what not handles properly - ex. server error), then we
            // may have to normalize it on our end, as best we can.
            if (! angular.isObject( response.data ) || ! response.data.message) {
                return( $q.reject( "An unknown error occurred." ) );
            }
            // Otherwise, use expected error message.
            return( $q.reject( response.data.message ) );
        }
        // I transform the successful response, unwrapping the application data
        // from the API response payload.
        function handleSuccess( response ) {
            return( response.data );
        }


		this.loadJson = function () {
			var request = $http({
                method: "get",
                url: "modules/eshop.json"                        
            });
            return( request.then( handleSuccess, handleError ) );
		}
	}]); 

})();  




