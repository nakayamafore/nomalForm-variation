import { FC } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux"
import {
    TextField,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio
} from "@material-ui/core"
import useStyles from "./styles"
import { RootState } from "../domain/entity/rootState";
import { Profile } from "../domain/entity/profile"
import { Gender } from "../domain/entity/gender"
import { setProfile } from "../store/profile/actions"
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
            <FormControl className={classes.formField}>
                <FormLabel>{PROFILE.GENDER}</FormLabel>
                <RadioGroup value={profile.gender} onChange={e => handleChange({ gender: e.target.value as Gender })}>
                    <FormControlLabel value="male" label="男性" control={<Radio color="primary" />} />
                    <FormControlLabel value="female" label="女性" control={<Radio color="primary" />} />
                </RadioGroup>
            </FormControl>
            <TextField fullWidth className={classes.formField} label={PROFILE.BIRTHDAY}
                value={profile.birthday} onChange={e => handleChange({ birthday: e.target.value })}
                type="date" InputLabelProps={{ shrink: true }} />
        </>
    )
}
export default Basic;