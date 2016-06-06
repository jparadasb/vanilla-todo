(function(window, undefined){
  'use strict';
  window.addEventListener('load', function load(event){
    window.removeEventListener('load', load, false);
    window.todoListApp = todoListApp;
    todoListApp();
  });

  var todoListApp = function () {};
  todoListApp.tasks = getTasksFromLocalStorage();
  todoListApp.saveButton = document.getElementById('save_task');
  todoListApp.taskListsElement = document.getElementById('tasks_list');

  todoListApp.saveButton.addEventListener( 'click', saveButton, false );
  todoListApp.taskListsElement.addEventListener( 'click', dispachEvents, false);

  drawTasks();

  function dispachEvents ( event ) {
    console.log(event);
  }

  function saveButton ( event ) {
    event.preventDefault();
    var newTask = document.getElementById('new_task');

    if ( newTask.value.length > 0 ) {
      todoListApp.tasks.push({
        id: ramdomId(),
        description: newTask.value
      });
      resetInput(newTask);
      drawTasks();
      saveInLocalStorage();
    }
  }

  function resetInput(element) {
    element.value = '';
  }

  function saveInLocalStorage() {
    var taskString = JSON.stringify(todoListApp.tasks);
    localStorage.setItem('tasks', taskString);
  }

  function getTasksFromLocalStorage() {
    var taskString = localStorage.getItem('tasks');
    if (taskString) {
      return JSON.parse(taskString);
    } else {
      return [];
    }
  }

  function drawTasks () {
    todoListApp.taskListsElement.innerHTML = '';
    todoListApp.tasks.forEach(function (task, index) {
      var taskElement = document.createElement('li');
      var taskDescription = document.createTextNode(task.description);
      taskElement.setAttribute('id', task.id);
      taskElement.appendChild(taskDescription);
      taskElement.appendChild(buildDeleteButton(task));
      todoListApp.taskListsElement.appendChild(taskElement);
    });
  }

  function buildTaskElement (element) {
    var taskElement = document.createElement('li');
  }

  function buildDeleteButton (target) {
    var deleteButton = document.createElement('button');
    var deleteIcon = document.createElement('span');
    deleteIcon.setAttribute('class', 'glyphicon glyphicon-remove-circle')
    deleteButton.setAttribute('action', 'DELETE');
    deleteButton.setAttribute('class', 'btn btn-danger');
    deleteButton.appendChild(deleteIcon);
    return deleteButton;
  }


  function ramdomId () {
    return Math.random().toString(36).substring(7);
  }


})(window);
