import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {
    CloudUpload,
    AddCircleOutline
} from '@material-ui/icons';
import {
    Container,
    Typography,
    Hidden,
    Grid, TextField, InputLabel,
    Button, MenuItem
} from '@material-ui/core';
import {validate as syncValidate} from "./validation";
import {createStructuredSelector} from "reselect";
import {compose} from "recompose";
import {connect} from "react-redux";
import {createTeamRequest} from "app/containers/createTeam/actions";


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
        label: 'Liên minh huyền thoại'
    },
    {
        value: 'AOE',
        label: 'Đế chế'
    }
];

const styles = theme => {
    return {
        titleSection: {
            margin: '50px 0 30px 0'
        },
        title: {
            textTransform: 'uppercase',
            fontSize: '30px',
            color: 'white',
        },
        label: {
            color: '#a4a4a4'
        },
        inputFile: {
            position: 'absolute',
            width: '100%',
            height: '100%',
            opacity: 0,
            '&:hover': {
                cursor: 'pointer'
            }
        },
        slug: {
            display: 'flex',
            alignItems: 'center'
        },
        labelSlug: {
            color: '#a4a4a4',
            flex: '0 0 auto',
        },
        inputSlug: {
            flex: '1 1 auto'
        },
        btnUpload: {
            width: '100%'
        },
        labelUpload: {
            marginLeft: '10px',
            [theme.breakpoints.down('xs')]: {
                marginLeft: 'unset'
            }
        },
        divUpload: {
            display: 'flex',
            alignItems: 'center',
            [theme.breakpoints.down('xs')]: {
                flexFlow: 'column-reverse',
                alignItems: 'unset',
            }

        },
        btnCreate: {
            backgroundColor: '#00af00',
            color: 'white',
            float: 'right',
            [theme.breakpoints.down('sm')]: {
                width: '100%'
            }
        },
        rightIcon: {
            marginLeft: theme.spacing(1),
        },
        imageReview: {
            height: 0,
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginTop: '30px',
            [theme.breakpoints.down('sm')]: {
                marginTop: '20px'
            }
        },
        errorMessage: {
            fontSize: '0.7rem',
            color: '#c43855',
            marginTop: theme.spacing(1)
        },
    }
};

class CreateTeamComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errors: {},
            slug: '',
            shortName: '',
            longName: '',
            game: 'LOL',
            description: '',
            slogan: '',
            // rank: 1,
            // address: 'HN',
            urlAvatar: '',
            urlCoverImage: '',
            openImageUploader: false,
            image: ''
        };
        this.handleChangeGame = this.handleChangeGame.bind(this);
        this.handleChangeSlug = this.handleChangeSlug.bind(this);
        this.handleChangeShortName = this.handleChangeShortName.bind(this);
        this.handleChangeLongName = this.handleChangeLongName.bind(this);
        this.handleChangeSlogan = this.handleChangeSlogan.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUploadAvatar = this.handleUploadAvatar.bind(this);
        this.handleUploadCoverImage = this.handleUploadCoverImage.bind(this);

    }

    handleSubmit(e) {
        e.preventDefault();
        const {slug, shortName, longName, slogan, game, description} = this.state;
        let errors = syncValidate({slug, shortName, longName});
        this.setState({errors});
        if (!errors.slug && !errors.shortName && !errors.longName) {
            this.props.createTeamRequest(slug, shortName, longName, game, description, slogan);
        }
    }

    handleChangeGame(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleChangeSlug(e) {
        const slug = e.target.value;
        this.setState({slug});
    }

    handleChangeShortName(e) {
        const shortName = e.target.value;
        this.setState({shortName});

    }

    handleChangeLongName(e) {
        const longName = e.target.value;
        this.setState({longName});

    }

    handleChangeSlogan(e) {
        const slogan = e.target.value;
        this.setState({slogan});

    }

    handleChangeDescription(e) {
        const description = e.target.value;
        this.setState({description});

    }

    handleChangeRank(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleChangeAddress(e) {
        this.setState({[e.target.name]: e.target.value});
    }
    handleUploadAvatar(e) {
        const image = e.target.files[0];
        image && this.setState({openImageUploader: true, image})
    }
    handleUploadCoverImage(e) {
        const urlCoverImage = URL.createObjectURL(e.target.files[0]);
        this.setState({urlCoverImage});
    }

    render() {

        const {classes, errorResponse} = this.props;
        const {slug, shortName, longName, game, description, slogan, errors, urlAvatar, urlCoverImage} = this.state;
        return (
            <section>
                <Container>
                    <section className={classes.titleSection}>
                        <Typography className={classes.title} gutterBottom align='left'>
                            tạo đội
                        </Typography>
                    </section>
                    <section>
                        <form>
                            <Grid spacing={7} container>
                                <Grid item xs={12} md={2} lg={2} className={classes.slug}>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12} className={classes.slug}>
                                    <Typography gutterBottom align='left' className={classes.labelSlug}>

                                        <Hidden smDown><span
                                            style={{fontSize: '1.2rem'}}>Địa chỉ truy cập: </span></Hidden> https://timkeo.com/
                                    </Typography>
                                    <div className={classes.inputSlug}>
                                        <CssTextField
                                            placeholder="skt"
                                            variant="outlined"
                                            autoFocus={true}
                                            value={slug}
                                            onChange={this.handleChangeSlug}
                                            inputProps={
                                                {maxLength:'100'}
                                            }
                                        />
                                        {
                                            errors.slug &&
                                            <Typography component="p" className={classes.errorMessage}>
                                                {errors.slug}
                                            </Typography>
                                        }
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <CssTextField
                                        label="Tên đội *"
                                        placeholder="SKT"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={shortName}
                                        onChange={this.handleChangeShortName}
                                        inputProps={
                                            {maxLength:'6'}
                                        }
                                    />
                                    {
                                        errors.shortName &&
                                        <Typography component="p" className={classes.errorMessage}>
                                            {errors.shortName}
                                        </Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} md={8} lg={8}>
                                    <CssTextField
                                        label="Tên đầy đủ *"
                                        placeholder="SK Telecom Team 1"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={longName}
                                        onChange={this.handleChangeLongName}
                                        inputProps={
                                            {maxLength:'40'}
                                        }
                                    />
                                    {
                                        errors.longName &&
                                        <Typography component="p" className={classes.errorMessage}>
                                            {errors.longName}
                                        </Typography>
                                    }
                                </Grid>
                                <Grid item xs={12} md={4} lg={4}>
                                    <InputLabel className={classes.label}>Game *</InputLabel>
                                    <CssTextField select
                                                  inputProps={{name: 'game'}}
                                                  onChange={this.handleChangeGame}
                                                  value={game}
                                    >
                                        {
                                            gameOptions.map(option => (
                                                <MenuItem value={option.value}
                                                          key={option.value}>{option.label}</MenuItem>
                                            ))
                                        }
                                    </CssTextField>
                                </Grid>
                                <Grid item xs={12} md={8} lg={8}>
                                    <CssTextField
                                        label="Slogan"
                                        placeholder="Master your self. Master your enemy"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                        value={slogan}
                                        onChange={this.handleChangeSlogan}
                                        inputProps={
                                            {maxLength:'200'}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    <CssTextField
                                        label="Giới thiệu ..."
                                        rows="4"
                                        multiline
                                        placeholder="Đội mình rảnh cuối tuần"
                                        fullWidth
                                        margin="normal"
                                        variant="outlined"
                                        value={description}
                                        onChange={this.handleChangeDescription}
                                        inputProps={
                                            {maxLength:'500'}
                                        }
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <input type="file" onChange={this.handleUploadAvatar}/>
                                </Grid>
                                <Grid item xs={12} md={12} lg={12}>
                                    {
                                        errorResponse &&
                                        <Typography component="p" className={classes.errorMessage}>
                                            {errorResponse.message}
                                        </Typography>
                                    }
                                    <Button variant="contained" color="default" className={classes.btnCreate}
                                            type='submit' onClick={this.handleSubmit}>
                                        Tạo đội
                                        <AddCircleOutline className={classes.rightIcon}/>
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </section>
                </Container>
                {/*<DialogCustomer*/}
                {/*    open={this.state.openImageUploader}*/}
                {/*    title={"Tạo ảnh đại diện"}*/}
                {/*    commentOfProBird={"Ảnh đại diện là bộ mặt của team. Hãy chọn ảnh thật đẹp nhé ^^"}*/}
                {/*    textBtnOk={"Lưu"}*/}
                {/*    textBtnCancel={"Huỷ"}*/}
                {/*    handleSubmit={() => {*/}

                {/*    }}*/}
                {/*    closeDialog={() => {*/}
                {/*        this.setState({openImageUploader: false, image: ''});*/}
                {/*    }}*/}

                {/*    dialogContent={*/}
                {/*        <SingleImageUploader image={this.state.image} />*/}
                {/*    }*/}
                {/*/>*/}
            </section>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    errorResponse: state => state.createTeamData.error,
    teamInfo: state => state.createTeamData.teamInfo,
});
const mapDispatchToProps = dispatch => ({
    createTeamRequest: (slug, shortName, longName, game, description, slogan) => dispatch(createTeamRequest(slug, shortName, longName, game, description, slogan))
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(CreateTeamComponent);