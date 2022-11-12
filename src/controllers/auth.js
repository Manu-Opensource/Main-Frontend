import { ApiRequest } from "./api";

export async function getUserData() {
    let res = await(await ApiRequest("self"));
    if (res.status === 200)
        return res.json();
    else
        return null;
}
