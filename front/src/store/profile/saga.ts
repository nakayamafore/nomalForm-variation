import { call, put, takeLatest } from 'redux-saga/effects'
import { ProfileAction, ProfileActionType, searchAddress, searchaddressResult } from "./actions"
import { Address } from "../../domain/entity/address"
import { isCompletePostalcode, sanitizePostalcode } from "../../domain/services/address"

export const searchAddressFromPostalcode = (code: string) => {
    console.log("===searchAddressFromPostalcode");
    if (!isCompletePostalcode(code)) {
        console.log("not completed code: " + code);
        return;
    }
    console.log(ProfileActionType.SEARCH_ADDRESS);
    put(searchAddress(code))
}
function* runSearchAddress(action: ProfileAction) {
    console.log("===runSearchAddress");
    const postalCode = action.postalCode;
    if (typeof postalCode === 'undefined') return;
    if (!isCompletePostalcode(postalCode)) {
        console.log("not completed code: " + postalCode);
        return;
    }

    const url: string = `https://apis.postcode-jp.com/api/v4/postcodes?apikey=Png09is6MrtgOwA2npu4WuzDjgfVE27AhBGjNT3&postcode=${sanitizePostalcode(postalCode)}`
    //const url: string = `http://localhost:8080/classrooms`
    try {
        const result = yield call(fetch, url, {
            mode: 'cors'
        });
        console.log("result");
        console.log(result);
        if (!result.data && !result.data[0]) return;

        const address: Partial<Address> = {
            prefecture: result.data[0].pref,
            city: result.data[0].city + result.data[0].town
        }
        console.log(address);
        yield put(searchaddressResult(address))
    } catch (error) {
        console.log("===searchAddress-error")
        console.log(error)
    }
}
export function* watchSearchAddress() {
    console.log("===watchSearchAddress");
    yield takeLatest(ProfileActionType.SEARCH_ADDRESS, runSearchAddress)
}
export default watchSearchAddress;