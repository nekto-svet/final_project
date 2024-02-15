import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL || '';

//takes previously saved changes from DB
  export const fetchStyle = createAsyncThunk('interactions/fetchStyle', async (payload) => {
    const bookId = payload.bookId;
    const user_id = payload.user_id;
    try {
        const res = await axios.get(`${baseURL}/books/style/${bookId}/${user_id}`);
        if (!res.data[0].style) return res.data;
        // console.log('fetchStyle', res.data[0].style);
        return res.data[0].style;
    } catch (err) {
        console.log(err);
      }
  });

  export const postStyle = createAsyncThunk('interactions/postStyle', async (payload) => {
    const {user_id, book_id, style} = payload;
    try {
        const res = await axios.post(`${baseURL}/books/style`, 
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
 
export const createIllustration = createAsyncThunk('interactions/createIllustration', async (payload) => {
  console.log ('payload from createIllustration',payload);
  const page = payload.page;
  const text = payload.text;
  console.log('createIllustration page', page, 'url', text);
  const prompt = text + ' cute illustration for children book in pastel colors'
  try {
      const res = await axios.post(`${baseURL}/illustrations`, 
          { prompt },
          {
              headers: {
                  "Content-Type": "application/json",
              },
          }
      );
      // console.log (res.data);
      return ({page, URL:res.data.URL});
  } catch (error) {
      console.error(error);
      return error;
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
        delete_drawing_history: (state, action) => {
          const index = action.payload;
          state.style[index].drawingHistory = '';
        }
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


          .addCase(createIllustration.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(createIllustration.fulfilled, (state, action) => {
            const index = action.payload.page;
            const URL = action.payload.URL;
            state.status = 'succeeded';
            console.log('createIllustration ended, URL ', URL);
            state.style[index].illustration = URL;
          })
          .addCase(createIllustration.rejected, (state, action) => {
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
    delete_drawing_history,
} = interactionsSlice.actions;

export default interactionsSlice.reducer;