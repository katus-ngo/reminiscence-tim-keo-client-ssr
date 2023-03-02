import React from 'react';
import PropTypes from 'prop-types';
import config from 'app/config';
import {
    validateSignIn as syncValidate
} from './validation'
import {
    withStyles,
    Dialog,
    Typography,
    IconButton,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Grid,
    Link,
    Divider,
    Avatar, CircularProgress
} from "@material-ui/core";
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';

import {connect} from "react-redux";
import {compose} from 'recompose';
import {
    closeDialogSignIn,
    openDialogSignUp
} from "app/containers/sign-in-sign-up-dialog/actions";
import {clearError} from "app/containers/AuthProvider/actions";
import {
    loginByEmail, loginByFacebook
} from 'app/containers/AuthProvider/actions'

import CssBaseline from '@material-ui/core/CssBaseline';
import {IconClose} from "app/components/icon";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import {authService} from "app/services";

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#a4a4a4"
        },
        "& .MuiFormLabel-root": {
            color: "#a4a4a4"
        },
        "& .MuiInputBase-input": {
            color: "#a4a4a4",
            backgroundColor: '#16161c'
        },
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#a4a4a4"
            },
        }
    }
})(TextField);

const styles = theme => {
    return {
        dialog: {
            [theme.breakpoints.down('xs')]: {
                margin: theme.spacing(1)
            },
            backgroundColor: '#1b1c23'
        },
        btnClose: {
            position: 'absolute',
            right: 0,
            top: 0,
        },
        dialogTitle: {
            paddingRight: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            marginBottom: theme.spacing(2)
        },
        textTitle: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            '& p': {
                fontSize: '1.6rem',
                color: '#ebeef2',
                fontWeight: 700
            }
        },
        avatar: {
            backgroundColor: '#e64a19'
        },
        submit: {
            backgroundColor: '#e64a19',
            margin: theme.spacing(3, 0, 2),
            '&:hover': {
                backgroundColor: '#a13311'
            }
        },
        label: {
            color: '#a4a4a4'
        },
        actionExtentDialog: {
            color: '#a4a4a4',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        labelLoginSocial: {
            color: '#ebeef2',
            textDecoration: 'none'
        },
        btnLoginZalo: {
            backgroundColor: '#0190f3',
            marginBottom: theme.spacing(2),
            '&:hover': {
                backgroundColor: '#1d568a'
            }
        },
        btnLoginFacebook: {
            backgroundColor: '#303f9f',
            marginBottom: theme.spacing(2),
            '&:hover': {
                backgroundColor: '#262e60'
            }
        },
        loginSocial: {
            marginRight: theme.spacing(3),
            marginLeft: theme.spacing(3),
        },
        divider: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            color: '#a4a4a4',
            '& hr': {
                width: '40%',
                backgroundColor: '#a4a4a4',
                opacity: 0.2
            }
        },
        btnDisabled: {
            color: '#a4a4a4 !important',
            backgroundColor: '#a13311 !important'
        },
        errorMessage: {
            fontSize: '0.7rem',
            color: '#c43855'
        }
    }
};

class SignInDialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.closeDialog = this.closeDialog.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChecked = this.handleChecked.bind(this);
        this.openDialogSignUp = this.openDialogSignUp.bind(this);
        this.clearError = this.clearError.bind(this);
        this.state = {
            username: '',
            password: '',
            errors: {},
            loginValid: false,
            waiting: false
        }
    }

    clearError() {
        this.setState({errors: {}});
        this.props.clearError();
    }

    handleChecked() {
        const {checked} = this.state;
        this.setState({checked: !checked})
    }

    closeDialog() {
        this.props.closeDialog(false);
        this.clearError();
    }

    openDialogSignUp(route) {
        this.props.closeDialog(false);
        this.clearError();
        this.props.openDialogSignUp(true, route);

    }

    onOAuthLogin = () => {
        this.setState({waiting: true});
    };

    handleOAuthResponse = (provider, response) => {
        if (provider === 'facebook') {
            this.props.loginByFacebook(response['accessToken']);
        }
    };

    changeUsername(e) {
        const username = e.target.value;
        this.setState({username});
    }

    onChangePassword(e) {
        const password = e.target.value;
        this.setState({password});
    }

    handleSubmit(e, route) {
        e.preventDefault();
        const {username, password} = this.state;

        const errors = syncValidate({username, password});

        this.setState({errors});

        if (! errors) {
            this.props.loginByEmail(username, password, route);
        }
    }

    render() {
        const {classes, open, errorResponse, route, submitting} = this.props;
        const {
            email,
            password,
            errors
        } = this.state;

        return (
            <Dialog open={open} onClose={this.closeDialog} classes={{paper: classes.dialog}} maxWidth='xs'>
                <CssBaseline/>
                <DialogTitle className={classes.dialogTitle}>
                    <Typography className={classes.textTitle} component="div">
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="p">
                            Đăng nhập
                        </Typography>
                        <IconButton className={classes.btnClose} aria-label="Close" onClick={this.closeDialog}>
                            <IconClose stroke='#ebeef2'/>
                        </IconButton>
                    </Typography>
                </DialogTitle>
                <div className={classes.loginSocial}>
                    <FacebookLogin
                        appId={config.oauth.facebook.clientId}
                        onClick={this.onOAuthLogin}
                        callback={response => this.handleOAuthResponse('facebook', response)}
                        render={props => (<Button
                            onClick={props.onClick}
                            fullWidth
                            variant="contained"
                            className={classes.btnLoginFacebook}
                        >

                            <span className={classes.labelLoginSocial}>Đăng nhập với Facebook</span>
                        </Button>)}
                    />
                    <Button
                        onClick={() => {
                            Zalo.login();
                        }}
                        fullWidth
                        variant="contained"
                        className={classes.btnLoginZalo}
                    >
                        <span className={classes.labelLoginSocial}>Đăng nhập với ZALO</span>
                    </Button>
                    <div className={classes.divider}>
                        <Divider/>
                        <span> hoặc</span>
                        <Divider/>

                    </div>
                </div>
                <DialogContent>
                    <form className={classes.form} noValidate>
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Email hoặc số điện thoại"
                            name="username"
                            autoFocus
                            value={email}
                            onChange={this.changeUsername}
                        />
                        {
                            errors && errors.username &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.username}
                            </Typography>
                        }
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mật khẩu"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={this.onChangePassword}
                        />
                        {
                            errors && errors.password &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.password}
                            </Typography>
                        }
                        {
                            errorResponse &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errorResponse.message}
                            </Typography>
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            classes={{
                                root: classes.submit,
                                disabled: classes.btnDisabled
                            }}
                            onClick={(e) => {
                                this.handleSubmit(e, route)
                            }}
                            disabled={submitting}
                        >
                            {submitting && <CircularProgress color={"secondary"} size={'1.5rem'}/>}{" "}
                            Đăng nhập
                        </Button>
                        <Grid container justify="space-between">
                            <Grid item>
                                <Typography component="p" className={classes.actionExtentDialog}>
                                    Quên mật khẩu?
                                </Typography>
                            </Grid>
                            <Grid item>
                                <Typography component="p" className={classes.actionExtentDialog}
                                            onClick={() => {
                                                this.openDialogSignUp(route)
                                            }}>
                                    Tạo tài khoản mới
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </DialogContent>
            </Dialog>
        )
    }
}

SignInDialogComponent.propTypes = {
    open: PropTypes.bool
};

const mapStateToProps = state => ({
    open: state.signInSignUpData.openSignIn,
    route: state.signInSignUpData.route,
    errorResponse: state.auth.error,
    submitting: state.auth.submitting
});

const mapDispatchToProps = dispatch => ({
    closeDialog: (open) => dispatch(closeDialogSignIn(open)),
    openDialogSignUp: (open, route) => dispatch(openDialogSignUp(open, route)),
    loginByEmail: (email, password, route) => dispatch(loginByEmail(email, password, route)),
    loginByFacebook: (accessToken, route) => dispatch(loginByFacebook(accessToken, route)),
    clearError: () => dispatch(clearError()),
});

export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(SignInDialogComponent);