import NextLink from 'next/link';
import React from "react";
import routes from 'routes.config';
import lodash from 'lodash';
import {buildAsPath} from "./path.helper";


export default ({routeName, children, language = '', query = {}}) => {
    let route = lodash.find(routes, {name: routeName}) || {};
    let as = buildAsPath(route.as, query);
    return (
        <NextLink href={{pathname: route.pathname, query}} as={`${language ? '/' + language : ''}${as}`}>
            {children}
        </NextLink>
    );
}
