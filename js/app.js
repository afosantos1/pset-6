window.onload = function() {

  const setupEventListeners = function() {

    let inputElement = document.getElementById("insert_button");
    inputElement.addEventListener('click', function(){
      let textInput = document.getElementById("textinput").value;
        addItem(textInput);
        let checkbox = document.getElementById("checkbox1").checked;
        if (checkbox) {
          movePriority(todos.length - 1);
        }
        displayTodos();
    });

    let todosUl = document.getElementById("list");
    todosUl.addEventListener('click', function(event) {

      let elementClicked = event.target;

      if (elementClicked.className === 'bttn_delete') {
        let pos = elementClicked.value;
        deleteItem(pos);
        displayTodos();
      }
      if (elementClicked.className === 'bttn_complete') {
        let pos = elementClicked.value;
        toggleComplete(pos);
        displayTodos();
      }
      if (elementClicked.className === 'bttn_priority') {
        let pos = elementClicked.value;
        movePriority(pos);
        displayTodos();
      }

    });
  }

  setupEventListeners();

}

let todos = [];

const addItem = function(todo) {

  todos.push({
    todoText: todo,
    highPriority: false,
    completed: false
  });

  let textInput = document.getElementById("textinput");
  textInput.value = '';
}

const deleteItem = function(pos) {
    todos.splice(pos, 1);
}

const toggleComplete = function(pos) {
  todos[pos].completed = !todos[pos].completed;
}

const movePriority = function(pos) {
  todos[pos].highPriority = !todos[pos].highPriority;
  let highPriority = todos[pos].highPriority;
  if (highPriority) {
    let temp = todos[pos];
    todos.splice(pos, 1);
    todos.unshift(temp);
  } else {
    let temp = todos[pos];
    todos.splice(pos, 1);
    todos.push(temp);
  }
}


const displayTodos = function() {
  let todosUl = document.getElementById("list");
  todosUl.innerHTML = '';

  todos.forEach((todo, pos) => {
    let todoLi = document.createElement('li');
    if (todos[pos].completed) {
      todoLi.style.color = "#00aa00";
      todoLi.style.textDecoration = "line-through";
    }
    todoLi.textContent += todo.todoText;
    todoLi.prepend(createPriorityImg(pos));
    todoLi.append(createCompleteImg(pos));
  //  todoLi.append(createCompleteButton(pos));
    todoLi.append(createDeleteImg(pos));

    todosUl.append(todoLi);
  });
}

const createDeleteImg = function (pos) {
  let deleteImg = document.createElement('img');
  deleteImg.src = "delete.jpg";
  deleteImg.className = 'bttn_delete';
  deleteImg.value = pos;

  return deleteImg;
}
/*
const createCompleteButton = function (pos) {
  let completeButton = document.createElement('button');
  if (todos[pos].completed) {
    completeButton.textContent = 'Mark incomplete';
  }
  else {
    completeButton.textContent = 'Mark completed';
  }
  completeButton.className = 'bttn_complete';
  completeButton.value = pos;
  return completeButton;
} */

const createCompleteImg = function (pos) {
  let completeImg = document.createElement('img');
  completeImg.className = 'bttn_complete';
  completeImg.value = pos;

  if (todos[pos].completed) {
    completeImg.src = "checkcomplete.jpg";
  }
  else {
    completeImg.src = "checkincomplete.png";
  }

  return completeImg;
}

const createPriorityImg = function (pos) {
  let priorityImg = document.createElement('img');
  if (todos[pos].highPriority) {
    priorityImg.src = "urgent.jpg";
  }
  else {
    priorityImg.src = "notimportant.jpg";
  }

  priorityImg.className = 'bttn_priority';
  priorityImg.value = pos;

  return priorityImg;
}
