import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//
 export const fetchText = createAsyncThunk('pages/fetchText', async (payload) => {
  
    try {
        const res = await axios.get(`http://localhost:3001/books/text/${payload.bookId}/${payload.page}`);
        return res.data[0].text;
    } catch (err) {
        console.log(err);
      }
  });

  export const fetchBookData = createAsyncThunk('pages/fetchBookInfo', async (payload) => {
    try {
        const book_id = payload.book_id;
        const res = await axios.get(`http://localhost:3001/books/${book_id}`);
       return res.data;
    } catch (err) {
        console.log(err);
    }
});

export  const fetchNumberOfPages = createAsyncThunk('pages/fetchNumberOfPages', async (payload) => {
    try {
        const res = await axios.get(`http://localhost:3001/books/pages/${payload}`);
        return res.data[0].count;
    } catch (err) {
        console.log(err);
    }
});


const pagesSlice = createSlice({
    name:'pages',
    initialState: {
        status: 'idle',
        error: null,
        text:'loading',
        bookData: [],
        numberOfPages: 0,
    }, 
    reducers:{
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchText.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchText.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.text = action.payload;
          })
          .addCase(fetchText.rejected, (state, action) => {
            state.status = 'failed';
          })


          .addCase(fetchBookData.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchBookData.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.bookData = action.payload;
          })
          .addCase(fetchBookData.rejected, (state, action) => {
            state.status = 'failed';
          })


          .addCase(fetchNumberOfPages.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchNumberOfPages.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.numberOfPages = action.payload;
          })
          .addCase(fetchNumberOfPages.rejected, (state, action) => {
            state.status = 'failed';
          })
      },
})


export default pagesSlice.reducer;