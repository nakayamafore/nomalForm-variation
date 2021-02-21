import { Profile } from "../../domain/entity/profile"
import { Address } from "../../domain/entity/address"

export const ProfileActionType = {
    SET: 'SET_PROFILE',
    SET_ADDRESS: 'SET_ADDRESS'
} as const


type ValueOf<T> = T[keyof T]
export type ProfileAction = {
    type: ValueOf<typeof ProfileActionType>;
    profile?: Partial<Profile>;
    address?: Partial<Address>;
}

export const setProfile = (profile: Partial<Profile>): ProfileAction => (
    {
        type: ProfileActionType.SET,
        profile
    }
)
export const setAddress = (address: Partial<Address>): ProfileAction => (
    {
        type: ProfileActionType.SET_ADDRESS,
        address
    }
)