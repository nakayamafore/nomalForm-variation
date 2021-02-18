import { FC } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux"
import { TextField } from "@material-ui/core"
import useStyles from "./styles"
import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile"
import { setProfile } from "../store/profile/actionsPlan"
import { PROFILE } from "../domain/services/profile"

const Basic: FC = () => {
    const profile = useSelector((state: RootState) => state.profile)
    const dispatch = useDispatch()
    const classes = useStyles()
    const handleChange = (member: Partial<Profile>) => {
        dispatch(setProfile(member))
    }
    return (
        <>
            <TextField fullWidth className={classes.formField} label={PROFILE.NAME}
                value={profile.name} onChange={e => {
                    handleChange({ name: e.target.value })
                }} />
            <TextField fullWidth multiline className={classes.formField} rows={5} label={PROFILE.DESCRIPTION}
                value={profile.description} onChange={e => handleChange({ description: e.target.value })} />
        </>
    )
}
export default Basic;