// Constants
const SHOPPING_LIST = 'shoppingList'

// Variables
let isUpdate = false
let editedItemText = ''
let editedItem

// Elements
const addItemForm = document.querySelector('#add-item-form')
const list = document.querySelector('#item-list')
const clearAllButton = document.querySelector('#clear-all')
const filter = document.querySelector('#filter')
const inputItem = document.querySelector('#input-item')
const submitButton = document.querySelector('button[type=submit]')

// Load data from localStorage
function loadData() {
  const shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
  const items = shoppingList.map((item) => {
    return createListItem(item)
  })
  if (list) {
    list.innerHTML = ''
    items.forEach((item) => {
      list.appendChild(item)
    })
  }
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
      // Add item into localStorage
      addItemIntoLocalStorage(text, SHOPPING_LIST)
      // Add item into DOM
      addItemIntoDOM(text, list)
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

// Filter item
function filterItem(e) {
  let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
  if (shoppingList.length > 0) {
    shoppingList = shoppingList.filter((item) =>
      item.toLowerCase().includes(e.target.value.toLowerCase())
    )
    list.innerHTML = ''
    shoppingList.forEach((item) => {
      const li = createListItem(item)
      list.appendChild(li)
    })
  }
}

// Remove item
function removeItem(e) {
  if (e.target.tagName === 'I') {
    const li = e.target.parentElement.parentElement
    // Remove item in localStorage
    let list = JSON.parse(localStorage.getItem(SHOPPING_LIST))
    if (list) {
      list = list.filter((item) => item !== li.textContent)
      localStorage.setItem(SHOPPING_LIST, JSON.stringify(list))
    }
    // Remove item in DOM
    li.remove()
  }
}

// Clear all items
function clearAll() {
  // Remove shopping list in localStorage
  localStorage.removeItem(SHOPPING_LIST)
  // Remove list items in DOM
  if (list) {
    list.innerHTML = ''
  }
}

// Add item into DOM
function addItemIntoDOM(text, list) {
  const item = createListItem(text)
  if (list) {
    list.appendChild(item)
  }
}

// Add item into localStorage
function addItemIntoLocalStorage(itemText, shoppingList) {
  const list = JSON.parse(localStorage.getItem(shoppingList)) || []
  list.push(itemText)
  localStorage.setItem(shoppingList, JSON.stringify(list))
}

// Create a list item
function createListItem(text = 'item') {
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

// Add event listeners to elements

// DOMContentLoaded event
window.addEventListener('DOMContentLoaded', loadData)

// Add an item
if (addItemForm) {
  addItemForm.addEventListener('submit', addOrUpdateItem)
}

// Clear all items
if (clearAllButton) {
  clearAllButton.addEventListener('click', clearAll)
}

// Remove item
if (list) {
  list.addEventListener('click', removeItem)
  list.addEventListener('click', prepareUpdateItem)
}

// Filter item
if (filter) {
  filter.addEventListener('keyup', filterItem)
}
