import {Avatar} from "@material-ui/core";
import React from "react";
import {generateImageUrl} from "app/utils/ImageHelper";

export default ({avatar, alt = '', className = '', letterAvatar = ''}) => {
    if (avatar) {
        return (
            <Avatar alt={alt} src={generateImageUrl(avatar.original)}
                    className={className}>
            </Avatar>
        );
    }

    return (
        <Avatar alt={alt} className={className}>{letterAvatar}</Avatar>
    );
}
