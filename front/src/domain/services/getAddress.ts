import { Address } from "../entity/address"
import { sanitizePostalcode } from "../../domain/services/address"

const getAddress = async (postalCode: string): Promise<Partial<Address>> => {
  console.log("postalCode: " + postalCode);
  const url: string = `https://apis.postcode-jp.com/api/v3/postcodes?apikey=Png09is6MrtgOwA2npu4WuzDjgfVE27AhBGjNT3&postcode=${sanitizePostalcode(postalCode)}`
  const response = await fetch(url);
  const result = (await response.json()) as unknown;
  console.log("==getAddress");
  if (!isAddressApiRes(result)) {
    return {
      prefecture: "", city: ""
    }
  }
  console.log("==make-address");
  const address: Partial<Address> = {
    prefecture: result.data[0].pref,
    city: result.data[0].city + result.data[0].town
  }
  return address;
};

type AddressApiRes = {
  data: AddressResDate[];
};
type AddressResDate = {
  pref: string
  city: string
  town: string
}
const isAddressApiData = (arg: unknown): arg is AddressApiRes => {
  const u = arg as AddressResDate;
  return (
    typeof u?.pref === 'string' &&
    typeof u?.city === 'string' &&
    typeof u?.town === 'string'
  );
};

const isAddressApiRes = (args: unknown): args is AddressApiRes => {
  const res = args as AddressApiRes;
  return res !== null && !res.data.some((arg) => !isAddressApiData(arg));
}
export default getAddress;
