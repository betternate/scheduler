var express = require('express');
var bodyParser  = require('body-parser');
var scheduler = require('./src/scheduler');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded()); // to support URL-encoded bodies

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.get('/jobs/hello', function(request, response) {
  response.send("Hello!");
});

app.get('/jobs/bye', function(request, response) {
  response.send("Bye Bye!");
});

app.get('/jobs/test', function(request, response) {
  proArr = [];
  proArr.push(new Promise((resolve, reject) => {resolve(1);}));
  Promise.all(proArr).then((result) => {
    response.send({text:result});
  });
});

app.get('/tasks', function(request, response) {
  response.send(scheduler.getAllTasks());
});

app.get('/tasks/:name', function(request, response) {
  response.send(scheduler.getTask(request.params.name));
});

app.post('/tasks', function(request, response) {
  scheduler.addTask(request.body);
  response.statusCode = 201;
  response.send(scheduler.getTasks(Object.keys(request.body)));
});

app.put('/tasks/:name', function(request, response) {
  var task = {};
  task[request.params.name] = request.body;
  scheduler.addTask(task);
  response.send(scheduler.getTask(request.params.name));
});

app.delete('/tasks/:name', function(request, response) {
  scheduler.removeTask(request.params.name);
  response.statusCode = 204;
  response.send();
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
