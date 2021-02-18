import { Profile } from "../../domain/entity/profile"

export const ProfileActionType = {
    SET: 'SET_PROFILE'
} as const

type ValueOf<T> = T[keyof T]
export type ProfileAction = {
    type: ValueOf<typeof ProfileActionType>;
    profile?: Partial<Profile>;
}

export const setProfile = (profile: Partial<Profile>): ProfileAction => (
    {
        type: ProfileActionType.SET,
        profile
    }
)