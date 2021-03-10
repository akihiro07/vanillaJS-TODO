// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', checkButton)
filterOption.addEventListener('change', filterTodo)

// Functions
function addTodo(e) {
  e.preventDefault()
  // Create div.todo
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  // Create li
  const newTodo = document.createElement('li')
  newTodo.innerText = todoInput.value
  newTodo.classList.add('todo-item')
  // Insert li in div.todo
  todoDiv.appendChild(newTodo)

  // Add todo to localstrage
  saveLocalTodos(todoInput.value)

  // // Create button
  // const button = document.createElement('button')

  // CHECK MARK BUTTON
  const completedButton = document.createElement('button')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  completedButton.classList.add('complete-btn')
  // Insert li in div.todo
  todoDiv.appendChild(completedButton)

  // CHECK TRASH BUTTON
  const trashButton = document.createElement('button')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  trashButton.classList.add('trash-btn')
  // Insert li in div.todo
  todoDiv.appendChild(trashButton)

  // Insert div.todo in ul.todo-list
  todoList.appendChild(todoDiv)

  // Clear Todo input value
  todoInput.value = ''
}

function checkButton(e) {
  const item = e.target
  const list = item.parentElement
  // Delete Todo
  if (item.classList.contains('trash-btn')) {
    list.classList.add('fall')
    list.addEventListener('transitionend', function() {
      list.remove()
    })
  }
  
  // Check todo
  if (item.classList.contains('complete-btn')) {
    list.classList.toggle('completed')
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes
  todos.forEach(function(todo) {
    const filterFlag = e.target.value
    const isCompleted = todo.classList.contains('completed')

    switch (filterFlag) {
      case 'all':
        todo.style.display = 'flex'
        break;
      case 'completed':
        if (isCompleted) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break;
      case 'uncompleted':
        if (!isCompleted) {
          todo.style.display = 'flex'
        } else {
          todo.style.display = 'none'
        }
        break;
    }
  })
}

function saveLocalTodos(todo) {
  let todos
  console.log(localStorage.getItem('todos'))
  if (localStorage.getItem('todos') === null) {
    todos = []
  } else {
    todos = JSON.parse(localStorage.getItem('todos'))
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos))
}

// TODO：remove localstrage when delete todo list