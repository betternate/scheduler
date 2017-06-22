var timexe = require('timexe');
var request = require('request');

// Constructor
function Task(name, info) {
  this.name = name;
  this.creationTime = new Date();
  this.startTime = info.startTime;
  this.timeExpression = info.timeExpression;
  this.job = info.job;

  if (this.startTime) {
    this.startTimexeId = timexe(this.startTime, () => {this.timexeId = timexe(this.timeExpression, this.execute.bind(this));});
  } else {
    this.timexeId = timexe(this.timeExpression, this.execute.bind(this));
  }
};

Task.prototype.execute = function() {
  console.log(`Executing task ${this.name}:\n${JSON.stringify(this.job)}`);
  request(this.job, this.handleResult.bind(this));
};

Task.prototype.stop = function() {
  console.log(`Stopping task ${this.name}`);
  timexe.remove(this.timexeId);
  timexe.remove(this.startTimexeId);
};

Task.prototype.handleResult = function(error, response, body) {
  console.log(`Task ${this.name} result:\nstatus code: ${response.statusCode}\nbody: ${JSON.stringify(body)}`);
}

module.exports = Task;
