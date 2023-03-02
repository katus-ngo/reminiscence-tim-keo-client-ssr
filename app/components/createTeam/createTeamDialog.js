import React from 'react';
import ProBirdDialog from 'app/components/common/proBirdDialog';
import {closeDesktopMenu} from "app/containers/layout/actions";
import {logOut} from "app/containers/AuthProvider/actions";
import {
    openDialogCreateTeam,
    closeDialogCreateTeam, createTeamRequest
} from "app/containers/createTeam/actions";
import {compose} from "recompose";
import {TextField, Typography, withStyles} from "@material-ui/core";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {validate as syncValidate} from "app/components/createTeam/validation";

const styles = theme => {
    return {
        textField: {
            width: '100%'
        },
        errorMessage: {
            fontSize: '0.7rem',
            color: '#c43855'
        }
    }
};

const CssTextField = withStyles({
    root: {
        "& label.Mui-focused": {
            color: "#a4a4a4"
        },
        "& .MuiFormLabel-root": {
            color: "#a4a4a4"
        },
        "& .MuiInputBase-input": {
            color: "#a4a4a4",
            backgroundColor: '#16161c'
        },
        "& .MuiOutlinedInput-root": {
            "&:hover fieldset": {
                borderColor: "#a4a4a4"
            },
        },
        "& .MuiInput-underline:before": {
            borderBottomColor: "#a4a4a4"
        },
    }
})(TextField);

const gameOptions = [
    {
        value: 'LOL',
        label: 'Liên minh huyền thoại'
    },
    {
        value: 'AOE',
        label: 'Đế chế'
    }
];

class CreateTeamDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            shortName:'',
            longName:'',
            game:'LOL',
            submitted: false
        };

        this.handleCancelDialog = this.handleCancelDialog.bind(this);
        this.handleSubmit       = this.handleSubmit.bind(this);
        this.onChangeShortName=this.onChangeShortName.bind(this);
        this.onChangeLongName=this.onChangeLongName.bind(this);
        this.onHandleChangeGame=this.onHandleChangeGame.bind(this);
    }

    onChangeShortName(e){
        const shortName = e.target.value;
        this.setState({shortName});

    }
    onChangeLongName(e){
        const longName = e.target.value;
        this.setState({longName});
    }
    onHandleChangeGame(e){
        this.setState({[e.target.name]: e.target.value});
    }

    handleCancelDialog() {
        this.props.closeDialogCreateTeam()
    }

    handleSubmit() {
        const {shortName, longName, game} = this.state;
        let errors = syncValidate({shortName, longName});
        console.log(errors);
        this.setState({errors, submitted: true});

        if (!errors.shortName && !errors.longName) {
            this.props.createTeam(shortName, longName, game);
        }
    }

    buildContent() {
        const {shortName, longName, game, submitted, errors} = this.state;
        const {classes}=this.props;
        return (
            <div>
                <CssTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="fullname"
                    label="Tên đội (đầy đủ)"
                    autoFocus
                    value={longName}
                    onChange={this.onChangeLongName}
                />
                {
                    submitted && errors.longName &&
                    <Typography component="p" className={classes.errorMessage}>
                        {errors.longName}
                    </Typography>
                }

                <CssTextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="short-name"
                    label="Tên đội (viết tắt)"
                    name="shortName"
                    value={shortName}
                    onChange={this.onChangeShortName}
                />
                {
                    submitted && errors.shortName &&
                    <Typography component="p" className={classes.errorMessage}>
                        {errors.shortName}
                    </Typography>
                }

                <CssTextField
                    select
                    label="Game *"
                    className={classes.textField}
                    value={game}
                    onChange={this.onHandleChangeGame}
                    SelectProps={{
                        native: true,
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    inputProps={{name: 'game'}}
                    margin="normal"
                    variant="filled"
                >
                    {gameOptions.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </CssTextField>
            </div>
        )
    }

    render() {
        const {openDialog} = this.props;

        return (
            <ProBirdDialog
                open={openDialog}
                content={
                    this.buildContent()
                }
                comment="Hãy sát cánh cùng những động đội mình tin tưởng 💪"
                title="Tạo đội"
                textBtnOk={"Tạo đội"}
                onCancel={this.handleCancelDialog}
                onSubmit={this.handleSubmit}
                haveFooter={true}
                haveProBird={true}
            />
        );
    }
}


const mapStateToProps = createStructuredSelector({
    openDialog: state => state.createTeamData.openDialogCreate,
});
const mapDispatchToProps = dispatch => ({
    createTeam: (shortName, longName, game) => dispatch(createTeamRequest(null, shortName, longName, game, null, null)),
    closeDesktopMenu: (anchorEl) => dispatch(closeDesktopMenu(anchorEl)),
    logOut: () => dispatch(logOut()),
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
    closeDialogCreateTeam: () => dispatch(closeDialogCreateTeam()),
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(CreateTeamDialog);