import React from "react";
import {Button, CircularProgress, Step, StepConnector, StepLabel, Stepper, withStyles} from "@material-ui/core";
import {createStructuredSelector} from "reselect";
import {
    makeChallengeLOLSummoner,
    verifyChallengeLOLSummoner,
    backStep,
} from "../../../../containers/lol-summoner/actions";
import {connect} from "react-redux";
import StepIcons from './stepIcon'
import {
    StepOne,
    StepTwo,
    StepThree,
} from "./step";
import {
    closeDialogAddSummoner,
} from 'app/containers/lol-summoner/actions';
import {getUserProfile} from "../../../../containers/userProfile/actions";

const CustomConnector = withStyles({
    alternativeLabel: {
        top: 11,
        left: 'calc(-50% + 11px)',
        right: 'calc(50% + 11px)'
    },
    active: {
        "& $line": {
            backgroundColor: '#0fbaa8'
        },
        "& $label": {
            color: '#0fbaa8'
        }

    },
    completed: {
        "& $line": {
            backgroundColor: '#0fbaa8'
        }
    },
    line: {
        height: 3,
        border: 0,
        backgroundColor: "#5d6170",
        borderRadius: 1
    }
})(StepConnector);

const steps = [
    'Thêm anh hùng',
    'Xác minh',
    'Hoàn thành'
];

function getStepContent(step) {
    switch (step) {
        case 0:
            return <StepOne/>;
        case 1:
            return <StepTwo/>;
        case 2:
            return <StepThree/>;
        default:
            return "Sorry";
    }
}

const styles = theme => {
    return {
        stepper: {
            background: '#21232b',
            marginBottom: theme.spacing(3),
            paddingBottom: theme.spacing(2),
            paddingTop: theme.spacing(2),
        },
        stepContent: {
            marginBottom: theme.spacing(3),
            paddingLeft: theme.spacing(3),
            paddingRight: theme.spacing(3),
        },
        action: {
            display: 'flex'
        },
        actionLeft: {
            width: '100%',
            borderRadius: 'unset',
            backgroundColor: '#3b3d44'
        },
        actionRight: {
            width: '100%',
            borderRadius: 'unset',
            backgroundColor: '#0fbaa8',
            color: theme.palette.text.secondary,
            '&:hover': {
                backgroundColor: '#136a66'
            }
        },
        stepLabel:{
            color: '#5d6170'
        },
        stepLabelActive:{
            color: '#0fbaa8 !important'
        },
        stepLabelCompleted:{
            color: '#0fbaa8 !important'
        },
        submitting: {
            color: theme.palette.text.secondary
        }
    }
};

class StepperSummoner extends React.Component {
    constructor(props) {
        super(props);
    }

    handleNext = () => {
        const {activeStep} = this.props;
        if (activeStep === 0) {
            this.props.makeChallengeLOLSummoner(this.props.summonerName);
        }
        if (activeStep === 1) {
            const {verify} = this.props;
            if (verify) {
                this.props.verifyChallengeLOLSummoner(this.props.summoner.token);
            } else {
                this.props.addWithoutVerify(this.props.summoner.token);
            }
        }
        if (activeStep === 2) {
            this.props.closeDialogAddSummoner();
            // this.props.getUserProfile(this.props.userProfile.id);
            window.location.reload();
        }
    };

    handleBack = () => {
        const {activeStep} = this.props;
        if (activeStep === 0) {
            this.props.closeDialogAddSummoner();
        } else {
            this.props.backStep();
        }
    };
    render() {
        const {
            classes,
            summonerName,
            verify,
            submitting,
            activeStep,
        } = this.props;
        return (
            <div>
                <Stepper className={classes.stepper}
                         alternativeLabel
                         activeStep={activeStep}
                         connector={<CustomConnector/>}
                >
                    {steps.map(label => (
                        <Step key={label}>
                            <StepLabel classes={{
                                label:classes.stepLabel,
                                active:classes.stepLabelActive,
                                completed:classes.stepLabelCompleted
                            }} StepIconComponent={StepIcons}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>
                <div>
                    <div>
                        <div className={classes.stepContent}>
                            {getStepContent(activeStep)}
                        </div>
                        <div className={classes.action}>
                            <Button
                                onClick={this.handleBack}
                                className={classes.actionLeft}
                            >
                                {activeStep === 0 ? "Huỷ" : "Quay lại"}
                            </Button>
                            <Button
                                disabled={activeStep === 0 && summonerName === '' || submitting}
                                variant="contained"
                                onClick={this.handleNext}
                                className={classes.actionRight}
                            >
                                {submitting && <CircularProgress className={classes.submitting} size={'1.5rem'}/>}{" "}
                                {
                                    !submitting && (activeStep === steps.length - 1 ? "Hoàn thành"
                                        : (activeStep === steps.length - 3 ? "Tiếp theo"
                                            : (verify ? 'Xác minh' : 'Xác minh sau')))
                                }
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

StepperSummoner.propTypes = {};

const mapStateToProps = createStructuredSelector({
    summonerName: state => state.lolSummoner.summonerName,
    summoner: state => state.lolSummoner.summoner,
    submitting: state => state.lolSummoner.submitting,
    verify: state => state.lolSummoner.verify,
    activeStep: state => state.lolSummoner.activeStep,
    userProfile: state => state.userProfileData.userProfile,
});
const mapDispatchToProps = dispatch => ({
    makeChallengeLOLSummoner: (summonerName) => dispatch(makeChallengeLOLSummoner(summonerName)),
    verifyChallengeLOLSummoner: (challengeToken) => dispatch(verifyChallengeLOLSummoner(challengeToken)),
    addWithoutVerify: (challengeToken) => dispatch(verifyChallengeLOLSummoner(challengeToken, true)),
    closeDialogAddSummoner: () => dispatch(closeDialogAddSummoner()),
    backStep: () => dispatch(backStep()),
    getUserProfile: (id)=>dispatch(getUserProfile(id))
});
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(StepperSummoner));