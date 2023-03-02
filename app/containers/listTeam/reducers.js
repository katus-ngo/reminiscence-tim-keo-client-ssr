import {
    LIST_TEAMS_SUCCESS,
    LIST_TEAMS_ERROR
} from "./actions";

const initialState = {
    dataListTeam: {
        content:[]
    },
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case LIST_TEAMS_SUCCESS:
            return {
                ...state,
                dataListTeam: action.dataListTeam
            };
        case LIST_TEAMS_ERROR:
            return {
                ...state,
                error: action.error
            };
        default:
            return state;
    }
}