import React, {Component} from 'react';
import {
    TextField,
    Typography,
    InputAdornment,
    Input,
    Grid,
    withStyles, ListItem, List
} from "@material-ui/core";
import clsx from 'clsx';
import {IconTrophy} from 'app/components/icon'
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
        prizeItem: {
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'space-around'
            }
        },
        iconTrophy: {
            marginRight: theme.spacing(1)
        },
        firstAchievements: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.achievements.first,
            marginRight: theme.spacing(1)
        },
        secondAchievements: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.achievements.second,
            marginRight: theme.spacing(1)
        },
        thridAchievements: {
            display: 'flex',
            alignItems: 'center',
            color: theme.palette.achievements.thrid,
            marginRight: theme.spacing(1)
        },
        listPrize: {
            padding: 'unset'
        },
        endAdornment: {
            '& p': {
                color: theme.palette.text.primary
            }
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

class SlotAndPrizeCreateTournamentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            slot: 2,
            prizePool: 0,
            firstPlacePrize: 0,
            secondPlacePrize: 0,
            thirdPlacePrize: 0,
            additionalInfo: '',
        }
    }

    handleChangeData = (e, type) => {
        this.setState({[type]: e.target.value}, () => {
            const {slot, prizePool, firstPlacePrize, secondPlacePrize, thirdPlacePrize, additionalInfo} = this.state;
            const slotAndPrize = {
                slot: slot,
                prizePool: prizePool,
                firstPlacePrize: firstPlacePrize,
                secondPlacePrize: secondPlacePrize,
                thirdPlacePrize: thirdPlacePrize,
                additionalInfo: additionalInfo,
            };
            this.props.onSlotAndPrizeChange(slotAndPrize);
        });

    };

    render() {
        const {classes, errors} = this.props;
        const {slot, prizePool, firstPlacePrize, secondPlacePrize, thirdPlacePrize, additionalInfo} = this.state;
        return (
            <div className={classes.fullWidth}>
                <div className={classes.heading}>
                    <IconTrophy className={classes.icon}/><Typography className={classes.title} color='textSecondary'>Giải
                    thưởng</Typography>
                </div>
                <div className={classes.body}>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Số lượng tham gia <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={2} className={classes.textField}>
                            <CssTextField
                                height='40px'
                                variant="outlined"
                                inputProps={
                                    {min: '2', max: '128'}
                                }
                                value={slot}
                                onChange={(e) => {
                                    this.handleChangeData(e, 'slot')
                                }}
                                type='number'
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} className={clsx(classes.label, classes.errors)}>
                            {
                                errors && errors.slot &&
                                <Typography component="p" className={classes.errorMessage}>
                                    {errors.slot}
                                </Typography>
                            }
                        </Grid>
                    </Grid>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={8} className={classes.formField}>
                            <Grid container className={classes.formField}>
                                <Grid item xs={12} sm={6} className={classes.label}>
                                    <Typography variant='body1' color='textPrimary'>Tổng giải thưởng<span
                                        className={classes.require}>*</span></Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.label}>
                                    <CssTextField
                                        height='40px'
                                        variant="outlined"
                                        inputProps={
                                            {maxLength: '500'}
                                        }
                                        value={prizePool}
                                        onChange={(e) => {
                                            this.handleChangeData(e, 'prizePool')
                                        }}
                                        fullWidth
                                        type='number'
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} className={clsx(classes.label, classes.errors)}>
                                </Grid>
                                <Grid item xs={12} sm={6} className={clsx(classes.label, classes.errors)}>
                                    {
                                        errors && errors.prizePool &&
                                        <Typography component="p" className={classes.errorMessage}>
                                            {errors.prizePool}
                                        </Typography>
                                    }
                                </Grid>
                            </Grid>
                            <Grid container className={classes.formField}>
                                <Grid item xs={12} sm={6} className={clsx(classes.label, classes.lastLabel)}>
                                    <Typography variant='body1' color='textPrimary'>Thông tin thêm về giải
                                        thưởng</Typography>
                                </Grid>
                                <Grid item xs={12} sm={6} className={classes.textField}>
                                    <CssTextField
                                        placeholder=""
                                        fullWidth
                                        multiline
                                        height='auto'
                                        variant="outlined"
                                        rows="4"
                                        inputProps={
                                            {maxLength: '500'}
                                        }
                                        value={additionalInfo}
                                        onChange={(e) => {
                                            this.handleChangeData(e, 'additionalInfo')
                                        }}
                                    />
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <List className={classes.listPrize}>
                                <ListItem className={classes.prizeItem}>
                                    <Typography className={classes.firstAchievements} component="p">
                                        <IconTrophy className={classes.iconTrophy}/> 1st <span
                                        className={classes.require}>*</span>
                                    </Typography>
                                    <Input value={firstPlacePrize}
                                           onChange={(e) => {
                                               this.handleChangeData(e, 'firstPlacePrize')
                                           }}
                                           type='number'
                                           endAdornment={<InputAdornment position="end"
                                                                         className={classes.endAdornment}>vnđ</InputAdornment>}
                                    />
                                </ListItem>
                                {
                                    errors && errors.firstPlacePrize && <ListItem className={classes.prizeItem}>
                                        <Typography className={classes.firstAchievements} component="p"></Typography>
                                        <Typography component="p" className={classes.errorMessage}>
                                            {errors.firstPlacePrize}
                                        </Typography>
                                    </ListItem>
                                }
                                <ListItem className={classes.prizeItem}>
                                    <Typography className={classes.secondAchievements} component="p">
                                        <IconTrophy className={classes.iconTrophy}/> 2rd
                                    </Typography>
                                    <Input value={secondPlacePrize}
                                           onChange={(e) => {
                                               this.handleChangeData(e, 'secondPlacePrize')
                                           }}
                                           type='number'
                                           endAdornment={<InputAdornment position="end"
                                                                         className={classes.endAdornment}>vnđ</InputAdornment>}
                                    />
                                </ListItem>
                                <ListItem className={classes.prizeItem}>
                                    <Typography className={classes.thridAchievements} component="p">
                                        <IconTrophy className={classes.iconTrophy}/> 3rd
                                    </Typography>
                                    <Input value={thirdPlacePrize}
                                           onChange={(e) => {
                                               this.handleChangeData(e, 'thirdPlacePrize')
                                           }}
                                           type='number'
                                           endAdornment={<InputAdornment position="end"
                                                                         className={classes.endAdornment}>vnđ</InputAdornment>}
                                    />
                                </ListItem>
                            </List>
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
SlotAndPrizeCreateTournamentComponent.propsType = {
    onSlotAndPrizeChange: PropTypes.func,
};
export default connect(mapStateToProps, null)(withStyles(styles)(SlotAndPrizeCreateTournamentComponent));