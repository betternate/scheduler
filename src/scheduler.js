var Task = require("./task");

// Constructor
function Scheduler() {
  var tasks = {};

  this.addTask = function(newTasks) {
    const tasks_length = this.getAmountOfTasks();
    var taskMap = Object.keys(newTasks).map((name) => {tasks[name] = new Task(name, newTasks[name]);});

    return (this.getAmountOfTasks() - tasks_length);
  };

  this.getAllTasks = function() {
    return tasks;
  };

  this.getAmountOfTasks = function() {
    return Object.keys(tasks).length;
  }

  this.getTask = function(name) {
    return tasks[name];
  };

  this.getTasks = function(names) {
    return names.map((name) => {return tasks[name];});
  };

  this.removeTask = function(name) {
    if (tasks[name]) {
      tasks[name].stop();
      delete tasks[name];
    }
  };

  this.addTask({'default': {
                    'timeExpression': '* * * 8-18 /1',
                    'job': {
                      'url': `${process.env.HOST}/jobs/hello`,
                    }
                  }
               });
}

// node.js module export
module.exports = new Scheduler();
