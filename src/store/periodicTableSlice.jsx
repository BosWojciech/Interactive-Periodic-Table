import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    elements: [],
    searchQuery: "",
    selectedCategory: "all",
    isLoading: true,
    error: null,
};

// Thunk function to fetch elements from the API
export const fetchElements = createAsyncThunk("periodicTable/fetchElements", async () => {
    const response = await fetch("https://kineticzephyr.onrender.com/periodictable");
    const data = await response.json();
    return data;
});

const periodicTableSlice = createSlice({
    name: "periodicTable",
    initialState,
    reducers: {
        setSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        setSelectedCategory: (state, action) => {

            const ALLOWED_FILTERS = Object.freeze({
                ALL: Symbol("all"),
                ALKALI_METALS: Symbol("alkali Metals"),
                ALKALINE_EARTH_METALS: Symbol("alkaline Earth Metals"),
                TRANSITION_METALS: Symbol("transition Metals"),
                POST_TRANSITION_METALS: Symbol("post-transition Metals"),
                METALLOIDS: Symbol("metalloids"),
                REACTIVE_NON_METALS: Symbol("reactive Non-Metals"),
                NOBLE_GASES: Symbol("noble Gases"),
                LANTHANIDES: Symbol("lanthanides"),
                ACTINIDES: Symbol("actinides"),
            })

            if (!ALLOWED_FILTERS[action.payload]) return;

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

export const { setSearchQuery, setSelectedCategory } = periodicTableSlice.actions;
export default periodicTableSlice.reducer;