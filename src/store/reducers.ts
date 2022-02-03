import {AppActions, AppActionTypes, IAppStates} from "./actions";
import {combineReducers} from "redux";

export const initialState: IAppStates = {
    drawerWidth: 200,
    isOpen: true
}


const customReducer = (state: IAppStates = initialState, action: AppActions) => {
    switch (action.type) {
        case AppActionTypes.MENU_OPEN:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        case AppActionTypes.SET_DRAWER_WIDTH:
            return {
                ...state,
                drawerWidth: state.drawerWidth
            }
        default:
            return state
    }

}

const rootReducer = combineReducers({
    app: customReducer
})

export type rootState = ReturnType<typeof rootReducer>

export default rootReducer
