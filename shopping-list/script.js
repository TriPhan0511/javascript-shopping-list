// Constants
const SHOPPING_LIST = 'shoppingList'

// Varibale
let isUpdate = false

// Elements
const addItemForm = document.querySelector('#add-item-form')
const list = document.querySelector('#item-list')
const clearAllButton = document.querySelector('#clear-all')
const filter = document.querySelector('#filter')

// Update item
function updateItem(e) {
  if (e.target.tagName === 'LI') {
    // console.log(e.type)
    const inputItem = document.querySelector('#input-item')
    if (inputItem) {
      const text = e.target.textContent
      inputItem.value = text
      inputItem.focus()
      const submitButton = document.querySelector('button[type=submit]')
      if (submitButton) {
        submitButton.innerHTML = ''
        submitButton.appendChild(createIcon('fa-solid fa-check'))
        submitButton.appendChild(document.createTextNode(' Update'))
        isUpdate = true
        // let shoppingList = JSON.parse(localStorage.getItem(SHOPPING_LIST)) || []
        // shoppingList.map((item) => {
        //   if (item === text) {
        //     item = inputItem.value
        //   }
        // })
      }
    }
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

// Add item into localStorage and DOM
function addItem(e) {
  e.preventDefault()
  // Get item's title from form input
  const inputItem = document.querySelector('#input-item')
  if (inputItem) {
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
    // Reset and set focus form's input
    inputItem.value = ''
    inputItem.focus()
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
  list.addEventListener('click', updateItem)
}

// Filter item
if (filter) {
  filter.addEventListener('keyup', filterItem)
}
