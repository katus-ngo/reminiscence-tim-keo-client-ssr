import React, {Component} from 'react';
import {
    Container, Fab,
    Grid,
    withStyles
} from "@material-ui/core";
import LinkM from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import {
    ArrowRight
} from '@material-ui/icons';
import {
    IconTrophy
} from 'app/components/icon'
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import defaultPage from "../../../hocs/defaultPage";
import {openDialogCreateTeam} from "../../containers/createTeam/actions";
import {openDialogSignIn} from "../../containers/sign-in-sign-up-dialog/actions";
import DialogRegisterTournament from 'app/components/common/proBirdDialog';
import ContentDialogRegisterTournament from './contentDialogRegisterTournament';
import {getProfileMe} from 'app/containers/AuthProvider/actions';
import {enqueueSnackbar} from "app/containers/SnackBarNotification/actions";
import {
    openDialogRegisterTournament,
    closeDialogRegisterTournament,
    registerTournament,
} from 'app/containers/tournaments/actions'
import Link from "app/utils/Link";

const styles = theme => {
    return {
        fullWidth: {
            marginTop: theme.spacing(8),
        },
        title: {
            fontSize: '24px',
            color: 'white',
            textAlign: 'center',
            marginBottom: theme.spacing(4)
        },
        poster: {
            position: 'relative',
            '&:hover': {
                cursor: 'pointer'
            },
            '&:before': {
                content: "''",
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                right: 0,
                width: '100%',
                height: '100%',
                background: 'rgba(0, 0, 0, 0.3)',
            },
            '&:hover:before': {
                background: 'rgba(0, 0, 0, 0)'
            },
        },
        posterImg: {
            maxWidth: '100%',
            width: '100%',
            boxShadow: '0 3px 6px black',
        },
        championName: {
            color: 'white',
            fontSize: '1.5rem',
            marginBottom: theme.spacing(4)
        },
        infoItemChampion: {
            color: '#a4a4a4',
            fontSize: '1rem',
            marginBottom: theme.spacing(2)
        },
        content: {
            paddingTop: theme.spacing(4),
            paddingBottom: theme.spacing(4),
            paddingLeft: theme.spacing(4),
            paddingRight: theme.spacing(4),
        },
        link: {
            color: "#e64a19",
            textDecoration: 'none',
            '&:hover': {
                cursor: 'pointer'
            }
        },
        detail: {
            color: '#5a5a5a',
            fontSize: '1rem',
            display: 'flex',
        },
        fab: {
            backgroundColor: '#e64a19',
            color: 'white',
            '&:hover': {
                backgroundColor: '#a13311'
            },
            width: '165px',
            height: '60px',
            fontSize: '24px',
            borderRadius: '5px',
            marginTop: theme.spacing(4)
        },

    }
};

