angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicModal, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};

    // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
    }).then(function (modal) {
        $scope.modal = modal;
    });

    // Triggered in the login modal to close it
    $scope.closeLogin = function () {
        $scope.modal.hide();
    };

    // Open the login modal
    $scope.login = function () {
        $scope.modal.show();
    };

    // Perform the login action when the user submits the login form
    $scope.doLogin = function () {
        console.log('Doing login', $scope.loginData);

        // Simulate a login delay. Remove this and replace with your login
        // code if using a login system
        $timeout(function () {
            $scope.closeLogin();
        }, 1000);
    };
})

.controller('PlaylistsCtrl', function ($scope, $interval) {
    var count = 0;
    var proceed = 1;
    $scope.time = 60;
    $scope.score = 0;
    $scope.correct = 0;
    var first = "";
    var second = "";
    var pos1 = -1;
    var pos2 = -1;

    var split = function (array, noofarrays, splitnumber) {
        console.log(array);
        var array1 = [];
        var array2 = [];
        for (var i = 0; i < noofarrays; i++) {
            array1 = array.slice(0, splitnumber);
            array2.push(array1);
            array1 = [];
            array.splice(0, splitnumber);
        };
        console.log(array2);
        return array2;
    };


    $scope.numbers = [{
            "id": 1,
            "title": "abhay"
        },
        {
            "id": 2,
            "title": "ghiridhar"
        },
        {
            "id": 3,
            "title": "omkar"
        },
        {
            "id": 4,
            "title": "hamish"
        },
        {
            "id": 5,
            "title": "jyoti"
        },
        {
            "id": 6,
            "title": "nusrat"
        },
        {
            "id": 7,
            "title": "abc"
        },
        {
            "id": 8,
            "title": "xyz"
        },
        {
            "id": 9,
            "title": "abhay"
        },
        {
            "id": 10,
            "title": "hamish"
        },
        {
            "id": 11,
            "title": "omkar"
        },
        {
            "id": 12,
            "title": "abc"
        },
        {
            "id": 13,
            "title": "xyz"
        },
        {
            "id": 14,
            "title": "jyoti"
        },
        {
            "id": 15,
            "title": "nusrat"
        },
        {
            "id": 16,
            "title": "ghiridhar"
        }];


    $scope.bind = [];

    for (var q = 0; q < $scope.numbers.length; q++) {
        $scope.bind[q] = $scope.numbers[q].id;

    };
    console.log($scope.bind);
    $scope.numbers2 = split($scope.numbers, 4, 4);
    $scope.bind = split($scope.bind, 4, 4);

    var timer = function () {
        console.log("entered in period");
        $scope.time -= 1;
        if ($scope.time == 0) {
            proceed = 0;
            alert("Oops! Time Up!!");
            $scope.time = 60;
            $scope.score = 0;
            $scope.correct = 0;

        };
    };

    $interval(timer, 1000, 0);
    $scope.change = function (i, index) {


        if (!(pos1 == i && pos2 == index) && proceed) {

            var reset = function () {
                $scope.bind[i][index] = $scope.numbers2[i][index].id;
                $scope.bind[pos1][pos2] = $scope.numbers2[pos1][pos2].id;
                emptyfields();
            };
            console.log("inside function");
            count = count + 1;

            console.log($scope.bind[i][index]);
            console.log($scope.numbers2[i][index].id);
            $scope.bind[i][index] = $scope.numbers2[i][index].title;

            if (count == 1) {
                first = $scope.numbers2[i][index].title;
                pos1 = i;
                pos2 = index;

            };
            if (count == 2) {
                second = $scope.numbers2[i][index].title;

            };
            console.log(first);
            console.log(second);
            var emptyfields = function () {
                count = 0;
                first = "";
                second = "";
                pos1 = -1;
                pos2 = -1;
            };

            if (first != second && count == 2) {

                $interval(reset, 500, 1);
            };
            if (count == 2 && first == second) {
                $scope.score += 10;
                $scope.correct += 1;
                if ($scope.correct == 8) {
                    alert("Solved Do Play Again");
                    $scope.time = 60;
                    $scope.score = 0;
                    $scope.correct = 0;

                };
                emptyfields();

            };
        };


    };

})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})