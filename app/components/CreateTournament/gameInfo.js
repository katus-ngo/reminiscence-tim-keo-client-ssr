import React, {Component} from 'react';
import {IconTrophy} from "../icon";
import {
    Grid,
    RadioGroup,
    Radio,
    FormControlLabel,
    MenuItem,
    TextField,
    Typography
} from "@material-ui/core";
import {
    withStyles
} from '@material-ui/core'
import PropTypes from "prop-types";

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
        icon: {
            color: theme.palette.text.secondary,
            marginRight: theme.spacing(1) / 2
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
            marginBottom: theme.spacing(3),
            '&:last-child': {
                marginBottom: 'unset'
            }
        },
        labelRadio: {
            color: theme.palette.text.primary,
            marginRight: theme.spacing(4)
        },
        require: {
            color: theme.palette.primary.main
        },
        game: {
            display: 'flex',
            alignItems: 'center'
        },
        imgGame: {
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            '& img': {
                height: 24,
                width: 24,
                marginRight: theme.spacing(1)
            }
        }
    }
};
const CssTextField = withStyles({
    root: {
        width: '100%',
        "& label.Mui-focused": {
            color: "white"
        },
        "& .MuiFormLabel-root": {
            color: "#a4a4a4"
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "#a4a4a4"
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: "white"
        },
        "& .MuiInputBase-input": {
            color: "#a4a4a4"
        },
        "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#e64a19"
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: "#a4a4a4"
            },
            "&:hover fieldset": {
                borderColor: "#e64a19"
            },
            "&.Mui-focused fieldset": {
                borderColor: "white"
            }
        },
    },
})(TextField);
const gameOptions = [
    {
        value: 'LOL',
        label: 'Liên minh huyền thoại',
        img: '/static/images/home/lol-logo.png'
    },
    {
        value: 'DTCL',
        label: 'Đấu trường chân lý',
        img: '/static/images/home/dtcl-logo.png'
    }
];

class GameInfoCreateTournamentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            game: 'LOL',
            participantType: 'single',
            participantTypes: [
                {type: 'single', label: 'Đơn'},
                {type: 'team', label: 'Đội'},
            ],
            competitionType: 'single-elimination',
        }
    }

    handleChangeGame = (e) => {
        this.setState({[e.target.name]: e.target.value});
        if (e.target.value === 'LOL') {
            const participantTypes = [
                {type: 'single', label: 'Đơn'},
                {type: 'team', label: 'Đội'},
            ];
            this.setState({participantTypes});
        } else if (e.target.value === 'DTCL') {
            const participantTypes = [
                {type: 'single', label: 'Đơn'}
            ];
            this.setState({participantTypes});
        }
    };

    onGameInfoChange = (value, type) => {
        this.setState({[type]: value},()=>{
            const {game, participantType, competitionType} = this.state;
            const gameInfo = {
                game: game,
                participantType: participantType,
                competitionType: competitionType,
            };
            this.props.onGameInfoChange(gameInfo);
        });

    };

    render() {
        const {classes} = this.props;
        const {game, participantType, competitionType, participantTypes} = this.state;
        return (
            <div className={classes.fullWidth}>
                <div className={classes.heading}>
                    <IconTrophy className={classes.icon}/>
                    <Typography className={classes.title} color='textSecondary'>
                        Thông tin Game
                    </Typography>
                </div>
                <div className={classes.body}>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Game <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.textField}>
                            <CssTextField select
                                          inputProps={{name: 'game'}}
                                          onChange={(e) => {
                                              this.onGameInfoChange(e.target.value, e.target.name)
                                          }}
                                          value={game}
                            >
                                {
                                    gameOptions.map(option => (
                                        <MenuItem value={option.value}
                                                  key={option.value}>
                                            <div className={classes.game}>
                                                <div className={classes.imgGame}><img src={option.img}/></div>
                                                <p>{option.label}</p></div>
                                        </MenuItem>
                                    ))
                                }
                            </CssTextField>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Đối tượng tham gia <span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.textField}>
                            <RadioGroup aria-label="position" name="position" value={participantType}
                                        onChange={(e) => {
                                            this.onGameInfoChange(e.target.value, 'participantType')
                                        }} row>
                                {
                                    participantTypes.map((participantType, key) => {
                                        return (
                                            <FormControlLabel
                                                className={classes.labelRadio}
                                                value={participantType.type}
                                                control={<Radio color="secondary"/>}
                                                label={participantType.label}
                                                labelPlacement="end"
                                                key={key}
                                            />
                                        )
                                    })
                                }
                            </RadioGroup>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.formField}>
                        <Grid item xs={12} sm={4} className={classes.label}>
                            <Typography variant='body1' color='textPrimary'>Thể loại thi đấu<span
                                className={classes.require}>*</span></Typography>
                        </Grid>
                        <Grid item xs={12} sm={8} className={classes.textField}>
                            <RadioGroup aria-label="position" name="position" value={competitionType}
                                        onChange={(e) => {
                                            this.onGameInfoChange(e.target.value, 'competitionType')
                                        }} row>
                                <FormControlLabel
                                    className={classes.labelRadio}
                                    value="single-elimination"
                                    control={<Radio color="secondary"/>}
                                    label="Loại trực tiếp"
                                    labelPlacement="end"
                                />
                            </RadioGroup>
                        </Grid>
                    </Grid>
                </div>
            </div>
        );
    }
}

GameInfoCreateTournamentComponent.propsType = {
    onGameInfoChange: PropTypes.func,
};
export default withStyles(styles)(GameInfoCreateTournamentComponent);