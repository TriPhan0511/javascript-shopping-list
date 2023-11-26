const addItemButton = document.querySelector('#add-item')
const getItemButton = document.querySelector('#get-item')
const removeItemButton = document.querySelector('#remove-item')
const clearItemsButton = document.querySelector('#clear')

// const addItemButton = document.querySelector('#add-item')
// // const getItemButton = document.querySelector('#get-item')
// // const removeItemButton = document.querySelector('#remove-item')

addItemButton.addEventListener('click', () => {
  localStorage.setItem('name', 'Tri Phan')
  alert('An item was added into Local Storage')
})

getItemButton.addEventListener('click', () => {
  const key = 'name'
  const value = localStorage.getItem(key)
  if (value) {
    alert(`${key} : ${value}`)
    return
  }
  alert(`The key: ${key} NOT exist in Local Storage.`)
})

removeItemButton.addEventListener('click', () => {
  localStorage.removeItem('name')
  alert('An item was removed from Local Storage')
})

clearItemsButton.addEventListener('click', () => {
  localStorage.clear()
  alert('All items in Local Storage was cleared!')
})
// ---------------------------------------------

const userArray = ['John Doe', 25]
localStorage.setItem('user', JSON.stringify(userArray))

// const user = localStorage.getItem('user')
let user = localStorage.getItem('user')
// console.log(user)
// console.log(JSON.parse(user))
// if (user) {
//   user = JSON.parse(user)
//   console.log(user)
//   console.log(user[0])
//   console.log(user[1])
// }

const jane = {
  name: 'Jane',
  age: 30,
}

localStorage.setItem('jane', JSON.stringify(jane))

let person = localStorage.getItem('jane')
if (person) {
  person = JSON.parse(person)
  // console.log(person)
  // console.log(person.age)
  // console.log(person.name)
}

// console.log(JSON.parse(localStorage.key(1)))
// console.log(JSON.parse(localStorage.key(1)))
// console.log(JSON.parse(localStorage.key('jane')))

// console.log(localStorage.key(1))
// console.log(localStorage.getItem(localStorage.key(1)))
// console.log(JSON.parse(localStorage.getItem(localStorage.key(1))))
// console.log(JSON.parse(localStorage.getItem(localStorage.key(1)))[0])
// console.log(JSON.parse(localStorage.getItem(localStorage.key(0))).name)

console.log(localStorage.key(1))
