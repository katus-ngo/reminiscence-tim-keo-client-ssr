import React, {Component} from 'react';
import {
    Avatar,
    Button,
    withStyles, Typography, Chip, Paper, TextField
} from "@material-ui/core";
import PropTypes from "prop-types";
import {generateLetterAvatar} from "app/utils/generateLetterAvatar.helper";
import {generateImageUrl} from "app/utils/ImageHelper";
import {createStructuredSelector} from "reselect";
import {closeDialogRegisterTournament} from "../../containers/tournaments/actions";
import {connect} from "react-redux";
import {openDialogCreateTeam} from "app/containers/createTeam/actions";

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
            color: "white"
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
        }
    }
})(TextField);
const styles = theme => {
    return {
        content:{
            textAlign: 'center'
        },
        paper: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: '#16161c',
            marginTop: theme.spacing(1),
            maxHeight: '150px',
            height: '100%',
            overflowY: 'scroll',
            scrolling: 'no',
            '&::-webkit-scrollbar-track': {
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                borderRadius: '10px',
                backgroundColor: '#5d6170'
            },
            '&::-webkit-scrollbar': {
                width: '6px',
                backgroundColor: '#5d6170',
                borderRadius: '10px',
            },
            '&::-webkit-scrollbar-thumb': {
                borderRadius: '10px',
                boxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
                backgroundColor: '#3b3d44'
            }
        },
        chipTeam: {
            margin: theme.spacing(1),
            backgroundColor: '#3b3d44',
            color: '#ebeef2',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#27282e',
            },
        },
        paperChoose: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginTop: theme.spacing(1),
            backgroundColor: '#3b3d44',
            '& div': {
                display: 'flex',
                alignItems: 'center',
                '& p': {
                    color: '#ebeef2'
                }
            }
        },
        chipChoose: {
            margin: theme.spacing(1),
            backgroundColor: '#27282e',
            color: '#ebeef2',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#21232b',
            },
            '& .MuiChip-deleteIcon': {
                color: '#3b3d44'
            }
        },
        btnText: {
            margin: theme.spacing(1),
            color: theme.palette.primary.main,
            fontSize: '1.5rem'
        },
    }
};

class ContentDialogRegisterTournament extends Component {
    constructor(props) {
        super(props);
        this.state = {
            teamChoose: [],
            description: ''
        };
        this.handleDeleteTeamChoose = this.handleDeleteTeamChoose.bind(this);
        this.handleCreateTeam = this.handleCreateTeam.bind(this)
    }

    handleChooseTeam = (e, teamParticipation) => {
        this.setState({teamChoose: [teamParticipation]});
        this.props.onChooseTeam(teamParticipation.team)
    };

    handleDeleteTeamChoose() {
        this.setState({teamChoose: []})
    }

    onChangeDescription = (e) => {
        this.setState({description: e.target.value})
    };

    handleCreateTeam(){
        this.props.closeDialogRegisterTournament(false);
        this.props.openDialogCreateTeam(true);
    }

    render() {
        const {classes, profileMe} = this.props;
        const {teamChoose, description} = this.state;
        const teamParticipations = profileMe ? profileMe.teamParticipations : [];
        if (teamParticipations.length === 0) {
            return (
                <div className={classes.content}>
                    <h3 style={{width: '100%', textAlign: 'center', color: "#ebeef2"}}>Bạn chưa có đội!</h3>
                    <Button color="primary" className={classes.btnText} onClick={this.handleCreateTeam}>
                        Tạo đội ngay!
                    </Button>
                </div>
            )
        } else {
            return (
                <div>
                    <Paper className={classes.paper}>
                        {
                            teamParticipations.length > 0 && teamParticipations.map((teamParticipation, key) => {
                                const {team} = teamParticipation;
                                const {avatar, longName, shortName} = team;
                                const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
                                const avt = avatar ? (<Avatar alt={longName} src={generateImageUrl(avatar.original)}
                                                              className={classes.avatar}/>) :
                                    <Avatar alt={longName}
                                            className={classes.avatar}>{letterAvatar} </Avatar>;
                                return (
                                    <Chip
                                        key={key}
                                        label={shortName + ' | ' + longName}
                                        className={classes.chipTeam}
                                        avatar={avt}
                                        onClick={(e) => this.handleChooseTeam(e, teamParticipation, description)}
                                    />
                                )
                            })
                        }
                    </Paper>
                    <Paper className={classes.paperChoose}>
                        {
                            teamChoose.length > 0 && teamChoose.map((teamParticipation, key) => {
                                const {team} = teamParticipation;
                                const {avatar, longName, shortName} = team;
                                const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
                                const avt = avatar ? (<Avatar alt={longName} src={generateImageUrl(avatar.original)}
                                                              className={classes.avatar}/>) :
                                    <Avatar alt={longName}
                                            className={classes.avatar}>{letterAvatar} </Avatar>;
                                return (
                                    <div key={key}>
                                        <Typography>Đăng ký với đội: </Typography>
                                        <Chip
                                            key={key}
                                            label={shortName + ' | ' + longName}
                                            classes={{
                                                root: classes.chipChoose,
                                            }}
                                            avatar={avt}
                                            onDelete={this.handleDeleteTeamChoose}
                                        />
                                    </div>
                                )
                            })
                        }
                    </Paper>
                    <CssTextField
                        label="Mô tả đội"
                        rows="4"
                        multiline
                        placeholder="Tên ingame của các thành viên và một số thông tin khác ..."
                        fullWidth
                        margin="normal"
                        variant="outlined"
                        value={description}
                        onChange={this.onChangeDescription}
                    />
                </div>
            );
        }
    }
}

const mapStateToProps = createStructuredSelector({

});
const mapDispatchToProps = dispatch => ({
    closeDialogRegisterTournament: (open) => dispatch(closeDialogRegisterTournament(open)),
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
});
ContentDialogRegisterTournament.propTypes = {
    profileMe: PropTypes.object,
    onChooseTeam: PropTypes.func
};
export default connect(mapStateToProps, mapDispatchToProps)
(withStyles(styles)(ContentDialogRegisterTournament))