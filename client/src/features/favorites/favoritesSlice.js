import { createSlice } from '@reduxjs/toolkit';

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    value: [],
  },
  reducers: {
    addFavorite: (state, post) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = [ post.payload, ...state.value];
    },
    removeFavorite: (state, _id) => {
      state.value = state.value
        .filter( post => post._id !== _id.payload)
    },
    
  },
});

export const { addFavorite, removeFavorite, updateFavorites } = favoritesSlice.actions;

export const selectFavorites = state => state.favorites.value;

export default favoritesSlice.reducer;
