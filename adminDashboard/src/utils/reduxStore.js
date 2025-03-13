import { configureStore } from '@reduxjs/toolkit'
import adminReducer from "./features/userReducer"

export const store =configureStore({
    reducer:{
        admin:adminReducer

    }
})
