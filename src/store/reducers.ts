import {customStates, setMenu} from "./actions";
import {customActionTypes} from "./consts";
import {combineReducers} from "redux";

export const initialState: customStates = {
    menuOpen: true
}
/*const TestReducer = (state:number|string = '',action:ModifyAction)=>{
    switch (action.type){
        case ADD:
            return state = '++';
        case LESSEN:
            return state = action.value
        default:
            return state
    }
}*/
type Actions = ReturnType<typeof setMenu>

const customReducer = (state: customStates = initialState, action: Actions) => {
    switch (action.type) {
        case customActionTypes.MENU_OPEN:
            return {
                ...state,
                menuOpen: !state.menuOpen
            }
        default:
            return state
    }

}

const rootReducer =customReducer

export default rootReducer
