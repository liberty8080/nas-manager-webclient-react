export interface IAppStates {
    isOpen: boolean
    drawerWidth: number
    isMenuSettingsOpen:boolean
}

export enum AppActionTypes {
    MENU_OPEN = "MENU_OPEN",
    SET_DRAWER_WIDTH = "SET_DRAWER_WIDTH",
    MENU_SETTINGS_OPEN = 'MENU_SETTINGS_OPEN'
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

export interface IMenuSettingsOpen {
    type: AppActionTypes.MENU_SETTINGS_OPEN
    isMenuSettingsOpen: boolean
}

export const setMenu = (payload: boolean): IMenuOpenAction => ({
    type: AppActionTypes.MENU_OPEN,
    isOpen: payload
})


export const setDrawerWidth = (payload: number): ISetDrawerWidthAction => ({
    type: AppActionTypes.SET_DRAWER_WIDTH,
    drawerWidth: payload
})

export const setMenuSettingsOpen = (payload: boolean): IMenuSettingsOpen => ({
    type: AppActionTypes.MENU_SETTINGS_OPEN,
    isMenuSettingsOpen: payload
})

export type AppActions = ReturnType<typeof setMenu>
    | ReturnType<typeof setDrawerWidth>
    | ReturnType<typeof setMenuSettingsOpen>

