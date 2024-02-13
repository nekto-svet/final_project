import {configureStore} from '@reduxjs/toolkit';
import interactionsReduser from '../components/ReadBook/interactionsSlice'
import pagesReduser from '../components/ReadBook/pagesSlise';
const store = configureStore({
    reducer: {
        interactions: interactionsReduser,
        pages: pagesReduser,
    }
})//

export default store;

