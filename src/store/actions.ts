/*
import {ADD, ADD_TYPE, LESSEN, LESSEN_TYPE} from "./consts";

export interface AddAction {
    type: ADD_TYPE
}

export interface LessenAction {
    type: LESSEN_TYPE
    value:string
}

export type ModifyAction = AddAction | LessenAction

export const add = (): AddAction => ({
    type: ADD
})

export const lessen = (value:string): LessenAction => ({
    type: LESSEN,
    value
})*/

import {customActionTypes} from "./consts";

export interface MenuOpenAction {
    type: customActionTypes.MENU_OPEN
    payload: boolean
}

export interface customStates {
    menuOpen: boolean
}

export const setMenu = (payload:boolean): MenuOpenAction => ({
    type: customActionTypes.MENU_OPEN,
    payload:payload
})

