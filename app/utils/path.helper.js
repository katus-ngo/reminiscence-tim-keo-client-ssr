
//replace %key% in asPath with value in query, rest of key value in query is converted to query string
//Ex asPath: /posts/%post-name% with query: {"post-name": "abc", mobile: true} => /posts/abc?mobile=true
import {forIn} from "lodash";

const buildAsPath = (asPath, inputQuery) => {
    let query = {...inputQuery};
    let restQuery = {};
    let buildAsPath = asPath;
    for(let key in query) {
        if(buildAsPath.indexOf(`:${key}`) !== -1) {
            buildAsPath = buildAsPath.replace(`:${key}`, query[key]);
            delete query[key];
        } else {
            restQuery[key] = query[key];
        }
    }

    return `${buildAsPath}${convertToQueryStrings(restQuery)}`;
};

const convertToQueryStrings = query => {
    let path = '';
    forIn(query, (value, key) => {
        path += value ? `&${key}=${value}` : '';
    });

    if (path.startsWith("&")) {
        path = path.substring(1);
    }

    path = query && Object.keys(query).length > 0 ? '?' + path : path;

    return path;
};

export {buildAsPath, convertToQueryStrings};