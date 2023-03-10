import React from "react";
import {Avatar, Typography, Switch,Card, withStyles} from "@material-ui/core";
import {DoneRounded} from "@material-ui/icons";
import CustomTextField from "../../../common/customTextField";
import {createStructuredSelector} from "reselect";
import {changeSummoner, changeVerify} from "../../../../containers/lol-summoner/actions";
import {connect} from "react-redux";

const CustomSwitch = withStyles({
    root: {
        paddingLeft: 0,
        width: 46
    },
    switchBase: {
        paddingLeft: 0,
        color: '#0fbaa8',
        '&$checked': {
            color: '#0fbaa8',
        },
        '&$checked + $track': {
            color: '#0fbaa8',
            backgroundColor: '#0fbaa8'
        },
    },
    checked: {},
    track: {},
})(Switch);

const styles = theme => {
    return {
        summonerInfo: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(2),
            marginBottom: theme.spacing(2),
            backgroundColor: '#21232b',
        },
        currentIcon: {
            marginRight: theme.spacing(1)
        },
        step: {
            marginLeft: theme.spacing(1) + 1,
            paddingLeft: theme.spacing(2),
            paddingBottom: theme.spacing(2),
            borderLeft: '1px solid ' + theme.palette.text.primary,
            position: 'relative',
            '&:before': {
                content: '""',
                width: theme.spacing(1) + 1,
                height: theme.spacing(1) + 1,
                position: 'absolute',
                left: -theme.spacing(1) - 1,
                border: theme.spacing(1) / 2 + 'px solid ' + theme.palette.surface.dark,
                borderRadius: '50%',
                display: 'block',
                top: 0,
                background: theme.palette.text.primary
            },
            '&:last-child': {
                border: 'none'
            }
        },
        textTitle: {
            marginBottom: theme.spacing(1)
        },
        questionIcon: {
            width: 56,
            height: 56,
            marginTop: theme.spacing(1)
        },
        finalStep: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column'
        },
        boxIconDone: {
            width: 92,
            height: 92,
            border: '2px solid ' + theme.palette.secondary.main,
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: theme.spacing(3)
        },
        iconDone: {
            fontSize: 49,
            color: theme.palette.secondary.main
        },
        summonerName: {
            color: '#0fbaa8',
            fontWeight: 'bold'
        },
    }
};

class StepOne extends React.Component {
    render() {
        const {summonerName} = this.props;
        return (
            <div>
                <Typography style={{marginBottom: 8}} variant='body1' color='textPrimary'>T??n in-game (T??n anh
                    h??ng)</Typography>
                <CustomTextField
                    placeholder="SKT T1 Faker"
                    variant="outlined"
                    fullWidth
                    autoFocus={true}
                    inputProps={
                        {maxLength: '200'}
                    }
                    height='40px'
                    value={summonerName}
                    onChange={(e) => {
                        this.props.changeSummoner(e.target.value)
                    }}
                />
            </div>
        )
    }
}

const mapStateToPropsStepOne = createStructuredSelector({
    summonerName: state => state.lolSummoner.summonerName,
});
const mapDispatchToPropsStepOne = dispatch => ({
    changeSummoner: (summoner) => dispatch(changeSummoner(summoner)),
});
StepOne = connect(mapStateToPropsStepOne, mapDispatchToPropsStepOne)(StepOne);

class StepTwo extends React.Component {
    handleChangeSwitch = () => {
        this.props.changeVerify();
    };

