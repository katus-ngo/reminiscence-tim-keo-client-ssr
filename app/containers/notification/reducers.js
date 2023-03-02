import {COUNT_UNVIEWED_RESPONSE, VIEW_ALL_RESPONSE} from "./actions";

const initialState = {
    unviewedCount: 0
};

export default (state = initialState, action) => {
    switch (action.type) {
        case COUNT_UNVIEWED_RESPONSE:
            return {
                ...state,
                unviewedCount: action.unviewedCount
            };
        case VIEW_ALL_RESPONSE:
            return {
                ...state,
                unviewedCount: 0
            };
        default:
            return state;
    }
}