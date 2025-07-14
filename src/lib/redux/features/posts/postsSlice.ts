import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'
import {Post} from "@/lib/firebase/schemas";
import {getPosts as fetchPosts} from "@/lib/firebase/api";

interface PostsState {
    loading: boolean,
    posts: Post[],
    error: null | string,
}

const initialState: PostsState = {
    loading: false,
    posts: [],
    error: null,
}

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async (_, {rejectWithValue}) => {
        try {
            return {
                success: true,
                data: await fetchPosts(),
            };
        } catch (error) {
            return rejectWithValue('Whoa we messed up with something ;)')
        }
    }
)

export const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        updatePosts: (state, action: PayloadAction<Post[]>) => {
            state.posts = action.payload;
            state.loading = false;
            state.error = null;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(getPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload.data;
            })
            .addCase(getPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    }
})

export const {updatePosts} = postsSlice.actions;

export default postsSlice.reducer