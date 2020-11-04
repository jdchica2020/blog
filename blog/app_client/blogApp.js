

var app = angular.module('blogApp', ['ngRoute', 'ui.router']);


/*#################################################################################*/
/* Router Provider
###################################################################################*/

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController',
            controllerAs: 'vm'

        })

        .when('/blgList', {
            templateUrl: 'pages/blgList.html',
            controller: 'listController',
            controllerAs: 'vm'
        })

        .when('/blgAdd', {
            templateUrl: 'pages/blgAdd.html',
            controller: 'addController',
            controllerAs: 'vm'

        })

        .when('/blgEdit/:id', {
            templateUrl: 'pages/blgEdit.html',
            controller: 'editController',
            controllerAs: 'vm'
        })

        .when('/blgDelete/:id', {
            templateUrl: 'pages/blgDelete.html',
            controller: 'deleteController',
            controllerAs: 'vm'
        })

        .when('/register', { //added lab6
            templateUrl: '/common/auth/register.html',
            controller: 'RegisterController',
            controllerAs: 'vm'
        })

        .when('/login', { //added lab6
            templateUrl: '/common/auth/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
        })

        .otherwise({ redirectTo: '/' });
});


app.config(function($stateProvider) { // do we still using the stateProvider?
    $stateProvider
        .state('blgList', {
            url: '/blgList',
            templateUrl: 'pages/blgList.html',
            controller: 'listController'
        });
});




/*#################################################################################*/
/* Rest Web API Functions
###################################################################################*/


function returnListOfBlogs($http) {
    return $http.get('/api/blogs');
}

function returnSingleBlog($http, id) {
    return $http.get('/api/blogs/' + id);
}

function updateBlog($http, authentication, id, data) {
    return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function addBlog($http, authentication, data) {
    return $http.post('/api/blogs/', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function deleteBlog($http, authentication, id) {
    return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}






/*#################################################################################*/
/* Controllers provide data and information to the page
###################################################################################*/

/* Home Blog */

app.controller('homeController', function homeController() {
    var vm = this;
    vm.title = "Joan Chica";
    vm.message = "Welcome to my Blog Site!";
});


/* List Blog */

app.controller('listController', ['$http', 'authentication', function listController($http, authentication) {
    var vm = this;
    vm.title = "Blog List";

    vm.isLoggedIn = function(){
        return authentication.isLoggedIn();
    }
    returnListOfBlogs($http)
        .success(function(data) {
            vm.blogs = data;
            vm.message = "Blog data found!";
        })
        .error(function(e) {
            vm.message = "Could not get List Blog";
        });
}]);



/* Add a Single Blog */

app.controller('addController', ['$http', '$routeParams', '$state', 'authentication', function addController($http, $routeParams, $state, authentication) {
    var vm = this;
    vm.blog = {};
    vm.title = "Add Blog";
    

    vm.submit = function() {
        var data = vm.blog;
        data.blog_title = userForm.blog_title.value;
        data.blog_text = userForm.blog_text.value;
        //data.created_On = userForm.created_On.value;

        addBlog($http, authentication, data)
            .success(function(data) {
                vm.message = "Blog data added!";
                $state.go('blgList');
            })
            .error(function(e) {
                vm.message = "Could not add blog " + userForm.blog_title.text + " " + userForm.blog_text.text;
            });
    }
}]);




/* Edit a Single Blog */


app.controller('editController', ['$http', '$routeParams', '$state', 'authentication', function editController($http, $routeParams, $state, authentication) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.title = "Joan Chica My Blog";

    returnSingleBlog($http, vm.id)
        .success(function(data) {
            vm.blog = data;
            vm.message = "Blog data found!";
        })
        .error(function(e) {
            vm.message = "Could not get blog with id: " + vm.id;
        });

    vm.submit = function() {
        var data = vm.blog;
        data.blog_title = userForm.blog_title.value;
        data.blog_text = userForm.blog_text.value;
        //data.created_On = userForm.created_On.value;

        updateBlog($http, authentication, vm.id, data)
            .success(function(data) {
                vm.message = "Blog Updated";
                $state.go('blgList');

            })
            .error(function(e) {
                vm.message = "Could not update blog with id: " + vm.id + userForm.blog_title.text + " " + userForm.blog_text.text;
            });

    }
}]);



/* Delete a Single Blog */

app.controller('deleteController', ['$http', '$routeParams', '$state', 'authentication', function deleteController($http, $routeParams, $state, authentication) {
    var vm = this;
    vm.blog = {};
    vm.id = $routeParams.id;
    vm.title = "Joan Chica My Blog";

    returnSingleBlog($http, vm.id)
        .success(function(data) {
            vm.blog = data;
            vm.message = "Are you sure you want to delete this blog?";
        })
        .error(function(e) {
            vm.message = "Could not get blog with id: " + vm.id;

        });

    vm.submit = function() {
        var data = {}

        deleteBlog($http, authentication, vm.id)
            .success(function(data) {
                vm.message = "Blog deleted Successfully";
                $state.go('blgList');

            })
            .error(function(e) {
                vm.message = "Could not delete blog with id: " + vm.id;

            });
    }
    vm.cancel = function() {
        $state.go('blgList');
    }
}]);





 






