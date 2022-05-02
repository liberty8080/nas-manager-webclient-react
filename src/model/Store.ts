//RootStates
export interface IAppStates {
    Menu: IMenuObj
}

export const initialState: IAppStates = {
    Menu: {
        isMenuOpen: false,
        isSettingsOpen: true,
        DrawWidth: 200
    }
}

export enum AppActionTypes {
    SET_MENU = "SET_MENU"
}


export interface IMenuObj {
    isMenuOpen: boolean,
    isSettingsOpen: boolean,
    DrawWidth: number
}

