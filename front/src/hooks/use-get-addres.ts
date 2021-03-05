import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { isCompletePostalcode } from "../domain/services/address"
import getAddress from "../domain/services/getAddress";
import { Address } from "../domain/entity/address"
import { setAddress } from "../store/profile/actions"

const useGetAddress = (postalCode: string): Partial<Address> | undefined => {
    const [addressResult, setAddressResult] = useState<Partial<Address>>();
    const dispatch = useDispatch();

    useEffect(() => {
        const load = async (): Promise<void> => {
            if (typeof postalCode === 'undefined') return;
            const addressResult = await getAddress(postalCode)
            setAddressResult(addressResult)
            dispatch(setAddress(addressResult))
        }
        console.log("==useEffect-do-load")
        if (!isCompletePostalcode(postalCode as string)) return;
        load()
    }, [dispatch, postalCode])

    return addressResult
}
export default useGetAddress;