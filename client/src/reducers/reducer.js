import { SHOW_LOADER } from "../actions/types";

const initialState = {
    loading: false,
}
export default function common(state = initialState, action) {
    switch (action.type) {
        case SHOW_LOADER:
            return {
                loading: action.loading
            }

        default:
            return state;
    }
}