$(document).ready(function () {
    $('#datepicker').datepicker();
});

angular.module('myApp', [])
    .controller('myCntrl', ['$scope', function ($scope) {
        $scope.myFunc = function () {
            var xhttp = new XMLHttpRequest();
            var x = document.getElementById("demo");
            xhttp.onreadystatechange = function () {
                x.innerHTML = "";
                if (this.readyState == 4 && this.status == 200) {
                    var a = JSON.parse(this.responseText);
                    for (var i = 0; i < a.sres.length; i++) {
                        var element = a.sres[i];
                        x.innerHTML += element.taskname + "<br />" + element.taskdate + "<br />";
                    }
                    if (a.sres != 0) {
                        x.style.display = "block";
                    }
                    else {
                        x.style.display = "none";
                    }
                }
            };
            xhttp.open("GET", "search?q=" + $scope.myValue, true);
            xhttp.send();
        }
    }]);


function taskloader() {
    var xhttp = new XMLHttpRequest();
    var x = document.getElementById("yes");
    var y = document.getElementById("tod");
    var z = document.getElementById("tom");

    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var r = JSON.parse(this.responseText);
            for (var i = 0; i < r.yes.length; i++) {
                var e = r.yes[i];
                x.innerHTML += (i == r.yes.length - 1) ? e.taskname + " " + e.taskdate : e.taskname + " " + e.taskdate + "<br />";
            }
            for (var i = 0; i < r.tod.length; i++) {
                var e = r.tod[i];
                y.innerHTML += i == r.tod.length - 1 ? e.taskname + " " + e.taskdate : e.taskname + " " + e.taskdate + "<br />";
            }
            for (var i = 0; i < r.tom.length; i++) {
                var e = r.tom[i];
                z.innerHTML += i == r.tom.length - 1 ? e.taskname + " " + e.taskdate : e.taskname + " " + e.taskdate + "<br />";
            }
            if (r.yes.length == 0)
                x.innerHTML = "No Tasks";
            if (r.tod.length == 0)
                y.innerHTML = "No Tasks";
            if (r.tom.length == 0)
                z.innerHTML = "No Tasks";
        }
    };
    xhttp.open("GET", "/taskview", true);
    xhttp.send();
}