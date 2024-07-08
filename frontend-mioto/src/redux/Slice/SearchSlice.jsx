import { createSlice } from "@reduxjs/toolkit";

// Hàm để lấy dữ liệu từ sessionStorage
const loadState = () => {
    try {
        const serializedState = sessionStorage.getItem('searchParams');
        if (serializedState === null) {
            // Giá trị mặc định khi sessionStorage chưa có gì
            const today = new Date().toLocaleDateString('en-GB');
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toLocaleDateString('en-GB');

            return {
                location: 'Hà Nội',
                locationCode: 'haNoi',
                beginDate: today,
                endDate: tomorrowStr,
            };
        }
        return JSON.parse(serializedState);
    } catch (err) {
        // Giá trị mặc định khi có lỗi
        const today = new Date().toLocaleDateString('en-GB');
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        const tomorrowStr = tomorrow.toLocaleDateString('en-GB');

        return {
            location: 'Hà Nội',
            locationCode: 'haNoi',
            beginDate: today,
            endDate: tomorrowStr,
        };
    }
};

// Hàm để lưu dữ liệu vào sessionStorage
const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        sessionStorage.setItem('searchParams', serializedState);
    } catch (err) {
        console.log(err)
    }
};

const initialState = loadState();

export const SearchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            state.location = action.payload;
            saveState(state);
        },
        setLocationCode: (state, action) => {
            state.locationCode = action.payload;
            saveState(state);
        },
        setBeginDate: (state, action) => {
            state.beginDate = action.payload;
            saveState(state);
        },
        setEndDate: (state, action) => {
            state.endDate = action.payload;
            saveState(state);
        }
    }
});

export const { setLocation, setLocationCode, setBeginDate, setEndDate } = SearchSlice.actions;
