// Constants
const SHOPPING_LIST = 'shoppingList'

// Variables
let isUpdate = false
let editedItemText = ''
let editedItem

// Elements
const container = document.querySelector('.container')
const addItemForm = document.querySelector('#add-item-form')
const inputItem = document.querySelector('#input-item')
const submitButton = document.querySelector('button[type=submit]')

// Add DOMContentLoaded event listeners to window object
window.addEventListener('DOMContentLoaded', () => {
  loadData()
  if (addItemForm) {
    addItemForm.addEventListener('submit', addOrUpdateItem)
  }
})

function appendAndAddEventListenersToElements(container, filter, list, clearButton) {
  // Append elements into DOM
  container.appendChild(filter)
  container.appendChild(list)
  container.appendChild(clearButton)
  // Add event listeners to elements
  clearButton.addEventListener('click', () => {
    clearAll(filter, list, clearButton)
  })
  list.addEventListener('click', (e) => {
    removeItem(e, list, filter, clearButton)
  })
  list.addEventListener('click', prepareUpdateItem)
  filter.addEventListener('keyup', (e) => {
    filterItems(e, list)
  })
}

// Load data from localStorage
function loadData() {
  const shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
  if (shoppingList.length !== 0) {
    appendAndAddEventListenersToElements(
      container,
      createFilterDiv(),
      createList(shoppingList),
      createClearButton()
    )
  }
}

// Add/Update item in localStorage and DOM
function addOrUpdateItem(e) {
  e.preventDefault()
  // Get item's title from form input
  const inputItem = document.querySelector('#input-item')
  if (inputItem) {
    if (!isUpdate) {
      // Add new item
      const text = inputItem.value.trim()
      // Check if user enter something or not
      if (text === '') {
        alert('Please enter an item!')
        return
      }
      // Check if item exists in list or not
      const shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST))
      if (shoppingList) {
        if (shoppingList.map((item) => item.toLowerCase()).includes(text.toLowerCase())) {
          alert(`The item ${text} has already existed in the list.`)
          return
        }
      }
      addItem(text, SHOPPING_LIST)
    } else {
      // Update an item
      let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
      shoppingList = shoppingList.map((item) => {
        if (item === editedItemText) {
          item = inputItem.value.trim()
        }
        return item
      })
      localStorage.setItem(SHOPPING_LIST, JSON.stringify(shoppingList))
      editedItem.innerText = inputItem.value.trim()
      submitButton.innerHTML = ''
      submitButton.appendChild(createIcon('fa-solid fa-plus'))
      submitButton.appendChild(document.createTextNode(' Add Item'))
      isUpdate = false
    }
    // Reset and set focus form's input
    inputItem.value = ''
    inputItem.focus()
  }
}

function addItem(text, shoppingList) {
  // Add item into localStorage
  addItemIntoLocalStorage(text, shoppingList)
  // Add item into DOM
  let list = document.querySelector('#item-list')
  if (list) {
    addItemIntoList(text, list)
  } else {
    list = document.createElement('ul')
    list.setAttribute('id', 'item-list')
    addItemIntoList(text, list)
    appendAndAddEventListenersToElements(container, createFilterDiv(), list, createClearButton())
  }
}

// Add item into list
function addItemIntoList(text, list) {
  const item = createItem(text)
  if (list) {
    list.appendChild(item)
  }
}

function createList(shoppingList) {
  const list = document.createElement('ul')
  list.setAttribute('id', 'item-list')
  shoppingList
    .map((item) => createItem(item))
    .forEach((item) => {
      list.appendChild(item)
    })
  return list
}

function createFilterDiv() {
  const div = document.createElement('div')
  div.className = 'filter'
  const inp = document.createElement('input')
  inp.className = 'form-input-filter'
  inp.setAttribute('type', 'text')
  inp.setAttribute('name', 'filter')
  inp.setAttribute('id', 'filter')
  inp.setAttribute('placeholder', 'Filter Items')
  div.appendChild(inp)
  return div
}

function createClearButton() {
  const button = document.createElement('button')
  button.setAttribute('id', 'clear-all')
  button.className = 'clear-all'
  button.appendChild(document.createTextNode('Clear All'))
  return button
}

// Update item
function prepareUpdateItem(e) {
  if (e.target.tagName === 'LI') {
    editedItem = e.target
    editedItemText = e.target.textContent
    if (inputItem) {
      inputItem.value = e.target.textContent
      inputItem.focus()
    }
    // const submitButton = document.querySelector('button[type=submit]')
    if (submitButton) {
      submitButton.innerHTML = ''
      submitButton.appendChild(createIcon('fa-solid fa-check'))
      submitButton.appendChild(document.createTextNode(' Update'))
      isUpdate = true
    }
  }
}

// Remove item
function removeItem(e, list, filter, clearButton) {
  if (e.target.tagName === 'I') {
    const li = e.target.parentElement.parentElement
    // Remove item in localStorage
    let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST))
    if (shoppingList) {
      shoppingList = shoppingList.filter((item) => item !== li.textContent)
      localStorage.setItem(SHOPPING_LIST, JSON.stringify(shoppingList))
    }
    // Remove item in DOM
    li.remove()
    // Check
    const items = list.querySelectorAll('li')
    if (items.length === 0) {
      removeElements(filter, list, clearButton)
    }
  }
}

function removeElements(filter, list, clearButton) {
  filter.remove()
  list.remove()
  clearButton.remove()
}

// Clear all items
function clearAll(filter, list, clearButton) {
  // Remove shopping list from localStorage
  localStorage.removeItem(SHOPPING_LIST)
  // Remove elements from DOM
  removeElements(filter, list, clearButton)
}

// Filter items
function filterItems(e, list) {
  let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
  if (shoppingList.length > 0) {
    shoppingList = shoppingList.filter((item) =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    )
    list.innerHTML = ''
    shoppingList.forEach((item) => {
      const li = createItem(item)
      list.appendChild(li)
    })
  }
}

// Add item into localStorage
function addItemIntoLocalStorage(itemText, shoppingList) {
  const list = JSON.parse(localStorage.getItem(shoppingList)) || []
  list.push(itemText)
  localStorage.setItem(shoppingList, JSON.stringify(list))
}

// Create a list item
function createItem(text = 'item') {
  const item = document.createElement('li')
  item.appendChild(document.createTextNode(text))
  item.appendChild(createButton('remove-item btn-link red-text'))
  return item
}

// Create a button
function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  const icon = createIcon('fa-solid fa-xmark')
  button.appendChild(icon)
  return button
}

// Create an icon
function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}
