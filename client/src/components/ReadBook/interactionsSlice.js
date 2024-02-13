import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

//
//tekes previously saved changes from DB
  export const fetchStyle = createAsyncThunk('interactions/fetchStyle', async (payload) => {
    const bookId = payload.bookId;
    const user_id = payload.user_id;
    try {
        const res = await axios.get(`http://localhost:3001/books/style/${bookId}/${user_id}`);
        if (!res.data[0].style) return res.data;
        return res.data[0].style;
    } catch (err) {
        console.log(err);
      }
  });

  export const postStyle = createAsyncThunk('interactions/postStyle', async (payload) => {
    const {user_id, book_id, style} = payload;
    try {
        const res = await axios.post('http://localhost:3001/books/style', 
            { user_id, book_id, style },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );
        return res.data;
    } catch (error) {
        console.error(error);
    }
});
 


const interactionsSlice = createSlice({
    name:'interactions',
    initialState: {
        status: 'idle', 
        error: null,
        style: [],
    }, 
    reducers:{
        change_bg_color: (state, action) => {
            const index = action.payload.page;
            const color = action.payload.color;
            state.style[index].bgColor = color;
        },
        change_stroke_color: (state, action) => {
            const index = action.payload.page;
            const color = action.payload.color;
            state.style[index].strokeColor = color;
        },
        change_stroke_width: (state, action) => {
          const index = action.payload.page;
          const width = action.payload.width;
          state.style[index].strokeWidth = width;
      },
        save_drawing_history: (state, action) => {
            const index = action.payload.page;
            const id = action.payload.currId;
            const imageData = action.payload.imageData;
            state.style[index].drawingHistory = imageData;
        },
        create_new_style: (state, action) => {
            const pages  = action.payload.pages;
            const new_style = [];
            for (let i = 0; i <= pages; i++) {
                new_style.push({
                    bgColor: "lightyellow",
                    drawingHistory: '',
                });
            };
            state.style = new_style;
        },
    },
    extraReducers: (builder) => {
        builder
          .addCase(fetchStyle.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchStyle.fulfilled, (state, action) => {
            state.status = 'succeeded';
            if (action.payload == undefined) {
              state.style = [];
            }else 
            {state.style = action.payload};
          })
          .addCase(fetchStyle.rejected, (state, action) => {
            state.status = 'failed';
          })

          .addCase(postStyle.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(postStyle.fulfilled, (state, action) => {
            state.status = 'succeeded';
            console.log('postStyle ended', action.payload);
            return state;
          })
          .addCase(postStyle.rejected, (state, action) => {
            state.status = 'failed';
          })
      },
})

export const {
    change_bg_color,
    change_stroke_color,
    change_stroke_width,
    save_drawing_history,
    create_new_style,
} = interactionsSlice.actions;

export default interactionsSlice.reducer;