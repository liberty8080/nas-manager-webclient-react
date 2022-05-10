import {AppActionTypes, IMenuObj} from "../model/Store";

interface Action<T extends string, P> {
    type: T,
    payload: P
}

export type setMenuAction = Action<AppActionTypes.SET_MENU, IMenuObj>

export type AppActions = setMenuAction