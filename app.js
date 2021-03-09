// Selectors
const todoInput = document.querySelector('.todo-input')
const todoButton = document.querySelector('.todo-button')
const todoList = document.querySelector('.todo-list')

// Event Listeners
todoButton.addEventListener('click', addTodo)
todoList.addEventListener('click', deleteCheck)

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

function deleteCheck(e) {
  const item = e.target
  const list = item.parentNode
  // Delete Todo
  if (item.classList.contains('trash-btn')) {
    list.remove()
  }
}