import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const Base_URL = "https://jsonplaceholder.typicode.com/comments";



export const fetchPostComments = createAsyncThunk("posts/fetchPostComments", async ({id}) => {
  const response = await axios.get(`${Base_URL}?postId=${id}`);  
  return response.data;
});

