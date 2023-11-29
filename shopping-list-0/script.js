const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item)
  })
  checkUI()
}

function onAddItemSubmit(e) {
  e.preventDefault()
  const newItem = itemInput.value
  // Validate input
  if (newItem === '') {
    alert('Please add an item')
    return
  }
  // Add item to DOM
  addItemToDOM(newItem)
  // Add item to local storage
  addItemToStorage(newItem)
  checkUI()
  // Reset
  itemInput.value = ''
}

function addItemToDOM(item) {
  // Create list item
  const li = document.createElement('li')
  li.appendChild(document.createTextNode(item))
  const button = createButton('remove-item btn-link text-red')
  li.appendChild(button)
  // Add li to the DOM
  itemList.appendChild(li)
}

function createButton(classes) {
  const button = document.createElement('button')
  button.className = classes
  button.appendChild(createIcon('fa-solid fa-xmark'))
  return button
}

function createIcon(classes) {
  const icon = document.createElement('i')
  icon.className = classes
  return icon
}

function addItemToStorage(item) {
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.push(item)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function getItemsFromStorage() {
  const itemsFromStorage = JSON.parse(localStorage.getItem('items')) || []
  return itemsFromStorage
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains('remove-item')) {
    removeItem(e.target.parentElement.parentElement)
  }
}

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove()
    // Remove item from storage
    removeItemFromStorage(item.textContent)
    checkUI()
  }
}

function removeItemFromStorage(item) {
  let itemsFromStorage = getItemsFromStorage()
  itemsFromStorage = itemsFromStorage.filter((text) => text !== item)
  localStorage.setItem('items', JSON.stringify(itemsFromStorage))
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild)
  }
  // Clear from local storage
  localStorage.removeItem('items')
  checkUI()
}

function filterItems(e) {
  const text = e.target.value.trim().toLowerCase()
  const items = itemList.querySelectorAll('li')
  items.forEach((item) => {
    item.style.display = item.textContent.trim().toLowerCase().includes(text) ? 'flex' : 'none'
  })
}

function checkUI() {
  const items = itemList.querySelectorAll('li')
  const display = items.length === 0 ? 'none' : 'block'
  clearBtn.style.display = display
  itemFilter.style.display = display
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit)
  itemList.addEventListener('click', onClickItem)
  clearBtn.addEventListener('click', clearItems)
  itemFilter.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)

  checkUI()
}

init()
