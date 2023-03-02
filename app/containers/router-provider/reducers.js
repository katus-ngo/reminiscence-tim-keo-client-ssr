import {ROUTE_CHANGED} from "./action";

const initialState = {
    currentRouteName: 'home'
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ROUTE_CHANGED:
            return {
                ...state,
                currentRouteName: action['nextRouteName']
            };
        default:
            return state;
    }
}
