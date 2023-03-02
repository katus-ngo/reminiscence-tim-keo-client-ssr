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
                <Typography style={{marginBottom: 8}} variant='body1' color='textPrimary'>Tên in-game (Tên anh
                    hùng)</Typography>
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
                            <CustomSwitch checked={verify} onChange={this.handleChangeSwitch}/> XÁC MINH</Typography>
                        {verify && <div>
                            <div className={classes.step}>
                                <Typography variant='body1' color='textSecondary' className={classes.textTitle}>Đăng
                                    nhập
                                    vào
                                    LIÊN MINH HUYỀN THOẠI</Typography>
                                <Typography variant='body1' color='textPrimary'>Đăng nhập với tài khoản được liên kết
                                    với
                                    tên
                                    anh hùng "{summoner.summonerName}" trong game LIÊN MINH HUYỀN THOẠI</Typography>
                            </div>
                            <div className={classes.step}>
                                <Typography variant='body1' color='textSecondary' className={classes.textTitle}>Thay đổi
                                    biểu
                                    tượng anh hùng</Typography>
                                <Typography variant='body1' color='textPrimary'>Thay đổi biểu tượng anh hùng hiện tại
                                    của
                                    bạn
                                    thành biểu tượng anh hùng được hiển thị dưới đây:</Typography>
                                <Avatar className={classes.questionIcon} alt={summoner.summonerName}
                                        src={'https://ddragon.leagueoflegends.com/cdn/9.2.1/img/profileicon/' + summoner.question + '.png'}/>
                            </div>
                            <div className={classes.step}>
                                <Typography variant='body1' color='textSecondary' className={classes.textTitle}>Đợi vài
                                    giây
                                    sau
                                    đó nhấn xác </Typography>
                                <Typography variant='body1' color='textPrimary'>Có thể mất 15s để hệ thống xác nhận thay
                                    đổi
                                    biểu tượng.</Typography>
                                <Typography variant='body1' color='textPrimary'>Ngay sau khi hoàn tất xác minh bạn có
                                    thể
                                    thay
                                    đổi bất kì biểu tượng nào.</Typography>
                            </div>
                        </div>
                        }
                    </div>
                </div>
            )
        } else {
            return (
                <Typography variant='body1' align='center' color='textPrimary'>Không tìm thấy tên anh hùng</Typography>
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
                        <Typography variant='h6' color='textSecondary' align='center'>XÁC MINH thành công!</Typography>
                        <Typography variant='body1' color='textPrimary' align='center'>
                            Bạn đã xác minh thành công anh hùng <span className={classes.summonerName}>{summoner.name}</span>!
                        </Typography>
                    </div>
                }
                {
                    !verify && <div>
                        <Typography variant='h6' color='textSecondary' align='center'>Thêm thành công!</Typography>
                        <Typography variant='body1' color='textPrimary' align='center'>
                            Bạn đã thêm thành công anh hùng <span className={classes.summonerName}>{summoner.name}</span> vào
                            tài khoản của bạn!
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