import {TextField, withStyles} from "@material-ui/core";

const CustomTextField = withStyles({
    root: props => ({
        "& label.Mui-focused": {
            color: "#a4a4a4"
        },
        "& .MuiFormLabel-root": {
            color: "#a4a4a4"
        },
        "& .MuiInputBase-input": {
            color: "#a4a4a4",
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 'unset',
            paddingBottom: 'unset',
            display: 'flex',
            alignItems: 'center',
            height: props.height,
            backgroundColor: '#16161c',
            borderRadius: '5px'
        },
        "& .MuiOutlinedInput-multiline": {
            color: "#a4a4a4",
            paddingLeft: 'unset',
            paddingRight: 'unset',
            paddingTop: '14px',
            paddingBottom: '14px',
            alignItems: 'center',
            height: props.height,
            backgroundColor: '#16161c',
            borderRadius: '5px'
        },
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#a4a4a4"
            },
        }
    })
})(TextField);
export default CustomTextField;