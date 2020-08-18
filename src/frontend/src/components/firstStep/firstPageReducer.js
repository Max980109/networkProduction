import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    tolerance: 0,
    filterValue:0,
}

export const firstPageSlice = createSlice({
    name: 'firstPage',
    initialState: initialState,
    reducers: {
        newTolerance: (state, action) => {
            state.tolerance = action.payload
        },
        newFilterValue: (state, action) => {
            state.filterValue = action.payload
        }

    }
})

export const {newTolerance, newFilterValue} = firstPageSlice.actions

export default firstPageSlice.reducer