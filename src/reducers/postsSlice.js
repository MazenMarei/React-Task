import { createSlice } from "@reduxjs/toolkit";
import {fetchPosts ,addPost, updatePost , deletePost} from "../APIs/postsApi"

export const postsSlice = createSlice({
  name: "postsData",

  initialState: {
    posts: [],
  },

  reducers: {},

  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, actions) => {
      state.posts = actions.payload;
    });

    builder.addCase(addPost.fulfilled, (state, actions) => {
      state.posts.push(actions.payload);
    });

    builder.addCase(updatePost.fulfilled, (state, actions) => {

      const postIndex = state.posts.findIndex(
        (post) => post.id === actions.payload.id
      );
      // console.log("postIndexxxxxxxxx", postIndex);
      
      if(postIndex !== -1) {// -1 means not found in array
        state.posts[postIndex] = actions.payload
      }
    });

    builder.addCase(deletePost.fulfilled, (state, actions) => {
      state.posts = state.posts.filter((post) => post.id !== actions.payload.id);
    });
  },
});

export default postsSlice.reducer;
