import { call, put, takeLatest } from 'redux-saga/effects'
import { ProfileAction, ProfileActionType, searchAddress, searchaddressResult } from "./actions"
import { isCompletePostalcode } from "../../domain/services/address"
import getAddress from "../../domain/services/getAddress"

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
    try {
        console.log("==getAddress call");
        const address = yield call(getAddress, postalCode);
        console.log("==searchaddressResult call");
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