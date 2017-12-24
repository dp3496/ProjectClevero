// varible declaration
var taskname = "";
var taskdate = "";
var id = "";

// object with task info
exports.taskdata = function () {
    this.id = id;
    this.taskname = taskname;
    this.taskdate = taskdate;
}

// object with 3-day task info
exports.taskinfo = function () {
    this.yes = [];
    this.tod = [];
    this.tom = [];
}