
export interface IAppStates {
    isOpen: boolean
    drawerWidth: number
}

export enum AppActionTypes {
    MENU_OPEN = "MENU_OPEN",
    SET_DRAWER_WIDTH = "SET_DRAWER_WIDTH"
}


//actions
export interface IMenuOpenAction {
    type: AppActionTypes.MENU_OPEN
    isOpen: boolean
}

export interface ISetDrawerWidthAction {
    type: AppActionTypes.SET_DRAWER_WIDTH
    drawerWidth: number
}

export const setMenu = (payload: boolean): IMenuOpenAction => ({
    type: AppActionTypes.MENU_OPEN,
    isOpen: payload
})


export const setDrawerWidth = (payload: number): ISetDrawerWidthAction => ({
    type: AppActionTypes.SET_DRAWER_WIDTH,
    drawerWidth: payload
})

export type AppActions = ReturnType<typeof setMenu> | ReturnType<typeof setDrawerWidth>

