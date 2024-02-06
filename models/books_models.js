// const {db} = require ('../config/DB_conect.js');

// const __getAllProducts = () => {
//     return db('products').select('product_id', 'product_name', 'price', 'description').orderBy('product_name');
// }

// const __getProduct = (id) => {
//     return db('products').select('product_id', 'product_name', 'price', 'description').where({product_id:id});
// }

// module.exports = {__getAllProducts, __getProduct}

import * as allBooks from './books.json' assert { type: 'json' };


export const __getBook = (id) => {
    // console.log(allBooks.default[id]);
    return allBooks.default[id];
}

