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

.controller('PlaylistsCtrl', function ($scope, $interval, $ionicPopup) {

    if ($.jStorage.get("totalgames") == undefined) {
        $.jStorage.set("totalgames", 0);

    } else {
        $scope.totalgames = $.jStorage.get("totalgames");
    };
    if ($.jStorage.get("totalcompleted") == undefined) {
        $.jStorage.set("totalcompleted", 0);

    } else {
        $scope.totalcompleted = $.jStorage.get("totalcompleted");
    };
    /*$scope.totalgames = $.jStorage.get("totalgames");
    $scope.totalgames += 1;
    $.jStorage.set("totalgames", $scope.totalgames);*/



    $scope.tries = 0;
    var proceed = 1;
    var a, b;
    var store = [];
    var done = [];
    var check = [];
    var count = 0;
    $scope.correct = 0;
    var first = "";
    var second = "";
    var pos1 = -1;
    var pos2 = -1;
    $scope.moves = 0;
    var emptyfields = function () {
        count = 0;
        first = "";
        second = "";
        pos1 = -1;
        pos2 = -1;
        proceed = 1;
    };

    var shuffle = function (store) {
        var currentIndex = store.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {


            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;


            temporaryValue = store[currentIndex];
            store[currentIndex] = store[randomIndex];
            store[randomIndex] = temporaryValue;
        }
        console.log(store);
        return store;

    };
    $scope.$on('$ionicview.enter', function () {
        console.log("initiliaze");
    })
    $scope.addtotal = function () {
        $scope.totalgames += 1;
        console.log("INITIALIZER");
    };

    $scope.reset = function () {
        $scope.totalgames = $.jStorage.get("totalgames");
        $scope.totalgames += 1;
        console.log($scope.totalgames);
        $.jStorage.set("totalgames", $scope.totalgames);



        proceed = 1;
        $scope.time = 600;


        check = [];
        proceed = 1;
        $scope.time = 60;

        $scope.score = 0;
        $scope.correct = 0;
        $scope.moves = 0;

        console.log("func");
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

        $scope.test = [];
        for (var i = 1; i <= 16; i++) {
            $scope.test.push("true");
        };

        $scope.test = split($scope.test, 4, 4);



        $scope.numbers = [{
                "id": "img/16.jpg",
                "title": "img/1image.jpg"
        },
            {
                "id": "img/16.jpg",
                "title": "img/2image.jpg"
        },
            {
                "id": "img/16.jpg",
                "title": "img/3image.jpg"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image4.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image5.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image6.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image7.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image8.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/1image.jpg"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image2.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/3image.jpg"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image4.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image5.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image6.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image7.png"
        },
            {
                "id": "img/16.jpg",
                "title": "img/image8.png"
        }];


        $scope.bind = [];

        for (var q = 0; q < $scope.numbers.length; q++) {
            $scope.bind[q] = $scope.numbers[q].id;

        };
        var store = $scope.bind;
        console.log(store);
        shuffle($scope.numbers);
        console.log($scope.bind);
        $scope.numbers2 = split($scope.numbers, 4, 4);
        $scope.bind = split($scope.bind, 4, 4);

    };
    $scope.reset();

    proceed = 1;
    var timer = function () {
        if ($scope.time > 0 && $scope.correct != 8) {
            console.log("entered in period");
            $scope.time -= 1;
            if ($scope.time == 0 && $scope.correct != 8) {
                $scope.showPopup("Oh no!Time is up!" + "<br/>" + "You got " + $scope.correct + " right");
                $interval.cancel(timer);

            };

        };
    };

    $interval(timer, 1000, 0);

    $scope.showPopup = function (message) {
        $scope.msg = message;
        console.log("popup called");
        var myPopup = $ionicPopup.show({
            title: "hey",
            template: '<div class="popup"><h1></h1>' + message + '</div>',

            subTitle: '',
            scope: $scope,
            buttons: [

                {
                    text: '<b>Replay</b>',
                    type: 'button-positive',
                    onTap: function (e) {
                        $scope.reset();
                    }
      }
    ]
        });
    };
    /*myPopup.then(function (res) {
    console.log('Tapped!', res);
});
$timeout(function () {
    myPopup.close(); //close the popup after 3 seconds for some reason
}, 3000);
};*/

    $scope.change = function (i, index) {

        if (check.indexOf($scope.numbers2[i][index].title) == -1) {


            //CHECK IF SECOND TOUCH IS NOT SAME AS FIRST
            if (!(pos1 == i && pos2 == index) && proceed) {
                console.log("Inside");

                $scope.test[i][index] = !$scope.test[i][index];

                //CHECK IF SECOND TOUCH IS NOT SAME AS FIRST
                if (!(pos1 == i && pos2 == index) && proceed) {


                    $scope.test[i][index] = !$scope.test[i][index];

                    var reset = function () {
                        console.log("reset");
                        $scope.bind[i][index] = $scope.numbers2[i][index].id;
                        $scope.bind[pos1][pos2] = $scope.numbers2[pos1][pos2].id;
                        $scope.test[i][index] = !$scope.test[i][index];
                        $scope.test[pos1][pos2] = !$scope.test[pos1][pos2];
                        emptyfields();
                    };
                    $scope.tries += 1;
                    console.log("inside function");
                    count = count + 1;
                    $scope.moves = Math.floor($scope.tries / 2);

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


                    if (count == 1) {
                        a = check.indexOf(first);
                        console.log(a);

                    };
                    if (a != -1) {
                        proceed = 0;
                        emptyfields();

                    };

                    if (count == 2) {
                        b = check.indexOf(second);
                        console.log(b);

                    };
                    if (b != -1) {
                        count = 1;
                        second = "";

                    };




                    if (first != second && count == 2) {
                        proceed = 0;

                        $interval(reset, 1000, 1);
                    };
                    if (count == 2 && first == second) {
                        check.push(first);
                        check.push(second);
                        $scope.correct += 1;
                        console.log($scope.correct);
                        if ($scope.correct == 8) {
                            $scope.showPopup("Congratulations! you completed in " + (60 - $scope.time) + " seconds." + "<br/>" + "You made " + ($scope.tries) / 2 + " attempts in all.");
                            $scope.totalcompleted = $.jStorage.get("totalcompleted");
                            $scope.totalcompleted += 1;
                            $.jStorage.set("totalcompleted", $scope.totalcompleted);
                            $interval.cancel(timer);

                        };
                        proceed = 0;
                        emptyfields();


                    };
                };
            };

        };
    };


})

.controller('PlaylistCtrl', function ($scope, $stateParams) {})