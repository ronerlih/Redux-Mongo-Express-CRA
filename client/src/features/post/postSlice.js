import { createSlice } from '@reduxjs/toolkit';

export const postSlice = createSlice({
  name: 'post',
  initialState: {
    value: [],
  },
  reducers: {
    addPost: (state, post) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = [ post.payload, ...state.value];
    },
    deletePost: (state, _id) => {
      state.value = state.value
        .filter( post => post._id !== _id.payload)
    },
    updatePosts: (state, newState) => {
      state.value = [...newState.payload]
    },
  },
});

export const { addPost, deletePost, updatePosts } = postSlice.actions;

export const selectPosts = state => state.posts.value;

export default postSlice.reducer;
