
// modules
var url = require('url');
var app = require('express')();
var fs = require("fs");
var serve = require('serve-static');
var http = require('http').Server(app);
var path = require('path');
var taskjson = require('./myjson');
var datechange = require('./mydatechn');
app.use(serve(path.join(__dirname, 'public')));


// custom database inclusion
var content = fs.readFileSync("data.json");
content = JSON.parse(content);

var taskdata = new taskjson.taskdata();

// first block
app.get('/', function (req, res) {
  res.sendfile('index.html');
});

// block to handle task
app.get('/update', function (req, res) {
  var i = content.id;
  var url1 = url.parse(req.url, true);
  var url1 = url1.query;
  if (url1.taskname != null && url1.taskdate != null) {
    i = i + 1;
    taskdata.id = i;
    taskdata.taskname = url1.taskname;
    taskdata.taskdate = url1.taskdate;
    taskdata = JSON.parse(JSON.stringify(taskdata));
    content.task.push(taskdata);
    content.id = i;
    var constr = JSON.stringify(content);
    fs.writeFileSync('data.json', constr, function (err) {
      if (err) throw err;
      console.log("failed");
    });
    taskdata = {};
  }
  res.redirect("/");
});

// block to search
app.get('/search', function (req, res) {
  var surl = url.parse(req.url, true);
  var surl = surl.query;
  var result = { "sres": [] };
  for (var i = 0; i < content.task.length; i++) {
    var element = content.task[i];
    if (element.taskname.toLowerCase() == surl.q.toLowerCase()) {
      result.sres.push(element);
    }
  }
  res.end(JSON.stringify(result));
});

// block to task view
app.get('/taskview', function (req, res) {
  var darr = datechange.datechange();
  var taskinfo = new taskjson.taskinfo();
  for (var i = 0; i < content.task.length; i++) {
    var element = content.task[i];
    var e = new Date(element.taskdate);
    if (darr[0] == e.toLocaleDateString()) {
      taskinfo["yes"].push(element);
    }

    if (darr[1] == e.toLocaleDateString()) {
      taskinfo["tod"].push(element);
    }

    if (darr[2] == e.toLocaleDateString()) {
      taskinfo["tom"].push(element);
    }
  }
  res.end(JSON.stringify(taskinfo));
});

// port configuration
http.listen(3000, function () {
  console.log('listening on *:3000');
});