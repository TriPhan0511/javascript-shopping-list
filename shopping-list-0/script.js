const itemForm = document.getElementById('item-form')
const itemInput = document.getElementById('item-input')
const itemList = document.getElementById('item-list')
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')

let isEditMode = false

function displayItems() {
  const itemsFromStorage = getItemsFromStorage()
  itemsFromStorage.forEach((item) => {
    addItemToDOM(item)
  })
  resetUI()
}

function onAddItemSubmit(e) {
  e.preventDefault()
  const newItem = itemInput.value.trim()
  const itemToEdit = itemList.querySelector('.edit-mode')
  // Validate input
  if (newItem === '') {
    alert('Please add an item')
    return
  }
  if (isEditMode && newItem.toLowerCase() === itemToEdit.textContent.toLowerCase()) {
    itemToEdit.classList.remove('edit-mode')
    resetUI()
    isEditMode = false
    return
  }
  if (checkIfItemExists(newItem)) {
    alert('That item already exists!')
    return
  }
  // Check for edit mode
  if (isEditMode) {
    removeItemFromStorage(itemToEdit.textContent)
    itemToEdit.classList.remove('edit-mode')
    itemToEdit.remove()
    isEditMode = false
  }
  // Create item DOM element
  addItemToDOM(newItem)
  // Add item to local storage
  addItemToStorage(newItem)
  // Reset UI
  resetUI()
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
  } else if (e.target.tagName === 'LI') {
    setItemToEdit(e.target)
  }
}

function checkIfItemExists(item) {
  return getItemsFromStorage()
    .map((i) => i.toLowerCase())
    .includes(item.toLowerCase())
}

function setItemToEdit(item) {
  isEditMode = true
  itemList.querySelectorAll('li').forEach((item) => item.classList.remove('edit-mode'))
  item.classList.add('edit-mode')
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i> Update Item'
  formBtn.style.backgroundColor = '#228B22'
  itemInput.value = item.textContent
  itemInput.focus()
}

document.createElement('li').classList.add

function removeItem(item) {
  if (confirm('Are you sure?')) {
    // Remove item from DOM
    item.remove()
    // Remove item from storage
    removeItemFromStorage(item.textContent)
    resetUI()
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
  resetUI()
}

function filterItems(e) {
  const text = e.target.value.trim().toLowerCase()
  const items = itemList.querySelectorAll('li')
  items.forEach((item) => {
    item.style.display = item.textContent.trim().toLowerCase().includes(text) ? 'flex' : 'none'
  })
}

function resetUI() {
  itemInput.value = ''
  const display = itemList.querySelectorAll('li').length === 0 ? 'none' : 'block'
  clearBtn.style.display = display
  itemFilter.style.display = display
  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item'
  formBtn.style.backgroundColor = '#333'
}

// Initialize app
function init() {
  // Event Listeners
  itemForm.addEventListener('submit', onAddItemSubmit)
  itemList.addEventListener('click', onClickItem)
  clearBtn.addEventListener('click', clearItems)
  itemFilter.addEventListener('input', filterItems)
  document.addEventListener('DOMContentLoaded', displayItems)

  resetUI()
}

init()
