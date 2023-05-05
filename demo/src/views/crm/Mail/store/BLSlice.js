import { createSlice } from '@reduxjs/toolkit'

const stateSliceBL = createSlice({
    name: 'crmMail/state2',
    initialState: {
        newMessageDialog: false,
    },
    reducers: {

        toggleNewMessageDialog: (state, action) => {
            state.newMessageDialog = action.payload
        }
    },
})

export const {
    toggleNewMessageDialog,
} = stateSliceBL.actions

export default stateSliceBL.reducer
