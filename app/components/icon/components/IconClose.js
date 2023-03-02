import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';
export default function IconClose(props) {
    return (
        <SvgIcon {...props} style={{fontSize:props.size}} width="24" height="24" viewBox="0 0 24 24">
            <g id="exit" transform={props.translate?props.translate:'translate(-576 -756) rotate(45)'}>
                <path id="Path_83" data-name="Path 83" d="M0,0H16.844" transform="translate(950.5 127.922)" fill={props.fill} stroke={props.stroke?props.stroke:'#5a5a5a'} strokeWidth={props.strokeWidth?props.strokeWidth:5}/>
                <path id="Path_84" data-name="Path 84" d="M16.844,0H0" transform="translate(958.922 119.5) rotate(90)" fill={props.fill} stroke={props.stroke?props.stroke:'#5a5a5a'} strokeWidth={props.strokeWidth?props.strokeWidth:5}/>
            </g>
        </SvgIcon>
    );
}