    render() {
        const {summoner, classes, verify} = this.props;
        if (summoner) {
            return (
                <div>
                    <Card className={classes.summonerInfo}>
                        <Avatar className={classes.currentIcon} alt={summoner.summonerName}
                                src={'https://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/' + summoner.previousIconId + '.png'}/>
                        <Typography variant='body1' color='textSecondary'>{summoner.summonerName}</Typography>
                    </Card>
                    <div>
                        <Typography variant='body1' color='textSecondary'>
                            <CustomSwitch checked={verify} onChange={this.handleChangeSwitch}/> X??C MINH</Typography>
                        {verify && <div>
                            <div className={classes.step}>
                                <Typography variant='body1' color='textSecondary' className={classes.textTitle}>????ng
                                    nh???p
                                    v??o
                                    LI??N MINH HUY???N THO???I</Typography>
                                <Typography variant='body1' color='textPrimary'>????ng nh???p v???i t??i kho???n ???????c li??n k???t
                                    v???i
                                    t??n
                                    anh h??ng "{summoner.summonerName}" trong game LI??N MINH HUY???N THO???I</Typography>
                            </div>
                            <div className={classes.step}>
                                <Typography variant='body1' color='textSecondary' className={classes.textTitle}>Thay ?????i
                                    bi???u
                                    t?????ng anh h??ng</Typography>
                                <Typography variant='body1' color='textPrimary'>Thay ?????i bi???u t?????ng anh h??ng hi???n t???i
                                    c???a
                                    b???n
                                    th??nh bi???u t?????ng anh h??ng ???????c hi???n th??? d?????i ????y:</Typography>
                                <Avatar className={classes.questionIcon} alt={summoner.summonerName}
                                        src={'https://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/' + summoner.question + '.png'}/>
                            </div>
                            <div className={classes.step}>
                                <Typography variant='body1' color='textSecondary' className={classes.textTitle}>?????i v??i
                                    gi??y
                                    sau
                                    ???? nh???n x??c </Typography>
                                <Typography variant='body1' color='textPrimary'>C?? th??? m???t 15s ????? h??? th???ng x??c nh???n thay
                                    ?????i
                                    bi???u t?????ng.</Typography>
                                <Typography variant='body1' color='textPrimary'>Ngay sau khi ho??n t???t x??c minh b???n c??
                                    th???
                                    thay
                                    ?????i b???t k?? bi???u t?????ng n??o.</Typography>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <Typography variant='body1' align='center' color='textPrimary'>Kh??ng t??m th???y t??n anh h??ng</Typography>
            )
        }
    }
}

const mapStateToPropsStepTwo = createStructuredSelector({
    summoner: state => state.lolSummoner.summoner,
    verify: state => state.lolSummoner.verify,
});
const mapDispatchToPropsStepTwo = dispatch => ({
    changeVerify: () => dispatch(changeVerify()),
});
StepTwo = connect(mapStateToPropsStepTwo, mapDispatchToPropsStepTwo)(withStyles(styles)(StepTwo));

class StepThree extends React.Component {
    render() {
        const {verify, classes, summoner} = this.props;
        return (
            <div className={classes.finalStep}>
                <div className={classes.boxIconDone}>
                    <DoneRounded className={classes.iconDone}/>
                </div>
                {
                    verify && <div>
                        <Typography variant='h6' color='textSecondary' align='center'>X??C MINH th??nh c??ng!</Typography>
                        <Typography variant='body1' color='textPrimary' align='center'>
                            B???n ???? x??c minh th??nh c??ng anh h??ng <span className={classes.summonerName}>{summoner.name}</span>!
                        </Typography>
                    </div>
                }
                {
                    !verify && <div>
                        <Typography variant='h6' color='textSecondary' align='center'>Th??m th??nh c??ng!</Typography>
                        <Typography variant='body1' color='textPrimary' align='center'>
                            B???n ???? th??m th??nh c??ng anh h??ng <span className={classes.summonerName}>{summoner.name}</span> v??o
                            t??i kho???n c???a b???n!
                        </Typography>
                    </div>
                }
            </div>
        )
    }
}

const mapStateToPropsStepThree = createStructuredSelector({
    verifySuccess: state => state.lolSummoner.verifySuccess,
    summoner: state => state.lolSummoner.summoner,
});
StepThree = connect(mapStateToPropsStepThree, null)(withStyles(styles)(StepThree));

export {StepOne, StepTwo, StepThree}