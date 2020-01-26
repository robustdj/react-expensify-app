// Object destructuring

// const person = {
//   name: 'Derrick',
//   age: 33,
//   location: {
//     city: 'Sacramento',
//     temp: 32
//   }
// }

// const { name:firstName = 'Anonymous', age } = person
// console.log(`${firstName} is ${age}`)

// const { city, temp: temperature } = person.location

// if (city && temperature) {
//   console.log(`It's ${temperature} in ${city}`)
// }

// const book = {
//   title: 'Ego is the Enemy',
//   author: 'Ryan Holiday',
//   publisher: {
//     name: 'Penguin'
//   }
// }

// Grab name from book.publisher and use the publisherName var name
// if no value, then use 'Self-Published'
// const { name: publisherName = 'Self-Published' } = book.publisher

// console.log(publisherName)

// Array destructuring

// const address = ['1299 S Juniper Street', 'Philadelphia', 'Pennsylvania', '19147']
const address = []

const [, , state = 'New York'] = address

console.log(`you are in ${state}`)

const item = ['Coffee (hot)', '$2.00', '$2.50', '$2.75']
const [coffee, , mediumPrice] = item

console.log(`A medium ${coffee} costs ${mediumPrice}`)