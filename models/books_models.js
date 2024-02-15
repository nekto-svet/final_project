
import db from '../config/DB_conect.js';

export const __getAllBooks = () => {
    return db('books').select('book_id', 'title', 'author', 'year', 'cover_img'); 
}

export const __getBook = (book_id) => {
    return db('books').select('book_id', 'title', 'author', 'year', 'cover_img').where({book_id});
}

// export const __getPages = (book_id, page) => {
//     return db('pages').select('page_number', 'text').where({book_id, page_number:page, page_number:page+1, page_number:page+2}) //page_number:page, page_number:page+1, page_number:page+2
// }
// export const __getPages = (book_id, page) => {
//     const endPage = page + 2; 
//     return db('pages')
//       .select('page_number', 'text')
//       .where('book_id', book_id)
//       .andWhere('page_number', '>=', page)
//       .orderBy('page_number', 'asc') // Ensure the pages are returned in order
//       .limit(3); // Ensure only three rows are returned
//   };

  export const __getPages = (book_id, page) => {
    return db('pages')
      .select('page_number', 'text')
      .where('book_id', book_id)
      .andWhere('page_number', page)
  };

 export const __getCountOfPages = (book_id) => {
    return db('pages')
      .where({ book_id })
      .count('* as count');
};

export const __getStyle = (user_id, book_id) => {
    return db('style')
    .select('style')
    .where({ book_id })
    .andWhere({ user_id })
}


export const __saveStyle = (user_id, book_id, style) => {
    return db('style')
        .insert({
            user_id, 
            book_id, 
            style
        })
        .onConflict(['user_id', 'book_id'])
        .merge({
            style
        })
        .returning("*");
};

export const __getTargetWords = (book_id) => {
    return db('target_words')
    .select('words')
    .where({ book_id })
}

// // import * as allBooks from './books.json' assert { type: 'json' };
// import * as allState from './state.json' assert { type: 'json' };
// // console.log(allState.default[0].state['0-1']);



// export const __getState = (bookId) => {
//     console.log('from __getState',allState.default[bookId].state)
//     return allState.default[bookId].state;
// }
