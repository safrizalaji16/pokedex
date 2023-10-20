import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = [{ id: 1, title: "post 1", desc: "desc 1 " }];

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<any>) => {
      const { id, title, desc } = action.payload;
      state.push({ id, title, desc });
    }, 

    deletePost: (state, action: PayloadAction<any>) => {
      const postId = action.payload;
      return state.filter((post: any) => post.id === postId);
    },
  },
});

export const { addPost, deletePost } = postsSlice.actions;
export default postsSlice.reducer;
