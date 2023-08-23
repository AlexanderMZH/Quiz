// let products;
// fetch('https://dummyjson.com/products')
//   .then((responce) => { return responce.json() })
//   .then((responce) => {
//     const { products } = responce
//     // for (let i = 0; i < products.length; i++) {
//     //   console.log(products[i].brand)
//     // }
//     console.log(products)
//   })
//   .catch((error) => {
//     console.log(error)
//   });

// fetch('https://dummyjson.com/products/1')
//   .then(res => res.json())
//   .then(console.log);

// fetch('https://dummyjson.com/products?limit=10&skip=10&select=title,price')
//   .then(res => res.json())
//   .then(console.log);

// const fetchData = async () => {
//   const response = await fetch('https://dummyjson.com/products')
//   const data = await response.json()
//   console.log(data)
// }

// fetch('https://dummyjson.com/products/add', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'BMW Pencil',
//     /* other product data */
//   })
// })
//   .then(res => res.json())
//   .then(console.log);

// fetch('https://dummyjson.com/products/1', {
//   method: 'PATCH', /* or PATCH */
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     title: 'iPhone Galaxy +1',
//     price: 1000
//   })
// })
//   .then(res => res.json())
//   .then(console.log);

// fetch('https://dummyjson.com/products/1', {
//   method: 'DELETE',
// })
//   .then(res => res.json())
//   .then(console.log);

// fetch('https://dummyjson.com/auth/login', {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({

//     username: 'kminchelle',
//     password: '0lelplR',
//     expiresInMins: 60, // optional
//   })
// })
//   .then(res => res.json())
//   .then(console.log);



// console.log('Heloo')