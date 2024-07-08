import { configureStore } from "@reduxjs/toolkit";
import { CookieSlice } from "./Slice/CookieSlice";
import { SearchSlice } from "./Slice/SearchSlice";
import { AppSlice } from "./Slice/AppSlice";
import { ModalSlice } from "./Slice/ModalSlice";


const store = configureStore({
    reducer: {
        cookie: CookieSlice.reducer,
        search: SearchSlice.reducer,
        app: AppSlice.reducer,
        modal: ModalSlice.reducer
    }
});

export default store;
