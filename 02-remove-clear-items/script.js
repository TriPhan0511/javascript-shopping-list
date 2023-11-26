// Constants
const SHOPPING_LIST = 'shoppingList'

// Elements
const addItemForm = document.querySelector('#add-item-form')
const list = document.querySelector('#item-list')
const clearAllButton = document.querySelector('#clear-all')

// Remove item
function removeItem(e) {
  if (e.target.tagName === 'I') {
    const li = e.target.parentElement.parentElement
    // Remove item in localStorage
    let list = JSON.parse(localStorage.getItem(SHOPPING_LIST))
    if (list) {
      list = list.filter((item) => item !== li.textContent)
      console.log(list)
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

// Add item into localStorage and DOM
function addItem(e) {
  e.preventDefault()
  // Get item's title from form input
  const inputItem = document.querySelector('#input-item')
  if (inputItem) {
    const text = inputItem.value.trim()
    if (text === '') {
      alert('Please enter an item!')
      return
    }
    addItemIntoLocalStorage(text, SHOPPING_LIST) // Add item into localStorage
    addItemIntoDOM(text, list) // Add item into DOM
    inputItem.value = '' // Reset form's input
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
  console.log(list)
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
window.addEventListener('DOMContentLoaded', () => {
  const shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
  const items = shoppingList.map((item) => {
    return createListItem(item)
  })
  items.forEach((item) => {
    list.appendChild(item)
  })
})

// Add an item
if (addItemForm) {
  addItemForm.addEventListener('submit', addItem)
}

// Clear all items
if (clearAllButton) {
  clearAllButton.addEventListener('click', clearAll)
}

// Remove item
if (list) {
  list.addEventListener('click', removeItem)
}
