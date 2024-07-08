import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    token: Cookies.get("accessToken") ? Cookies.get("accessToken") : null,
    userId: Cookies.get("userId") ? Cookies.get("userId") : 0,
    fullname: Cookies.get("fullname") ? Cookies.get("fullname") : null,
    avatarImage: Cookies.get("avatarImage") ? Cookies.get("avatarImage") : null,

    tokenAdmin: Cookies.get("adminAccessToken") ? Cookies.get("adminAccessToken") : null,
    adminId: Cookies.get("adminId") ? Cookies.get("adminId") : 0,
    adminFullname: Cookies.get("adminFullname") ? Cookies.get("adminFullname") : null,
    adminRole: Cookies.get("adminRole") ? Cookies.get("adminRole") : null,
    avatarImageAdmin: Cookies.get("avatarImageAdmin") ? Cookies.get("avatarImageAdmin") : null,

};

export const CookieSlice = createSlice({
    name: 'cookie',
    initialState,
    reducers: {
        setToken(state, action) {
            state.token = action.payload
        },
        clearToken(state) {
            state.token = null
        },
        setUserId(state, action) {
            state.userId = action.payload
        },
        clearUserId(state) {
            state.userId = 0
        },
        setFullname(state, action) {
            state.fullname = action.payload
        },
        clearFullname(state) {
            state.fullname = null
        },
        setAvatarImage(state, action) {
            state.avatarImage = action.payload
        },
        clearAvatarImage(state) {
            state.avatarImage = null
        },

        setAdminToken(state, action) {
            state.tokenAdmin = action.payload
        },
        clearAdminToken(state) {
            state.tokenAdmin = null
        },
        setAdminId(state, action) {
            state.adminId = action.payload
        },
        clearAdminId(state) {
            state.adminId = 0
        },
        setAdminFullname(state, action) {
            state.adminFullname = action.payload
        },
        clearAdminFullname(state) {
            state.adminFullname = null
        },
        setAdminRole(state, action) {
            state.adminRole = action.payload
        },
        clearAdminRole(state) {
            state.adminRole = null
        },
        setAvatarImageAdmin(state, action) {
            state.avatarImageAdmin = action.payload
        },
        clearAvatarImageAdmin(state) {
            state.avatarImageAdmin = null
        },
    },
});

export const { setToken, clearToken, setUserInfo, clearUserInfo, setUserId, clearUserId, setFullname, clearFullname, setAvatarImage, clearAvatarImage,
    setAdminToken, clearAdminToken, setAdminId, clearAdminId, setAdminFullname, clearAdminFullname, setAdminRole, clearAdminRole, setAvatarImageAdmin, clearAvatarImageAdmin
} = CookieSlice.actions;

