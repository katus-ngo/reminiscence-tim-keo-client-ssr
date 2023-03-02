import {Dialog, withStyles} from "@material-ui/core";

export const CustomDialog = withStyles({
    root: {
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    container: {
        display: 'flex'
    },
    paper: {
        backgroundColor: '#1b1c23',
        margin: '24px'
    }
})(Dialog);