import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FilterDirection, NewComment, NewPost, Post, PostDocument } from '@/lib/firebase/types';
import {
  createComment as createCommentReq,
  createPost as createPostReq,
  getPost as getPostReq,
  getPosts as fetchPosts,
} from '@/lib/firebase/api';
import { RootState } from '@/lib/redux';

interface PostsState {
  loading: boolean;
  posts: Post[];
  selectedPost: Post | null;
  error: null | string;
  filters: {
    orderBy: keyof PostDocument;
    direction: FilterDirection;
  };
}

interface GetPostPayload {
  postId: string;
}

export type FiltersPayload = Partial<PostsState['filters']>;

const initialState: PostsState = {
  loading: false,
  posts: [],
  selectedPost: null,
  error: null,
  filters: {
    orderBy: 'created_at',
    direction: FilterDirection.Ascending,
  },
};

export const getPosts = createAsyncThunk(
  'posts/getPosts',
  async (_, { rejectWithValue, dispatch, getState }) => {
    try {
      const state = getState() as RootState;

      dispatch(updateLoading(true));
      return {
        success: true,
        data: await fetchPosts({
          filters: state.posts.filters,
        }),
      };
    } catch (e) {
      return rejectWithValue('Whoa we messed up with something ;)');
    }
  },
);

export const getPost = createAsyncThunk(
  'posts/getPost',
  async (payload: GetPostPayload, { rejectWithValue, dispatch }) => {
    try {
      dispatch(updateLoading(true));

      await getPostReq({ id: payload.postId });

      return {
        success: true,
        data: await getPostReq({
          id: payload.postId,
        }),
      };
    } catch (e) {
      return rejectWithValue('Whoa we messed up with something ;)');
    }
  },
);

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (payload: NewPost, { rejectWithValue, dispatch }) => {
    try {
      dispatch(updateLoading(true));

      await createPostReq(payload);

      dispatch(getPosts());

      return {
        success: true,
      };
    } catch (e) {
      return rejectWithValue('Whoa we messed up with something ;)');
    }
  },
);

export const createComment = createAsyncThunk(
  'posts/createComment',
  async (payload: NewComment, { rejectWithValue, dispatch }) => {
    try {
      dispatch(updateLoading(true));

      await createCommentReq({ value: payload });

      dispatch(getPost({ postId: payload.postId }));

      return {
        success: true,
      };
    } catch (e) {
      return rejectWithValue('Whoa we messed up with something ;)');
    }
  },
);

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    updatePosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateSelectedPost: (state, action: PayloadAction<Post>) => {
      state.selectedPost = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateFilters: (state, action: PayloadAction<FiltersPayload>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
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
      })
      .addCase(getPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPost.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedPost = action.payload.data;
      })
      .addCase(getPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { updatePosts, updateLoading, updateFilters, updateSelectedPost } = postsSlice.actions;

export default postsSlice.reducer;
