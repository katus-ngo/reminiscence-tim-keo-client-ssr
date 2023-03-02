import React, {Component} from 'react';
import {
    TextField,
    Typography,
    withStyles,
    Grid
} from "@material-ui/core";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {compose} from "recompose";
import {connect} from "react-redux";
import ProBirdDialog from 'app/components/common/proBirdDialog';
import {toggleDialogUpdateInfo, updateTeamProfile} from "app/containers/teamProfile/actions";
import {validate as syncValidate} from "app/components/teamProfile/validation";
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";
import {generateUpdateTeamRequestFromTeamProfile} from "../../utils/request-payload.helper";


const CssTextField = withStyles(theme => {
    return {
        root: {
            backgroundColor: theme.palette.input.background,
            "& label.Mui-focused": {
                color: theme.palette.text.primary
            },
            "& .MuiFormLabel-root": {
                color: theme.palette.text.primary
            },
            "& .MuiInputBase-input": {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.input.background
            },
            "& .MuiOutlinedInput-root": {
                "&:hover fieldset": {
                    borderColor: theme.palette.text.primary
                },
            },
            "& .MuiInput-underline:before": {
                borderBottomColor: theme.palette.text.primary
            },
        }
    }
})(TextField);

const styles = theme => {
    return {
        errorMessage: {
            fontSize: '0.7rem',
            color: theme.palette.error.main,
            marginTop: theme.spacing(1)
        },
    };
};

class DialogUpdateInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            representative: this.props.teamInfo.teamMetaInfo.contactInfo.fullName ? this.props.teamInfo.teamMetaInfo.contactInfo.fullName : '',
            phoneNumber: this.props.teamInfo.teamMetaInfo.contactInfo.phoneNumber ?  this.props.teamInfo.teamMetaInfo.contactInfo.phoneNumber : '',
            email: this.props.teamInfo.teamMetaInfo.contactInfo.email ?  this.props.teamInfo.teamMetaInfo.contactInfo.email : '',
            facebook: this.props.teamInfo.teamMetaInfo.contactInfo.facebook ?  this.props.teamInfo.teamMetaInfo.contactInfo.facebook: '',
            slogan: this.props.teamInfo.teamMetaInfo.slogan ?  this.props.teamInfo.teamMetaInfo.slogan : '',
            description: this.props.teamInfo.teamMetaInfo.description ?  this.props.teamInfo.teamMetaInfo.description : '',
            errors: {},
        };
    }

    onChangeRepresentative = (e) => {
        const representative = e.target.value;
        this.setState({representative})
    };
    onChangePhoneNumber = (e) => {
        const phoneNumber = e.target.value;
        this.setState({phoneNumber})
    };
    onChangeEmail = (e) => {
        const email = e.target.value;
        this.setState({email})
    };
    onChangeFacebook = (e) => {
        const facebook = e.target.value;
        this.setState({facebook})
    };
    onChangeSlogan = (e) => {
        const slogan = e.target.value;
        this.setState({slogan})
    };
    onChangeDescription = (e) => {
        const description = e.target.value;
        this.setState({description})
    };
    handleCloseDialogUpdateInfo = () => {
        this.props.toggleDialogUpdateInfo(false)
    };
    handleUpdateInfo = () => {
        const {
            representative,
            email,
            phoneNumber,
            facebook,
            slogan,
            description,
        } = this.state;
        let errors={};
        if(email){
            errors = {...errors,...syncValidate({email})};
            this.setState({errors})
        }
        if(phoneNumber){
            errors = {...errors,...syncValidate({phoneNumber})};
            this.setState({errors})
        }
        if(!errors.email && !errors.phoneNumber){
            const {teamInfo} = this.props;
            const infoUpdate = {
                slogan: slogan,
                description: description,
                contactInfo: {
                    fullName: representative,
                    facebook: facebook,
                    email: email,
                    phoneNumber: phoneNumber
                }
            };
            const teamRequest = generateUpdateTeamRequestFromTeamProfile(teamInfo, infoUpdate);
            this.props.updateTeamProfile(teamRequest);
            this.props.toggleDialogUpdateInfo(false);
        }
    };
    buildContent () {
        const {classes, error} = this.props;
        const {
            representative,
            email,
            phoneNumber,
            facebook,
            slogan,
            description,
            errors
        } = this.state;
        return (
            <div>
                <Grid spacing={1} container>
                    <Grid item xs={12} md={6}>
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            name="representative"
                            label="Tên người đại diện"
                            placeholder="Đồng Đoàn Năm"
                            autoFocus
                            value={representative}
                            onChange={(e) => this.onChangeRepresentative(e)}
                            inputProps={
                                {maxLength: '60'}
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Số điện thoại"
                            name="phoneNumber"
                            value={phoneNumber}
                            placeholder="0987654321"
                            onChange={(e) => this.onChangePhoneNumber(e)}
                            inputProps={
                                {maxLength: '10'}
                            }
                        />
                        {
                            errors.phoneNumber &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.phoneNumber}
                            </Typography>
                        }
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Email"
                            name="email"
                            value={email}
                            onChange={(e) => this.onChangeEmail(e)}
                            inputProps={
                                {maxLength: '100'}
                            }
                            placeholder="someone@example.com"
                        />
                        {
                            errors.email &&
                            <Typography component="p" className={classes.errorMessage}>
                                {errors.email}
                            </Typography>
                        }
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            label="Facebook"
                            name="facebook"
                            value={facebook}
                            onChange={(e) => this.onChangeFacebook(e)}
                            placeholder="https://facebook.com/someone"
                            inputProps={
                                {maxLength: '200'}
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id="short-name"
                            label="Slogan"
                            name="slogan"
                            value={slogan}
                            onChange={(e) => this.onChangeSlogan(e)}
                            inputProps={
                                {maxLength: '200'}
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CssTextField
                            label="Giới thiệu ..."
                            rows="4"
                            multiline
                            placeholder="Đội mình rảnh cuối tuần ..."
                            fullWidth
                            margin="normal"
                            variant="outlined"
                            value={description}
                            onChange={(e) => this.onChangeDescription(e)}
                            inputProps={
                                {maxLength: '500'}
                            }
                        />{
                        error &&
                        <Typography component="p" className={classes.errorMessage}>
                            {error.message}
                        </Typography>
                    }
                    </Grid>
                </Grid>
            </div>
        )
    }
    render() {
        const {open} = this.props;
        return (
            <ProBirdDialog open={open}
                              textBtnCancel='Huỷ' textBtnOk={'Cập nhật'}
                              comment='Vũ trụ sẽ biết đến bạn qua những thông tin này!'
                              onCancel={this.handleCloseDialogUpdateInfo}
                              onSubmit={this.handleUpdateInfo}
                              content={this.buildContent()}
                              haveFooter={true}
                              haveProBird={true}
                              title={'Chỉnh sửa thông tin đội'}
            />
        );
    }
}

DialogUpdateInfo.propTypes = {
    teamInfo: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    error: state => state.teamProfileData.errorUpdateInfo,
    open: state => state.teamProfileData.openDialogUpdateInfo,
});
const mapDispatchToProps = dispatch => ({
    toggleDialogUpdateInfo: (open) => dispatch(toggleDialogUpdateInfo(open)),
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
    updateTeamProfile: (updateTeamRequest) => dispatch(updateTeamProfile(updateTeamRequest))
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(DialogUpdateInfo);