class TimkeoLolChampionshipSeries extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamRegister: null,
            description: ''
        };
        this.handleOpenDialogRegisterTournament = this.handleOpenDialogRegisterTournament.bind(this);
        this.handleCloseDialogRegisterTournament = this.handleCloseDialogRegisterTournament.bind(this)
    }

    handleCloseDialogRegisterTournament() {
        this.props.closeDialogRegisterTournament(false);
    }

    handleOpenDialogRegisterTournament(isLogged) {
        if (!isLogged) {
            this.props.openDialogSignIn(true)
        } else {
            this.props.getProfileMe();
            this.props.openDialogRegisterTournament(true);
        }
    }

    registerTournament = () => {
        const {teamRegister, description} = this.state;
        if (!teamRegister) {
            this.props.enqueueSnackbar({
                message: 'Vui lòng chọn đội để đăng ký!',
                options: {
                    key: new Date().getTime() + Math.random(),
                    variant: 'warning',
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                    autoHideDuration: 2000
                },
            })
        } else {
            const teamId = teamRegister.id;
            const tournamentId = 1;
            this.props.registerTournament(tournamentId, teamId, description)
        }
    };
    onChooseTeam = (team, description) => {
        this.setState({teamRegister: team});
        this.setState({description: description})
    };

    render() {
        const {classes, profile, profileMe, openDialog} = this.props;
        const isLogged = !!profile;
        return (
            <div className={classes.fullWidth}>
                <Container fixed>
                    <Typography className={classes.title} noWrap>
                        <IconTrophy/> GIẢI ĐẤU CÓ THỂ THAM GIA <IconTrophy/>
                    </Typography>
                    <Grid container>

                        <Link routeName={"tournament-detail"} query={{"id": 17}} className={classes.link}>
                            <Grid item xs={12} sm={12} md={7} className={classes.poster}>
                                <img src='static/images/home/posterTLCS.png' className={classes.posterImg}/>
                            </Grid>
                        </Link>
                        <Grid item xs={12} sm={12} md={5} className={classes.content}>
                            <Link routeName={"tournament-detail"} query={{"id": 1}}>
                                <a className={classes.link}>
                                    <Typography className={classes.championName} noWrap>
                                        TÌM KÈO LOL CHAMPIONSHIP SERIES
                                    </Typography>
                                </a>
                            </Link>
                            <div className={classes.infoChampion}>
                                <Typography className={classes.infoItemChampion} noWrap>
                                    64 Đội tham gia
                                </Typography>
                                <Typography className={classes.infoItemChampion} noWrap>
                                    Hình thức thi đấu:
                                </Typography>
                                <Typography className={classes.infoItemChampion} noWrap>
                                    Thể thức thi đấu: 5v5
                                </Typography>
                                <Typography className={classes.infoItemChampion} noWrap>
                                    Tổng giải thưởng: 10.000.000 VNĐ
                                </Typography>
                                <Typography className={classes.infoItemChampion} noWrap>
                                    Nhà tài trợ: <LinkM href={'/'} color="inherit"
                                                        className={classes.link}>TIMKEO.COM</LinkM>
                                </Typography>
                                <Typography className={classes.infoItemChampion} noWrap>
                                    Bảo trợ truyền thông: <LinkM href={'https://www.facebook.com/HaiBeoGamingg/'}
                                                                 color="inherit" className={classes.link}>Hải Béo
                                    Gaming</LinkM>
                                </Typography>
                                <Link routeName={"tournament-detail"} query={{"id": 1}} className={classes.link}>
                                    <a className={classes.link}>
                                        <Typography className={classes.detail} noWrap>
                                            Xem chi tiết <ArrowRight/>
                                        </Typography>
                                    </a>
                                </Link>
                                <Fab variant="extended" className={classes.fab}
                                     onClick={() => this.handleOpenDialogRegisterTournament(isLogged)}>
                                    ĐĂNG KÝ
                                </Fab>
                            </div>
                        </Grid>
                    </Grid>
                </Container>
                <DialogRegisterTournament open={openDialog} textBtnCancel='Huỷ' textBtnOk={'Đăng ký'}
                                          title={'TÌM KÈO LOL CHAMPIONSHIP SERIES'}
                                          comment='Chọn đội cùng bạn tham gia giải đấu!'
                                          onCancel={this.handleCloseDialogRegisterTournament}
                                          haveFooter={true}
                                          haveProBird={true}
                                          content={<ContentDialogRegisterTournament profileMe={profileMe}
                                                                                    onChooseTeam={this.onChooseTeam}/>}
                                          fullWidth={true}
                                          onSubmit={this.registerTournament}
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    profile: state => state.auth.profile,
    profileMe: state => state.auth.profileMe,
    openDialog: state => state.tournamentData.openDialog

});
const mapDispatchToProps = dispatch => ({
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
    getProfileMe: () => dispatch(getProfileMe()),
    openDialogSignIn: (open, routeName) => dispatch(openDialogSignIn(open, routeName)),
    openDialogRegisterTournament: (open) => dispatch(openDialogRegisterTournament(open)),
    closeDialogRegisterTournament: (open) => dispatch(closeDialogRegisterTournament(open)),
    enqueueSnackbar: (notification) => dispatch(enqueueSnackbar(notification)),
    registerTournament: (tournamentId, teamId, description) => dispatch(registerTournament(tournamentId, teamId, description)),
});
export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(defaultPage(TimkeoLolChampionshipSeries)))