import React, {Component} from 'react';
import {
    TextField,
    Typography,
    Grid,
    withStyles,
} from "@material-ui/core";
import {AlarmOutlined} from '@material-ui/icons'
import moment, {max} from "moment";
import {DateTimePicker, MuiPickersUtilsProvider} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import PropTypes from 'prop-types';

const CssDateTimePicker = withStyles({
    root: props => ({
        "& .MuiFormLabel-root": {
            color: "#a4a4a4"
        },
    })
})(DateTimePicker);
const styles = theme => {
    return {
        fullWidth: {
            width: '100%',
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
            marginBottom: theme.spacing(4),
            '&:last-child': {
                marginBottom: 'unset'
            }
        },
        label: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {},
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
        }
    }
};

class DateTimeTournamentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            registerStartAt: moment.now(),
            registerEndAt: moment().add(1, 'h'),
            competitionStartAt: moment().add(1, 'h').add(15, 'm'),
            competitionEndAt: moment().add(1, 'h').add(15, 'm').add(1, 'h'),
            errors: {}
        }
    }

    onError = (error, errorType) => {
        const {errors} = this.state;
        const oldError = errors[errorType];
        if (oldError !== error) {
            this.setState({errors: {...errors, [errorType]: error}},()=>{
                const {registerStartAt, registerEndAt, competitionStartAt, competitionEndAt, errors} = this.state;
                const dateTime = {
                    registerStartAt: registerStartAt,
                    registerEndAt: registerEndAt,
                    competitionStartAt: competitionStartAt,
                    competitionEndAt: competitionEndAt,
                    errors: errors
                };
                this.props.onDateChange(dateTime);
            });
        }
    };
    handleDateChange = (date, dateType) => {
        const oldErrors = this.state.errors;
        this.setState({errors: {...oldErrors, [dateType]: null}});
        this.setState({[dateType]: date}, ()=>{
            const {registerStartAt, registerEndAt, competitionStartAt, competitionEndAt, errors} = this.state;

            const dateTime = {
                registerStartAt: registerStartAt,
                registerEndAt: registerEndAt,
                competitionStartAt: competitionStartAt,
                competitionEndAt: competitionEndAt,
                errors: errors
            };
            this.props.onDateChange(dateTime);
        });
    };

    render() {
        const {classes} = this.props;
        const {registerStartAt, registerEndAt, competitionStartAt, competitionEndAt, errors} = this.state;
        // Thời gian bắt đầu đăng kí tối đã sau 1 năm so vs thời điểm hiện tại
        const maxDateRegisterStartAt = moment().add(1, 'y');
        const maxDateMessageRegiterStartAt = 'Không được sau thời điểm ' + maxDateRegisterStartAt.format("HH:mm DD/MM/YYYY");

        // Thời gian kết thúc đăng kí tối thiểu sau thời gian bắt đầu đăng kí 1 phút
        const minDateRegisterEnd = moment(registerStartAt).add(1, 'h');
        const minDateMessageRegisterEnd = 'Không được trước thời điểm ' + minDateRegisterEnd.format("HH:mm DD/MM/YYYY");
        // Thời gian kết thúc đăng kí tối đa sau thời gian bắt đầu đăng kí 1 năm + 1 phút
        const maxDateRegisterEnd = moment(minDateRegisterEnd).add(1, 'm').add(1, 'y');
        const maxDateMessageRegisterEnd = 'Không được sau thời điểm ' + maxDateRegisterStartAt.format("HH:mm DD/MM/YYYY");

        // Thời gian bắt đầu thi đấu tối thiểu sau thời gian kết thúc đăng kí 15 phút
        const minDateCompetitionStartAt = moment(registerEndAt).add(15, 'm');
        const minDateMessageCompetitionStartAt = 'Không được trước thời điểm ' + minDateCompetitionStartAt.format("HH:mm DD/MM/YYYY");
        // Thời gian bắt đầu thi đấu tối đa sau thời gian kết thúc đăng kí 1 năm
        const maxDateCompetitionStartAt = moment(registerEndAt).add(1, 'y');
        const maxDateMessageCompetitionStartAt = 'Không được sau thời điểm ' + maxDateCompetitionStartAt.format("HH:mm DD/MM/YYYY");

        // Thời gian kết thúc thi đấu tối thiểu sau thời gian bắt đầu thi đấu 60 phút
        const minDateCompetitionEndAt = moment(competitionStartAt).add(60, 'm');
        const minDateMessageCompetitionEndAt = 'Không được sau thời điểm ' + minDateCompetitionEndAt.format("HH:mm DD/MM/YYYY");
        return (
            <div className={classes.fullWidth}>
                <div className={classes.heading}>
                    <AlarmOutlined className={classes.icon}/><Typography className={classes.title}
                                                                         color='textSecondary'>Thời gian</Typography>
                </div>
                <div className={classes.body}>

                    <Grid container className={classes.formField} spacing={2}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Thời gian đăng kí <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <CssDateTimePicker
                                    invalidDateMessage='Thời gian không hợp lệ'
                                    ampm={false}
                                    maxDate={maxDateRegisterStartAt}
                                    maxDateMessage={maxDateMessageRegiterStartAt}
                                    label="Từ"
                                    value={registerStartAt}
                                    onChange={(date) => {
                                        this.handleDateChange(date, 'registerStartAt')
                                    }}
                                    disablePast
                                    format="dd/MM/yyyy HH:mm"
                                    onError={(error) => {
                                        this.onError(error, 'registerStartAt')
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <CssDateTimePicker
                                    ampm={false}
                                    strictCompareDates={true}
                                    invalidDateMessage='Thời gian không hợp lệ'
                                    minDate={minDateRegisterEnd}
                                    minDateMessage={minDateMessageRegisterEnd}
                                    maxDate={maxDateRegisterEnd}
                                    maxDateMessage={maxDateMessageRegisterEnd}
                                    label="Đến"
                                    value={registerEndAt}
                                    onChange={(date) => {
                                        this.handleDateChange(date, 'registerEndAt')
                                    }}
                                    disablePast
                                    format="dd/MM/yyyy HH:mm"
                                    onError={(error) => {
                                        this.onError(error, 'registerEndAt')
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.formField} spacing={2}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Thời gian thi đấu <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <CssDateTimePicker
                                    invalidDateMessage='Thời gian không hợp lệ'
                                    maxDate={maxDateCompetitionStartAt}
                                    maxDateMessage={maxDateMessageCompetitionStartAt}
                                    minDate={minDateCompetitionStartAt}
                                    minDateMessage={minDateMessageCompetitionStartAt}
                                    ampm={false}
                                    strictCompareDates={true}
                                    label="Từ"
                                    value={competitionStartAt}
                                    onChange={(date) => {
                                        this.handleDateChange(date, 'competitionStartAt')
                                    }}
                                    disablePast
                                    format="dd/MM/yyyy HH:mm"
                                    onError={(error) => {
                                        this.onError(error, 'competitionStartAt')
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <CssDateTimePicker
                                    invalidDateMessage='Thời gian không hợp lệ'
                                    ampm={false}
                                    strictCompareDates={true}
                                    minDate={minDateCompetitionEndAt}
                                    minDateMessage={minDateMessageCompetitionEndAt}
                                    label="Đến"
                                    value={competitionEndAt}
                                    onChange={(date) => {
                                        this.handleDateChange(date, 'competitionEndAt')
                                    }}
                                    disablePast
                                    format="dd/MM/yyyy HH:mm"
                                    onError={(error) => {
                                        this.onError(error, 'competitionEndAt')
                                    }}
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

DateTimeTournamentComponent.propsType = {
    onDateChange: PropTypes.func
};
export default withStyles(styles)(DateTimeTournamentComponent);