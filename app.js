// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')
const filterOption = document.querySelector('.filter-todo')

// Event Listeners
// document.addEventListener('DOMContentLoaded', getLocalTodos)
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', checkButton)
filterOption.addEventListener('change', filterTodo)

// Functions
function addTodo(e) {
  e.preventDefault()
  
  // structure => div.todo>li+button*2>i
  // Create div.todo
  const todoDiv = document.createElement('div')
  todoDiv.classList.add('todo')

  // Create li.todo-item
  const newTodo = document.createElement('li')
  newTodo.classList.add('todo-item')
  newTodo.innerText = todoInput.value
  // Insert li in div.todo
  todoDiv.appendChild(newTodo)

  // Create check button
  const completedButton = document.createElement('button')
  completedButton.classList.add('complete-btn')
  completedButton.innerHTML = '<i class="fas fa-check"></i>'
  // Insert button in div.todo
  todoDiv.appendChild(completedButton)

  // Create trash button
  const trashButton = document.createElement('button')
  trashButton.classList.add('trash-btn')
  trashButton.innerHTML = '<i class="fas fa-trash"></i>'
  // Insert button in div.todo
  todoDiv.appendChild(trashButton)

  // Insert div.todo in ul.todo-list
  todoList.appendChild(todoDiv)

  // Add todo to localstrage
  saveLocalTodos(todoInput.value)
  // Clear Todo input value
  todoInput.value = ''
}

function checkButton(e) {
  const item = e.target
  const checkTrashButton = item.classList.contains('trash-btn')
  const checkCompleteuButton = item.classList.contains('complete-btn')
  const list = item.parentElement
  const text = list.children[0].innerText

  // Delete Todo
  if (checkTrashButton) {
    list.classList.add('fall')
    removeLocalTodos(text)
    list.addEventListener('transitionend', function() {
      list.remove()
    })
  }
  
  // Check todo
  if (checkCompleteuButton) {
    list.classList.toggle('completed')

    const isCompleted = list.classList.contains('completed')
    const status = isCompleted ? 'completed' : 'uncompleted'
    updateLocalTodos(text, status)
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
  const localStorageExists = localStorage.getItem('todos') !== null
  const todos = localStorageExists ? JSON.parse(localStorage.getItem('todos')) : []
  const status = 'uncompleted'
  const saveData = {todo, status}
  todos.push(saveData)
  localStorage.setItem("todos", JSON.stringify(todos))
}

function updateLocalTodos(text, status) {
  const todos = JSON.parse(localStorage.getItem('todos'))
  const index = todos.findIndex(({todo}) => todo === text)
  todos[index].status = status
  localStorage.setItem("todos", JSON.stringify(todos))
}

function getLocalTodos() {
  const localStorageExists = localStorage.getItem('todos') !== null
  const todos = localStorageExists ? JSON.parse(localStorage.getItem('todos')) : []
  
  todos.forEach((todo) => {
    // Create div.todo
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    // Create li
    const newTodo = document.createElement('li')
    newTodo.innerText = todo
    newTodo.classList.add('todo-item')
    // Insert li in div.todo
    todoDiv.appendChild(newTodo)

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
  })
}

function removeLocalTodos(text) {
  const todos = JSON.parse(localStorage.getItem('todos'))
  const index = todos.findIndex(({todo}) => todo === text)
  todos.splice(index, 1)
  localStorage.setItem('todos', JSON.stringify(todos))
}