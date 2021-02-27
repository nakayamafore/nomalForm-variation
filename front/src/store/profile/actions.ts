import { Profile } from "../../domain/entity/profile"
import { Address } from "../../domain/entity/address"

export const ProfileActionType = {
    SET: 'SET_PROFILE',
    SET_ADDRESS: 'SET_ADDRESS',
    SEARCH_ADDRESS: 'SEARCH_ADDRESS',
    SEARCH_ADDRESS_RESULT: 'SEARCH_ADDRESS_RESULT'
} as const


type ValueOf<T> = T[keyof T]
export type ProfileAction = {
    type: ValueOf<typeof ProfileActionType>;
    profile?: Partial<Profile>;
    address?: Partial<Address>;
    postalCode?: string;
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
export const searchAddress = (postalCode: string): ProfileAction => (
    {
        type: ProfileActionType.SEARCH_ADDRESS,
        postalCode
    }
)
export const searchaddressResult = (address: Partial<Address>): ProfileAction => (
    {
        type: ProfileActionType.SEARCH_ADDRESS_RESULT,
        address
    }
)