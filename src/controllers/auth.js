import { ApiRequest } from "./api";

export async function getUserData() {
    let res = await(await ApiRequest("self")).json();
    return res;
}
