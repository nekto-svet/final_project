// const {db} = require ('../config/DB_conect.js');

// const __getAllProducts = () => {
//     return db('products').select('product_id', 'product_name', 'price', 'description').orderBy('product_name');
// }

// const __getProduct = (id) => {
//     return db('products').select('product_id', 'product_name', 'price', 'description').where({product_id:id});
// }

// module.exports = {__getAllProducts, __getProduct}

import * as allBooks from './books.json' assert { type: 'json' };
import * as allState from './state.json' assert { type: 'json' };
// // console.log(allState.default[0].state['0-1']);

export const __getBook = (bookId) => {
    // console.log(allBooks.default[id]);
    return allBooks.default[bookId];
}

export const __getState = (bookId) => {
    console.log(allState.default[bookId].state)
    return allState.default[bookId].state;
}
