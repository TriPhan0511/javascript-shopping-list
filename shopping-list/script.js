// Constants
const SHOPPING_LIST = 'shoppingList'
const LIST_ID = 'item-list'

// Variables
let isUpdated = false
let editedText = ''

window.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container')
  const form = document.querySelector('#add-item-form')
  const input = document.querySelector('#input-item')
  const shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
  if (shoppingList.length > 0) {
    loadData(shoppingList, container)
  }
  if (container && form && input) {
    form.addEventListener('submit', (e) => {
      addItem(e, input, container)
    })
    form.addEventListener('submit', (e) => {
      updateItem(e)
    })
  }
})

function updateItem(e) {
  e.preventDefault()
  if (isUpdated) {
    // console.log(editedText)
    const input = document.querySelector(`#${LIST_ID}`)
    let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
    shoppingList = shoppingList.map((item) => {
      if (item === editedText) {
        // item =
      }
    })
  }
}

function editItem(e) {
  if (e.target.tagName === 'LI') {
    const input = document.querySelector('#input-item')
    const button = document.querySelector('form#add-item-form button[type=submit]')
    button.innerHTML = ''
    const icon = document.createElement('i')
    icon.className = 'fa-solid fa-check'
    button.appendChild(icon)
    button.appendChild(document.createTextNode(' Update'))
    input.value = e.target.textContent
    editedText = e.target.textContent
    isUpdated = true
  }
}

// function loadData(shoppingList, container) {
function loadData(shoppingList, container, form, input) {
  const { list } = createElements(container)
  // const { list } = createElements(container)
  shoppingList.forEach((text) => {
    const item = createItem(text)
    list.appendChild(item)
  })
}

// function createElements(container) {
function createElements(container) {
  // Create elements
  const filter = createFilter()
  const list = createList(LIST_ID)
  const clearButton = createClearButton()
  // Append elements into DOM
  container.appendChild(filter)
  container.appendChild(list)
  container.appendChild(clearButton)
  // Add event listeners to elemnts
  list.addEventListener('click', removeItem)
  list.addEventListener('click', (e) => {
    editItem(e)
  })
  clearButton.addEventListener('click', clearItems)
  filter.addEventListener('keyup', filterItems)
  return { list, filter, clearButton }
}

function filterItems(e) {
  const list = document.querySelector(`#${LIST_ID}`)
  let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
  shoppingList = shoppingList.filter((item) => item.includes(e.target.value))
  list.innerHTML = ''
  shoppingList.forEach((text) => {
    list.appendChild(createItem(text))
  })
}

function clearItems(e) {
  // Remove all of items from localStorage
  localStorage.removeItem(SHOPPING_LIST)
  // Remove elements from DOM
  const clearButton = e.target
  const list = clearButton.previousElementSibling
  const filter = list.previousElementSibling
  list.querySelectorAll('li').forEach((item) => item.remove())
  list.remove()
  filter.remove()
  clearButton.remove()
}

function removeItem(e) {
  if (e.target.tagName === 'I') {
    const li = e.target.parentElement.parentElement
    // Remove item from localStorage
    let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
    shoppingList = shoppingList.filter((item) => item !== li.textContent)
    localStorage.setItem(SHOPPING_LIST, JSON.stringify(shoppingList))
    if (shoppingList.length === 0) {
      localStorage.removeItem(SHOPPING_LIST)
      // Remove elements from DOM
      const ul = li.parentElement
      ul.previousElementSibling.remove()
      ul.nextElementSibling.remove()
      ul.remove()
    }
    li.remove()
  }
}

function addItem(e, input, container) {
  e.preventDefault()
  if (!isUpdated) {
    const text = input.value.trim()
    const shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
    // Validate
    if (text === '') {
      alert('Please enter an item!')
      return
    }
    if (shoppingList.includes(text)) {
      alert(`Item "${text}" has already been in shopping list.`)
      return
    }
    // Add item into localStorage
    shoppingList.push(text)
    localStorage.setItem(SHOPPING_LIST, JSON.stringify(shoppingList))
    // Add item into DOM
    const item = createItem(text)
    const list = document.querySelector(`#${LIST_ID}`)
    if (list) {
      list.appendChild(item)
    } else {
      const { list } = createElements(container)
      list.append(item)
    }
    // Reset
    input.value = ''
    input.focus()
  }
}

function createClearButton() {
  const button = document.createElement('button')
  button.appendChild(document.createTextNode('Clear All'))
  button.className = 'clear-all'
  button.setAttribute('id', 'clear-all')
  return button
}

function createList(id) {
  const ul = document.createElement('ul')
  ul.setAttribute('id', id)
  return ul
}

function createFilter() {
  const filter = document.createElement('div')
  filter.className = 'filter'
  const input = document.createElement('input')
  input.className = 'form-input-filter'
  input.setAttribute('id', 'filter')
  input.setAttribute('type', 'text')
  input.setAttribute('name', 'filter')
  input.setAttribute('placeholder', 'Filter Items')
  filter.appendChild(input)
  return filter
}

function createItem(text) {
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(text))
  li.appendChild(createButton())
  return li
}

function createButton() {
  const button = document.createElement('button')
  button.className = 'remove-item btn-link red-text'
  button.appendChild(createIcon())
  return button
}

function createIcon() {
  const icon = document.createElement('i')
  icon.className = 'fa-solid fa-xmark'
  return icon
}
