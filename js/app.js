//var angular = require('angular');
var app = angular.module('app', []);


module.exports = app.controller('TaskController', ['$scope', '$http', function ($scope, $http) {
    //console.log('!',$http.get('http://jsonplaceholder.typicode.com/posts'));

    $scope.tasks = [];

    $scope.task = {};

    $scope.task_details = {};
 
    $scope.errors = [];
    $scope.err = 'hi';


    $scope.listTasks =  () => {
        $http.get('http://jsonplaceholder.typicode.com/posts', {})
            .then( result => $scope.tasks = result.data);
            
    };
    $scope.listTasks();

    // add new 
    $scope.addTask =  () => {
        $http.post('http://jsonplaceholder.typicode.com/posts', {
            task: $scope.task
        })
            .then(result => {
                $scope.errors = [];
                var newTask = {
                    id: result.data.id,
                    body: result.data.task.body, 
                    title: result.data.task.title
                };
                $scope.tasks.push(newTask);
                var modal_element = angular.element('#add_new_task_modal');
                modal_element.modal('hide');
            });
    };

    // open edit window
    $scope.edit =  index => {
        $scope.task_details = $scope.tasks[index];
        //console.log($scope.task_details)
        var modal_element = angular.element('#modal_update_task');
        modal_element.modal('show');
    };

    // update collection
    $scope.updateTask =  () => {
        $http.post('http://jsonplaceholder.typicode.com/posts', {
            task: $scope.task_details
        })
            .then(function success(e) {

                $scope.errors = [];

                var modal_element = angular.element('#modal_update_task');
                modal_element.modal('hide');

            }, function error(e) {
                $scope.errors = e.data.errors;
            });
    };

    // delete item
    $scope.delete =  index => {

        var conf = confirm("Are you sure, dude?");

        if (conf == true) {
            $http.post('http://jsonplaceholder.typicode.com/posts', {
                task: $scope.tasks[index]
            })
                .then(function success(e) {

                    $scope.errors = [];

                    $scope.tasks.splice(index, 1);

                }, function error(e) {
                    $scope.errors = e.data.errors;
                });
        }
    };
}]);
