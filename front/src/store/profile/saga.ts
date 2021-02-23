import { Dispatch } from "redux"
import { all, call, fork, put, takeLatest } from 'redux-saga/effects'
import { ProfileActionType, searchAddress } from "./actions"
import { Address } from "../../domain/entity/address"
import { isCompletePostalcode, sanitizePostalcode } from "../../domain/services/address"

export const searchAddressFromPostalcode = (code: string) => async (dispach: Dispatch) => {
    if (!isCompletePostalcode(code)) {
        console.log("not completed code: " + code);
        return;
    }

    console.log("effect-postcode-search")
    const res = await fetch(`https://apis.postcode-jp.com/api/v3/postcodes?apikey=Png09is6MrtgOwA2npu4WuzDjgfVE27AhBGjNT3&postcode=${sanitizePostalcode(code)}`)
    const result = await res.json();
    if (!result.data && !result.data[0]) return;
    console.log(result);

    const address: Partial<Address> = {
        prefecture: result.data[0].pref,
        city: result.data[0].city + result.data[0].town
    }
    console.log(address);
    dispach(searchAddress(address))
}
export function* watchSearchAddress() {
    yield takeLatest("SEARCH_ADDRESS", searchAddressFromPostalcode)
}