import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieDpApi from "../../apis/movieDpApi";

export const fetchTrendings = createAsyncThunk(
  "movies/fetchTrendings",
  async () => {
    const { data } = await movieDpApi.get("/trending/all/day");

    return data;
  }
);

export const fetchRecommendation = createAsyncThunk(
  "movies/fetchRecommendation",
  async () => {
    const { data } = await movieDpApi.get("/discover/movie");

    return data;
  }
);

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const { data } = await movieDpApi.get("/movie/now_playing");

  return data;
});

export const fetchTvSeries = createAsyncThunk(
  "movies/fetchTvSeries",
  async () => {
    const { data } = await movieDpApi.get("/tv/on_the_air");

    return data;
  }
);

export const fetchSearchResults = createAsyncThunk(
  "movies/fetchSearchResults",
  async (term) => {
    const { data } = await movieDpApi.get(`/search/multi`, {
      params: {
        query: term,
        include_adult: true,
      },
    });

    return data;
  }
);

export const fetchMoviesGenres = createAsyncThunk(
  "movies/fetchMoviesGenres",
  async () => {
    const { data } = await movieDpApi.get("/genre/movie/list");

    return data;
  }
);

export const fetchTvSeriesGenres = createAsyncThunk(
  "movies/fetchTvSeriesGenres",
  async () => {
    const { data } = await movieDpApi.get(`/genre/tv/list`);

    return data;
  }
);

const initialState = {
  trendings: {
    trendingList: {},
    status: null,
  },

  bookmarked: [],

  recommendations: {
    recommendationList: {},
    status: null,
  },

  movies: {
    moviesList: {},
    status: null,
  },

  tvSeries: {
    tvSeriesList: {},
    status: null,
  },

  search: {
    searchResults: {},
    status: null,
  },

  moviesGenres: {
    moviesGenresList: [],
    status: null,
  },

  tvSeriesGenres: {
    tvSeriesGenresList: [],
    status: null,
  },
};

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    addBookmark: (state, { payload }) => {
      state.bookmarked.push(payload);
    },
    deleteBookmark: (state, { payload }) => {
      const afterDelete = state.bookmarked.filter(
        (item) => item.id !== payload.id
      );
      state.bookmarked = afterDelete;
    },
    resetSearch: (state) => {
      state.search = { searchResults: {}, status: null };
    },
  },
  extraReducers: {

    [fetchTrendings.pending]: (state) => {
      state.trendings.status = "loading";
    },
    [fetchTrendings.fulfilled]: (state, { payload }) => {
      state.trendings.trendingList = payload;
      state.trendings.status = "success";
    },
    [fetchTrendings.rejected]: (state) => {
      state.trendings.status = "failed";
    },

    [fetchRecommendation.pending]: (state) => {
      state.recommendations.status = "loading";
    },
    [fetchRecommendation.fulfilled]: (state, { payload }) => {
      state.recommendations.status = "success";
      state.recommendations.recommendationList = payload;
    },
    [fetchRecommendation.rejected]: (state) => {
      state.recommendations.status = "failed";
    },

    [fetchMovies.pending]: (state) => {
      state.movies.status = "loading";
    },
    [fetchMovies.fulfilled]: (state, { payload }) => {
      state.movies.status = "success";
      state.movies.moviesList = payload;
    },
    [fetchMovies.rejected]: (state) => {
      state.movies.status = "failed";
    },

    [fetchTvSeries.pending]: (state) => {
      state.tvSeries.status = "loading";
    },
    [fetchTvSeries.fulfilled]: (state, { payload }) => {
      state.tvSeries.status = "success";
      state.tvSeries.tvSeriesList = payload;
    },
    [fetchTvSeries.rejected]: (state) => {
      state.tvSeries.status = "failed";
    },

    [fetchSearchResults.pending]: (state) => {
      state.search.status = "loading";
    },
    [fetchSearchResults.fulfilled]: (state, { payload }) => {
      state.search.status = "success";
      state.search.searchResults = payload;
    },
    [fetchSearchResults.rejected]: (state) => {
      state.search.status = "failed";
    },

    [fetchMoviesGenres.pending]: (state) => {
      state.moviesGenres.status = "loading";
    },
    [fetchMoviesGenres.fulfilled]: (state, { payload }) => {
      state.moviesGenres.status = "success";
      state.moviesGenres.moviesGenresList = payload.genres;
    },
    [fetchMoviesGenres.rejected]: (state) => {
      state.moviesGenres.status = "failed";
    },

    [fetchTvSeriesGenres.pending]: (state) => {
      state.tvSeriesGenres.status = "loading";
    },
    [fetchTvSeriesGenres.fulfilled]: (state, { payload }) => {
      state.tvSeriesGenres.status = "success";
      state.tvSeriesGenres.tvSeriesGenresList = payload.genres;
    },
    [fetchTvSeriesGenres.rejected]: (state) => {
      state.tvSeriesGenres.status = "failed";
    },
  },
});

export const { addBookmark, deleteBookmark, resetSearch } = movieSlice.actions;

export default movieSlice.reducer;
