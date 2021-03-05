import React from "react";
import { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { TextField } from "@material-ui/core"
import { PROFILE } from "../domain/services/profile"
import { RootState } from "../domain/entity/rootState"
import { Address as IAddress } from "../domain/entity/address"
import { setAddress } from "../store/profile/actions"
import useStyles from "./styles"
import { isPostalcode } from "../domain/services/address"
import useGetAddress from "../hooks/use-get-addres"

const Address: FC = () => {
    const classes = useStyles();
    const profile = useSelector((state: RootState) => state.profile);
    const [postalCode, setPostalCode] = useState<string>();
    const dispatch = useDispatch();
    useGetAddress(postalCode as string)

    const handleAddressChange = (member: Partial<IAddress>) => {
        dispatch(setAddress(member))
    }
    const handlePostalcodeChange = (code: string) => {
        console.log("==handlePostalcodeChange")
        console.log(code)
        if (!isPostalcode(code)) return;
        dispatch(setAddress({ postalcode: code }))
        setPostalCode(code)
    }

    return (
        <>
            <TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.POSTALCODE}
                value={profile.address.postalcode} onChange={e => handlePostalcodeChange(e.target.value)} />
            <TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.PREFECTURE}
                value={profile.address.prefecture} onChange={e => handleAddressChange({ prefecture: e.target.value })} />
            <TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.CITY}
                value={profile.address.city} onChange={e => handleAddressChange({ city: e.target.value })} />
            <TextField fullWidth className={classes.formField} label={PROFILE.ADDRESS.RESTADDRES}
                value={profile.address.restAddress} onChange={e => handleAddressChange({ restAddress: e.target.value })} />
        </>
    )
}
export default Address;