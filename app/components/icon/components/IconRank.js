import React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

export default function IconRank(props) {
    return (
        <SvgIcon {...props} style={{fontSize: props.size}} viewBox="0 0 24 24">
            <g id="rank" transform={props.translate ? props.translate : 'translate(3)'}>
                <path id="Path_32" data-name="Path 32"
                      d="M51.353,0H34.814a.644.644,0,0,0-.647.621V17.936a.634.634,0,0,0,.336.545l8.276,4.529a.631.631,0,0,0,.6,0l8.257-4.529a.61.61,0,0,0,.311-.545V.621A.6.6,0,0,0,51.353,0Zm-.647,17.568-7.648,4.189-7.648-4.189V1.242h15.3Z"
                      transform="translate(-34.167)" fill={props.fill}/>
                <path id="Path_33" data-name="Path 33"
                      d="M92.494,174.419V171.5l-5.157,2.718-5.17-2.718v2.912l5.17,2.821Z"
                      transform="translate(-78.44 -158.184)" fill={props.fill}/>
                <path id="Path_34" data-name="Path 34"
                      d="M92.494,118.765v-2.919l-5.157,2.718-5.17-2.718v2.912l5.17,2.821Z"
                      transform="translate(-78.44 -106.851)" fill={props.fill}/>
                <path id="Path_35" data-name="Path 35"
                      d="M107.506,39.934l2.077-1.508,2.077,1.511-.793-2.438,2.077-1.5h-2.567l-.793-2.441L108.789,36h-2.567l2.077,1.5Z"
                      transform="translate(-100.627 -30.951)" fill={props.fill}/>
            </g>
        </SvgIcon>
    );
}
