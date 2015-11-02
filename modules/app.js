(function(){                                                                     
    //Angular module
	angular.module("eShop", ['ngRoute']);  
	
	app.run(['$rootScope', '$location', function($rootScope, $location) {
	  $rootScope.user = "";
	  $rootScope.referedUrl = '';
	  $rootScope.settings = settings;
	  //Observe route change event and hook for login
	  $rootScope.$on('$routeChangeStart', function (ev, next, curr) {
		    if (next.$$route) {
		      var user = $rootScope.user,
				  auth = next.$$route.requireLogin;		  
				  
		      $rootScope.referedUrl  = (curr)?curr.redirectTo:'';
			  
		      if (auth && !user) { 
		    	  console.log(user);
		    	  $rootScope.settings.layout.header = false;
		    	  $rootScope.settings.layout.footer = false;
		    	  $location.path('/login');
		      }else{
		    	  $rootScope.settings.layout.header = true;
		    	  $rootScope.settings.layout.footer = true;
		    	  console.log(user);
		      }
		      
		    }
	  });
	}]);
	//Angular Routes
	angular.module('eShop').config(['$routeProvider', function($routeProvider) {
		$routeProvider
			.when('/', 			
				{ templateUrl : 'views/home.html', 				controller : 'HomePageController' , requireLogin : false})
			.when('/category', 	
				{ templateUrl : 'views/category.html', 			controller : 'CategoryController' ,requireLogin : false})
			.when('/category/:catid', 	
				{ templateUrl : 'views/category.html', 			controller : 'CategoryController' ,requireLogin : false})			
			.when('/product/:productId', 	
				{ templateUrl : 'views/product-details.html', 	controller : 'ProductController' ,requireLogin : false})
			.when('/cart', 		
				{ templateUrl : 'views/cart.html', 				controller : 'CartController' ,requireLogin : false})
			.when('/checkout', 	
				{ templateUrl : 'views/checkout.html', 			controller : 'CheckoutController' ,requireLogin : false})
			.when('/signup', 	
				{ templateUrl : 'views/signup.html', 			controller : 'SignupController' ,requireLogin : false})
			.when('/login', 	
				{ templateUrl : 'views/login.html', 			controller : 'LoginController' ,requireLogin : false})
			.when('/myaccount', 	
				{ templateUrl : 'views/account.html', 			controller : 'MyAccountController' ,requireLogin : true})
			.when('/404', 		
				{ templateUrl : 'views/404.html', 				controller : '404Controller' ,requireLogin : false})
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

			});
		}
		$scope.addToWishList = function (id){
			console.log('Id : ' + id  );
		}

		

	}])
	angular.module('eShop').controller('ProductController',['$scope','webService','$rootScope','$routeParams', function($scope, webService, $rootScope, $routeParams) {
		
		var getProduct = function() {	
			var product = _.where($rootScope.eshop.product, {id: parseInt($routeParams.productId)});
			$scope.product = product[0];
		}
		if (!$rootScope.eshop) {
			$rootScope.eshop = {};
			webService.loadJson().then(function(data){
				$rootScope.eshop = data;
				getProduct();
			})
		}else{
			getProduct();
		}
		
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
	angular.module('eShop').controller('LoginController', ['$scope','$rootScope','$location', function($scope, $rootScope, $location){
		$scope.submitLogin = function(user){
			$rootScope.user = user;
			$location.path($rootScope.referedUrl);
		};
		$rootScope.title = "Login Page";
		
	}])
	angular.module('eShop').controller('LogoutController', ['$scope','$rootScope','$location', function($scope, $rootScope, $location){
		$rootScope.user = '';
		$location.path('/login');
	}]);
	angular.module('eShop').controller('MyAccountController', ['$scope','webService','$rootScope', function($scope, webService, $rootScope) {
		
		
	}])
	
	angular.module('eShop').controller('404Controller', ['$scope', function($scope) {
		
	}]);

	//Directive
	angular.module('eShop').directive('productTile',  function() {
		return {
			restrict : 'E',
			templateUrl : "views/product-tile.html",
			scope : {
				productinfo : '=product',
				category : '@',
				addToWishList: '&'
			}

		}
	});
	angular.module('eShop').directive('commanHeader', [function(){
		return {
			restrict : "EA",
			templateUrl : "views/header.html"
		};
		
	}]);
	angular.module('eShop').directive('commanFooter', [function(){
		return {
			restrict : "EA",
			templateUrl : "views/footer.html"
		};
		
	}]);
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




