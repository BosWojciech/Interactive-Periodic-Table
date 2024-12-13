import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  elements: [],
  searchQuery: "",
  selectedCategory: "All",
  allFilters: [
    "Alkali Metals",
    "Alkaline Earth Metals",
    "Transition Metals",
    "Post-transition Metals",
    "Metalloids",
    "Reactive Non-Metals",
    "Noble Gases",
    "Lanthanides",
    "Actinides",
  ],
  isLoading: true,
  error: null,
};

// Thunk function to fetch elements from the API
export const fetchElements = createAsyncThunk(
  "periodicTable/fetchElements",
  async () => {
    const response = await fetch(
      "https://kineticzephyr.onrender.com/periodictable"
    );
    const data = await response.json();
    return data;
  }
);

const periodicTableSlice = createSlice({
  name: "periodicTable",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      if ((!state.allFilters[action.payload]) && action.payload !== "All") return;

      state.selectedCategory = action.payload;
    },
  },

  /**
   * Handles the state changes for asynchronous actions related to fetching elements.
   * - Sets `isLoading` to true and clears `error` when the fetch operation is pending.
   * - Updates `elements` with the fetched data and sets `isLoading` to false when the fetch is successful.
   * - Sets `error` with the error message and `isLoading` to false when the fetch fails.
   */

  extraReducers: (builder) => {
    builder
      .addCase(fetchElements.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchElements.fulfilled, (state, action) => {
        state.isLoading = false;
        state.elements = action.payload;
      })
      .addCase(fetchElements.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSearchQuery, setSelectedCategory } =
  periodicTableSlice.actions;
export default periodicTableSlice.reducer;
