import React, {Component} from 'react';
import {
    TextField,
    Typography,
    Grid,
    withStyles
} from "@material-ui/core";
import clsx from 'clsx';
import {InfoOutlined} from '@material-ui/icons';
import './editorStyles.css'
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";

const CssTextField = withStyles({
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
const styles = theme => {
    return {
        fullWidth: {
            width: '100%',
            marginTop: theme.spacing(5),
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(3),
            }
        },
        heading: {
            backgroundColor: '#2a2a2a',
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            display: 'flex',
            alignItems: 'center',
            height: 48
        },
        title: {
            fontSize: 16,
            fontWeight: 'bold'
        },
        body: {
            backgroundColor: theme.palette.surface.dark,
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
            paddingTop: theme.spacing(5),
            paddingBottom: theme.spacing(5),
            [theme.breakpoints.down('xs')]: {
                paddingTop: theme.spacing(3),
                paddingBottom: theme.spacing(3),
            }
        },
        formField: {
            marginBottom: theme.spacing(2),
            '&:last-child': {
                marginBottom: 'unset'
            }
        },
        label: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(1),
            },
        },
        lastLabel: {
            alignItems: 'flex-start',
        },
        icon: {
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1) / 2
        },
        require: {
            color: theme.palette.primary.main
        },
        wrapper: {},
        toolbar: {
            backgroundColor: theme.palette.input.background,
            border: '1px solid #4c4c50',
            borderRadius: '5px'
        },
        editor: {
            backgroundColor: theme.palette.input.background,
            border: '1px solid #4c4c50',
            borderRadius: '5px',
            padding: theme.spacing(2),
            color: '#a4a4a4',
            '&:hover': {
                borderColor: "#a4a4a4"
            },
            overflow: 'auto',
            boxSizing: 'border-box',
            height: 275,
        },
        errorMessage: {
            fontSize: '0.7rem',
            color: '#c43855'
        },
        errors: {
            marginTop: theme.spacing(1)
        }
    }
};

class BasicInfoCreateTournamentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            host: '',
            tournamentName: '',
            description: ''
        };
    }

    onBasicInfoChange = (value, type) => {
        this.setState({[type]: value}, () => {
            const {host, tournamentName, description} = this.state;
            const basicInfo = {
                host: host,
                tournamentName: tournamentName,
                description: description
            };
            this.props.onBasicInfoChange(basicInfo);
        });
    };

    render() {
        const {classes, errors} = this.props;
        const {host, tournamentName, description} = this.state;
        let CKEditor;
        let ClassicEditor;
        if (process.browser) {
            CKEditor = require('@ckeditor/ckeditor5-react');
            ClassicEditor = require('@ckeditor/ckeditor5-build-classic');
        }
        return (
            <div className={classes.fullWidth}>
                <div className={classes.heading}>
                    <InfoOutlined className={classes.icon}/><Typography className={classes.title} color='textSecondary'>Thông
                    tin cơ bản</Typography>
                </div>
                <div className={classes.body}>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Đơn vị tổ chức <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.textField}>
                            <CssTextField
                                placeholder="TimKeoVN eSports"
                                variant="outlined"
                                fullWidth
                                autoFocus={true}
                                inputProps={
                                    {maxLength: '200'}
                                }
                                height='40px'
                                value={host}
                                onChange={(e) => {
                                    this.onBasicInfoChange(e.target.value, 'host')
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} className={clsx(classes.label,classes.errors)}>
                        </Grid>
                        <Grid item xs={12} sm={8} className={clsx(classes.textField,classes.errors)}>
                            {
                                errors && errors.host &&
                                <Typography component="p" className={classes.errorMessage}>
                                    {errors.host}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Tên giải đấu <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.textField}>
                            <CssTextField
                                placeholder="TIM KEO LOL CHAMPIONSHIP SERIES"
                                variant="outlined"
                                fullWidth
                                inputProps={
                                    {maxLength: '200'}
                                }
                                height='40px'
                                value={tournamentName}
                                onChange={(e) => {
                                    this.onBasicInfoChange(e.target.value, 'tournamentName')
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} className={clsx(classes.label,classes.errors)}>
                        </Grid>
                        <Grid item xs={12} sm={8} className={clsx(classes.textField,classes.errors)}>
                            {
                                errors && errors.tournamentName &&
                                <Typography component="p" className={classes.errorMessage}>
                                    {errors.tournamentName}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={4} className={clsx(classes.label, classes.lastLabel)}>
                            <Typography variant='body1' color='textPrimary'>Mô tả <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.textField}>
                            {
                                process.browser ? <CKEditor
                                    editor={ClassicEditor}
                                    data={description}
                                    onInit={editor => {
                                        // You can store the "editor" and use when it is needed.
                                        // console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        this.onBasicInfoChange(data, 'description')
                                    }}
                                /> : <div/>
                            }
                        </Grid>
                        <Grid item xs={12} sm={4} className={clsx(classes.label,classes.errors)}>
                        </Grid>
                        <Grid item xs={12} sm={8} className={clsx(classes.textField,classes.errors)}>
                            {
                                errors && errors.description &&
                                <Typography component="p" className={classes.errorMessage}>
                                    {errors.description}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    errors: state => state.tournamentData.errors,
});
BasicInfoCreateTournamentComponent.propsType = {
    onBasicInfoChange: PropTypes.func,
};
export default connect(mapStateToProps,null)(withStyles(styles)(BasicInfoCreateTournamentComponent));