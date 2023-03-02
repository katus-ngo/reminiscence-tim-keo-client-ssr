import React, {Component} from 'react';
import clsx from 'clsx'
import {
    TextField,
    Paper,
    Chip,
    Typography,
    FormControl,
    withStyles,
    CircularProgress,
    Avatar
} from "@material-ui/core";
import PropTypes from "prop-types";
import {createStructuredSelector} from "reselect";
import {compose} from "recompose";
import {connect} from "react-redux";
import lodash from 'lodash';
import {handleChooseUserAddToTeam, searchMember} from 'app/containers/teamProfile/actions'
import {generateLetterAvatar} from "../../utils/generateLetterAvatar.helper";
import {generateImageUrl} from "../../utils/ImageHelper";


const CssTextField = withStyles({
    root: {
        width: '100%',
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
        }
    },
})(TextField);

const styles = theme => {
    return {
        content: {
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(3)
        },
        paper: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            backgroundColor: '#16161c',
            marginTop: theme.spacing(1),
        },
        chipSearch: {
            margin: theme.spacing(1),
            backgroundColor: '#3b3d44',
            color: '#ebeef2',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#27282e',
            },
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
        paperChoose: {
            backgroundColor: '#3b3d44',
            '& div': {
                display: 'flex',
                alignItems: 'center',
                '& p': {
                    color: '#ebeef2'
                }
            }
        },
        formControl: {
            position: 'relative',
            width: '100%'
        },
        progress: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(2),
            color: '#e64a19'
        },
    };
};

class ContentDialogAddMember extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
        };
        this.handleSearchUser = this.handleSearchUser.bind(this);
        this.handleChooseUser = this.handleChooseUser.bind(this);
        this.handleDeleteResultChoose = this.handleDeleteResultChoose.bind(this);
    }

    handleSearchUser = lodash.debounce((e) => {
        const value = this.state.name;
        this.props.searchMember(10, value)
    }, 800);

    handleChooseUser(e, user) {
        this.props.handleChooseUserAddToTeam([user]);
    }

    handleDeleteResultChoose() {
        const resultChoose = [];
        this.setState({resultChoose});
        this.props.handleChooseUserAddToTeam(resultChoose);
    }

    render() {
        const {name} = this.state;
        const {resultChoose, resultUserSearch, loading} = this.props;
        const {classes} = this.props;
        return (
            <div className={classes.content}>
                <FormControl className={classes.formControl}>
                    <CssTextField
                        placeholder="Tìm kiếm thành viên"
                        variant="outlined"
                        autoFocus={true}
                        value={name}
                        inputProps={
                            {maxLength: '100'}
                        }
                        onChange={e => {
                            this.setState({name: e.target.value});
                            this.handleSearchUser();
                        }}
                    />
                    {loading && <CircularProgress className={classes.progress} size={30}/>}
                </FormControl>
                <Paper className={clsx(classes.paper, classes.paperChoose)}>
                    {
                        resultChoose.map((user, key) => {
                            const {id} = user;
                            const name = user.userMetaInfo.contactInfo.fullName;
                            let avatar = user.userMetaInfo.avatar;
                            avatar = !avatar ? avatar : avatar.original;
                            const letterAvatar = generateLetterAvatar(name).toLocaleUpperCase();
                            const avt = avatar ? (<Avatar alt={name} src={generateImageUrl(avatar.original)} className={classes.avatar}/>) :
                                <Avatar alt={name}
                                        className={classes.avatar}>{letterAvatar} </Avatar>;
                            return (
                                <div key={key}>
                                    <Typography>Gửi lời mời đến: </Typography>

                                    <Chip
                                        label={name}
                                        classes={{
                                            root: classes.chipChoose,
                                        }}
                                        avatar={avt}
                                        onDelete={this.handleDeleteResultChoose}
                                    />
                                </div>
                            )
                        })
                    }
                </Paper>
                <Paper className={classes.paper}>
                    {
                        resultUserSearch.content && resultUserSearch.content.map((user, key) => {
                            const name = user.userMetaInfo.contactInfo.fullName;
                            let avatar = user.userMetaInfo.avatar;
                            avatar = !avatar ? avatar : avatar.original;
                            const letterAvatar = generateLetterAvatar(name).toLocaleUpperCase();
                            const avt = avatar ? (<Avatar alt={name} src={avatar} className={classes.avatar}/>) :
                                <Avatar alt={name}
                                        className={classes.avatar}>{letterAvatar} </Avatar>;
                            return (
                                <Chip
                                    key={key}
                                    label={name}
                                    className={classes.chipSearch}
                                    avatar={avt}
                                    onClick={(e) => this.handleChooseUser(e, user)}
                                />
                            )
                        })
                    }
                </Paper>
            </div>
        );
    }
}

ContentDialogAddMember.propTypes = {
    teamInfo: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
    resultChoose: state => state.teamProfileData.resultChooseUser,
    resultUserSearch: state => state.teamProfileData.resultUserSearch,
    loading: state => state.teamProfileData.loading,
});
const mapDispatchToProps = dispatch => ({
    handleChooseUserAddToTeam: (resultChoose) => dispatch(handleChooseUserAddToTeam(resultChoose)),
    searchMember: (limit, keyword) => dispatch(searchMember(limit, keyword)),
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(ContentDialogAddMember);