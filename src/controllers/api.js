const API_LINK = "http://localhost:3003/api/";
const GH_LINK = "https://raw.githubusercontent.com/Manu-Opensource/content/master/"

export async function ApiRequest (path, args) {
    let link = API_LINK + path;     
    let gh = false;
    if (args && args._gh) {
        link = GH_LINK + path;
        gh = true;
        delete args["_gh"];
    }
    if (args && Object.keys(args).length > 0) {
        let i = 0;
        Object.keys(args).forEach(key => {
            if (i > 0) {
                link += "&" + key + "=" + args[key];
            } else {
                link += "?" + key + "=" + args[key];
            }
            i++;
        });
    }
    link = link.replace("#", "_POUNDSIGN_");

    let fetchArgs = {};
    if (!gh) fetchArgs['credentials'] = 'include';
    let res = await fetch(link, fetchArgs).catch(err => {
        console.log(err)
    });
    return res;
}

export async function ApiPostRequest (path, args) {
    let link = API_LINK + path;
    let res = await fetch(link, {
        method: "post",
        credentials: 'include',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(args)
    }).catch(err => {
        console.log(err);
    });
    return res;
}
