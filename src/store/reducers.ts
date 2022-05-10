import {AppActions} from "./actions";
import {combineReducers} from "redux";
import {AppActionTypes, IAppStates, initialState} from "../model/Store";

const customReducer = (state: IAppStates = initialState, action: AppActions) => {
    switch (action.type) {
        case AppActionTypes.SET_MENU:
            return {
                ...state,
                Menu: action.payload
            }
        default: {
            return state

        }
    }

}

const rootReducer = combineReducers({
    app: customReducer
})

export type rootState = ReturnType<typeof rootReducer>

export default rootReducer
