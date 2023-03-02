import {
    OPEN_DESKTOP_MENU,
    CLOSE_DESKTOP_MENU,
    OPEN_MOBILE_MENU,
    CLOSE_MOBILE_MENU
} from "./actions";

const initialState = {
    anchorEl: null,
    openMobileMenu: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_DESKTOP_MENU:
            return {
                ...state,
                anchorEl: action.anchorEl
            };
        case CLOSE_DESKTOP_MENU:
            return {
                ...state,
                anchorEl: action.anchorEl
            };
        case OPEN_MOBILE_MENU:
            return {
                ...state,
                openMobileMenu: action.open
            };
        case CLOSE_MOBILE_MENU:
            return {
                ...state,
                openMobileMenu: action.open
            };
        default:
            return state;
    }
}