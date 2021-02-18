import { Reducer } from 'redux'
import { Profile } from "../../domain/entity/profile"
import { ProfileAction, ProfileActionType as Type } from "./actionsPlan";

export const initialState: Profile = {
    name: "",
    description: "",
    birthday: "",
    gender: ""
}
export const profileReducer: Reducer<Profile, ProfileAction> = (
    state: Profile = initialState,
    action: ProfileAction
): Profile => {
    console.log("==profileReducer")
    console.log(state)
    console.log(action.profile);
    switch (action.type) {
        case Type.SET:
            console.log(Type.SET)
            return {
                ...state, ...action.profile
            }
        default: {
            console.log("default")
            return state;
        }
    }
}
export default profileReducer;