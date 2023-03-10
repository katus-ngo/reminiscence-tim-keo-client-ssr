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
        // Th???i gian b???t ?????u ????ng k?? t???i ???? sau 1 n??m so vs th???i ??i???m hi???n t???i
        const maxDateRegisterStartAt = moment().add(1, 'y');
        const maxDateMessageRegiterStartAt = 'Kh??ng ???????c sau th???i ??i???m ' + maxDateRegisterStartAt.format("HH:mm DD/MM/YYYY");

        // Th???i gian k???t th??c ????ng k?? t???i thi???u sau th???i gian b???t ?????u ????ng k?? 1 ph??t
        const minDateRegisterEnd = moment(registerStartAt).add(1, 'h');
        const minDateMessageRegisterEnd = 'Kh??ng ???????c tr?????c th???i ??i???m ' + minDateRegisterEnd.format("HH:mm DD/MM/YYYY");
        // Th???i gian k???t th??c ????ng k?? t???i ??a sau th???i gian b???t ?????u ????ng k?? 1 n??m + 1 ph??t
        const maxDateRegisterEnd = moment(minDateRegisterEnd).add(1, 'm').add(1, 'y');
        const maxDateMessageRegisterEnd = 'Kh??ng ???????c sau th???i ??i???m ' + maxDateRegisterStartAt.format("HH:mm DD/MM/YYYY");

        // Th???i gian b???t ?????u thi ?????u t???i thi???u sau th???i gian k???t th??c ????ng k?? 15 ph??t
        const minDateCompetitionStartAt = moment(registerEndAt).add(15, 'm');
        const minDateMessageCompetitionStartAt = 'Kh??ng ???????c tr?????c th???i ??i???m ' + minDateCompetitionStartAt.format("HH:mm DD/MM/YYYY");
        // Th???i gian b???t ?????u thi ?????u t???i ??a sau th???i gian k???t th??c ????ng k?? 1 n??m
        const maxDateCompetitionStartAt = moment(registerEndAt).add(1, 'y');
        const maxDateMessageCompetitionStartAt = 'Kh??ng ???????c sau th???i ??i???m ' + maxDateCompetitionStartAt.format("HH:mm DD/MM/YYYY");

        // Th???i gian k???t th??c thi ?????u t???i thi???u sau th???i gian b???t ?????u thi ?????u 60 ph??t
        const minDateCompetitionEndAt = moment(competitionStartAt).add(60, 'm');
        const minDateMessageCompetitionEndAt = 'Kh??ng ???????c sau th???i ??i???m ' + minDateCompetitionEndAt.format("HH:mm DD/MM/YYYY");
        return (
            <div className={classes.fullWidth}>
                <div className={classes.heading}>
                    <AlarmOutlined className={classes.icon}/><Typography className={classes.title}
                                                                         color='textSecondary'>Th???i gian</Typography>
                </div>
                <div className={classes.body}>

                    <Grid container className={classes.formField} spacing={2}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Th???i gian ????ng k?? <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <CssDateTimePicker
                                    invalidDateMessage='Th???i gian kh??ng h???p l???'
                                    ampm={false}
                                    maxDate={maxDateRegisterStartAt}
                                    maxDateMessage={maxDateMessageRegiterStartAt}
                                    label="T???"
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
                                    invalidDateMessage='Th???i gian kh??ng h???p l???'
                                    minDate={minDateRegisterEnd}
                                    minDateMessage={minDateMessageRegisterEnd}
                                    maxDate={maxDateRegisterEnd}
                                    maxDateMessage={maxDateMessageRegisterEnd}
                                    label="?????n"
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
                            <Typography variant='body1' color='textPrimary'>Th???i gian thi ?????u <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <CssDateTimePicker
                                    invalidDateMessage='Th???i gian kh??ng h???p l???'
                                    maxDate={maxDateCompetitionStartAt}
                                    maxDateMessage={maxDateMessageCompetitionStartAt}
                                    minDate={minDateCompetitionStartAt}
                                    minDateMessage={minDateMessageCompetitionStartAt}
                                    ampm={false}
                                    strictCompareDates={true}
                                    label="T???"
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
                                    invalidDateMessage='Th???i gian kh??ng h???p l???'
                                    ampm={false}
                                    strictCompareDates={true}
                                    minDate={minDateCompetitionEndAt}
                                    minDateMessage={minDateMessageCompetitionEndAt}
                                    label="?????n"
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