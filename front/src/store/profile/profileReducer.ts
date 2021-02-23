import { Reducer } from 'redux'
import { Profile } from "../../domain/entity/profile"
import { ProfileAction, ProfileActionType } from "./actions";

export const initialState: Profile = {
    name: "",
    description: "",
    birthday: "",
    gender: "",
    address: {
        postalcode: "",
        prefecture: "",
        city: "",
        restAddress: ""
    }
}
export const profileReducer: Reducer<Profile, ProfileAction> = (
    state: Profile = initialState,
    action: ProfileAction
): Profile => {
    console.log("==profileReducer")
    console.log(state)
    console.log(action.profile);
    console.log(action.address);
    switch (action.type) {
        case ProfileActionType.SET:
            console.log(ProfileActionType.SET)
            return {
                ...state, ...action.profile
            }
        case ProfileActionType.SET_ADDRESS:
            console.log(ProfileActionType.SET_ADDRESS)
            const address: Partial<Profile> = { address: { ...state.address, ...action.address } }
            console.log(address)
            console.log(state)
            return { ...state, ...address }
        case ProfileActionType.SEARCH_ADDRESS:
            console.log(ProfileActionType.SEARCH_ADDRESS)
            console.log(state)
            return { ...state, ...{ address: { ...state.address, ...action.address } } }
        default: {
            console.log("default")
            return state;
        }
    }
}
export default profileReducer;