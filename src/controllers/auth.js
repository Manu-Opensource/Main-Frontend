import { ApiRequest } from "./api";

export async function getUserData() {
    let res = await(await ApiRequest("self")).json();
    return res;
}

export async function loggedIn() {
    let res = await ApiRequest("self")
    return res.status == 200;
}
