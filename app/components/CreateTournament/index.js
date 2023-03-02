import React, {Component} from 'react';
import BasicInfoCreateTournamentComponent from "./basicInfo";
import GameInfoCreateTournamentComponent from "./gameInfo";
import SlotAndPrizeCreateTournamentComponent from "./slotAndPrize";
import DateTimeTournamentComponent from "./dateTime";
import HeaderCreateTournamentComponent from "./header";
import PropTypes from 'prop-types';
import {validate as syncValidate} from "app/components/CreateTournament/validation";
import {
    Button,
    Divider,
    withStyles
} from '@material-ui/core'
import {
    Container
} from "@material-ui/core";
import {pushErrorClient,creatTournament} from "app/containers/tournaments/actions";
import {connect} from "react-redux";
import moment from "moment";

const styles = theme => {
    return {
        fullWidth: {
            width: '100%',
            paddingTop: theme.spacing(8),
            paddingBottom: theme.spacing(8),
        },
        divider: {
            color: theme.palette.divider,
            marginBottom: theme.spacing(5),
            marginTop: theme.spacing(5),
            [theme.breakpoints.down('xs')]: {
                marginBottom: theme.spacing(3),
                marginTop: theme.spacing(3),
            }
        },
        button: {
            width: '200px',
            [theme.breakpoints.down('xs')]: {
                width: '100%',
            }
        },
        cta: {
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: theme.spacing(4),
        }
    }
};

class CreateTournamentComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            basicInfo: {
                host: '',
                tournamentName: '',
                description: ''
            },
            dateTime: {
                registerStartAt: moment().add(0, 'h'),
                registerEndAt: moment().add(1, 'h'),
                competitionStartAt: moment().add(1, 'h').add(15, 'm'),
                competitionEndAt: moment().add(1, 'h').add(15, 'm').add(1, 'h'),
            },
            slotAndPrize: {
                slot: 2,
                prizePool: 0,
                firstPlacePrize: 0,
            },
            gameInfo: {},
        };
    }

    onGameInfoChange = (data) => {
        const gameInfo = data;
        this.setState({gameInfo})
    };
    onSlotAndPrizeChange = (data) => {
        const slotAndPrize = data;
        this.setState({slotAndPrize})
    };
    onBasicInfoChange = (data) => {
        const basicInfo = data;
        this.setState({basicInfo})
    };
    onDateChange = (data) => {
        const dateTime = data;
        this.setState({dateTime})
    };

    handleCreateTournament = () => {
        const {basicInfo, dateTime, slotAndPrize, gameInfo} = this.state;
        const {host, tournamentName, description} = basicInfo;
        const {slot, prizePool, firstPlacePrize} = slotAndPrize;
        let errors = syncValidate({host, tournamentName, description, slot, prizePool, firstPlacePrize});
        if (errors.host || errors.tournamentName || errors.description || errors.slot || errors.prizePool || errors.firstPlacePrize) {
            this.props.pushErrorClient(errors);
        } else {
            this.props.pushErrorClient(errors);
            const tournamentInfo = {
                registerDate: {
                    startAt: dateTime.registerStartAt,
                    endAt: dateTime.registerEndAt,
                },
                competitionDate: {
                    startAt: dateTime.competitionStartAt,
                    endAt: dateTime.competitionEndAt,
                },
                host: basicInfo.host,
                name: basicInfo.tournamentName,
                description: basicInfo.description,
                slot: slotAndPrize.slot,
                tournamentPrize: {
                    additionalInfo: slotAndPrize.additionalInfo,
                    firstPlacePrize: slotAndPrize.firstPlacePrize,
                    prizePool: slotAndPrize.prizePool,
                    secondPlacePrize: slotAndPrize.secondPlacePrize,
                    thirdPlacePrize: slotAndPrize.thirdPlacePrize,
                }
            };
            this.props.creatTournament(tournamentInfo);
        }
    };

    render() {
        const {classes} = this.props;
        return (
            <div className={classes.fullWidth}>
                <Container>
                    <HeaderCreateTournamentComponent/>
                    <BasicInfoCreateTournamentComponent onBasicInfoChange={this.onBasicInfoChange}/>
                    <Divider className={classes.divider}/>
                    <DateTimeTournamentComponent onDateChange={this.onDateChange}/>
                    <Divider className={classes.divider}/>
                    <SlotAndPrizeCreateTournamentComponent onSlotAndPrizeChange={this.onSlotAndPrizeChange}/>
                    <Divider className={classes.divider}/>
                    <GameInfoCreateTournamentComponent onGameInfoChange={this.onGameInfoChange}/>
                    <div className={classes.cta}>
                        <Button variant="contained" onClick={this.handleCreateTournament} color="primary"
                                className={classes.button}>
                            Tạo giải đấu
                        </Button>
                    </div>
                </Container>
            </div>
        );
    }
}

CreateTournamentComponent.propsType = {
    onDateChange: PropTypes.func,
    onBasicInfoChange: PropTypes.func,
    onSlotAndPrizeChange: PropTypes.func,
    onGameInfoChange: PropTypes.func,
};
const mapDispatchToProps = dispatch => ({
    pushErrorClient: (errors) => dispatch(pushErrorClient(errors)),
    creatTournament: (errors) => dispatch(creatTournament(errors)),
});
export default connect(null, mapDispatchToProps)(withStyles(styles)(CreateTournamentComponent));