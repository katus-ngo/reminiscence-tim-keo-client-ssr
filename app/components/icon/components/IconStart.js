import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
export default function IconStart(props) {
    return (
        <SvgIcon {...props} style={{fontSize:props.size}}>
            <path fill={props.fill} id="ic_star_24px" d="M12.834,18.543l6.7,4.041-1.777-7.616,5.915-5.124-7.79-.661L12.834,2,9.79,9.183,2,9.844l5.915,5.124L6.139,22.585Z" transform="translate(-2 -2)"/>
        </SvgIcon>
    );
}