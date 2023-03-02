import React, {Component} from 'react';
import CoverProfileTeam from "./coverProfileTeam";
import InfoTeam from "./teamInfo";
import {createStructuredSelector} from "reselect";
import {compose} from 'recompose';
import {connect} from "react-redux";
import {updateTeamProfile} from "app/containers/teamProfile/actions";
import {
    Container,
    withStyles
} from "@material-ui/core";
import SingleImageUploader from "app/components/single-image-uploader/singleImageUploader";
import ProBirdDialog from "app/components/common/proBirdDialog";
import {imageUploaderService} from "app/services";
import {generateUpdateTeamRequestFromTeamProfile} from "app/utils/request-payload.helper";

const styles = theme => {
    return {
        teamProfile: {
            marginTop: theme.spacing(1)
        },
    }
};


class TeamProfileComponent extends Component {
    constructor(props) {
        super(props);
        this.fileSelector = React.createRef();

        this.state = {
            croppedImage: '',
            openAvatarUploader: false,
            openCoverUploader: false,
            type: '',
        };
    }

    openImageSelector = (type) => {
        this.setState({type});
        this.fileSelector.current.click();
    };

    onImageSelected = e => {
        const {type} = this.state;
        type === 'avatar' && this.setState({
            image: e.target.files[0],
            openAvatarUploader: true
        });
        type === 'cover' && this.setState({
            image: e.target.files[0],
            openCoverUploader: true
        });

    };

    handleSaveAvatar = () => {
        if (this.state.croppedImage) {
            imageUploaderService.uploadByBase64Data(this.state.croppedImage).then(image => {
                const {teamInfo} = this.props;

                const teamRequest = generateUpdateTeamRequestFromTeamProfile(teamInfo, {avatarId: image['id']});
                this.props.updateTeamProfile(teamRequest);
                this.setState({openAvatarUploader: false});
            })
        }
    };

    handleSaveCover = () => {
        if (this.state.croppedImage) {
            imageUploaderService.uploadByBase64Data(this.state.croppedImage).then(image => {
                const {teamInfo} = this.props;

                const teamRequest = generateUpdateTeamRequestFromTeamProfile(teamInfo, {coverId: image['id']});
                this.props.updateTeamProfile(teamRequest);
                this.setState({openCoverUploader: false});
            })
        }
    };

    componentDidUpdate() {

    }

    render() {
        const {teamInfo, classes, profile} = this.props;
        const {openAvatarUploader, openCoverUploader} = this.state;
        const {teamMetaInfo} = teamInfo;
        const {shortName, longName, slogan, avatar} = teamMetaInfo;
        let {cover} = teamMetaInfo;
        cover = cover ? cover : '/static/images/team/cover-default.jpg';
        const {game} = teamInfo;
        const {teamParticipations} = teamInfo;
        const captainInfo = teamParticipations.filter(teamParticipation => teamParticipation.teamRole === 'CAPTAIN');
        const isCaptain = profile ? (captainInfo[0].member.id === profile.id) : false;
        return (
            <section className={classes.teamProfile}>
                <Container maxWidth='lg'>
                    <CoverProfileTeam shortName={shortName}
                                      longName={longName}
                                      avatar={avatar}
                                      cover={cover}
                                      slogan={slogan}
                                      game={game}
                                      handleClickUpdateAvatar={()=>this.openImageSelector('avatar')}
                                      handleClickUpdateCover={()=>this.openImageSelector('cover')}
                                      isCaptain={isCaptain}
                    />
                    <InfoTeam teamInfo={teamInfo} isCaptain={isCaptain}/>
                    <input type='file' style={{display: "none"}} ref={this.fileSelector} onChange={this.onImageSelected}
                           accept="image/png,image/gif,image/jpeg,image/jpg"/>
                    <ProBirdDialog
                        open={openAvatarUploader}
                        content={
                            <SingleImageUploader
                                image={this.state.image}
                                width={320}
                                height={320}
                                borderRaidius={160}
                                border={[100,0]}
                                onImageChange={(croppedImage) => this.setState({croppedImage})}
                            />
                        }
                        title="Tạo ảnh đại diện"
                        comment="Ảnh đại diện là bộ mặt của team, hãy chọn ảnh thật ngầu nhé ^^"
                        onCancel={() => this.setState({openAvatarUploader: false})}
                        onSubmit={this.handleSaveAvatar}
                        haveFooter={true}
                        haveProBird={true}
                    />
                    <ProBirdDialog
                        open={openCoverUploader}
                        content={
                            <SingleImageUploader
                                width={1126}
                                height={315}
                                image={this.state.image}
                                onImageChange={(croppedImage) => this.setState({croppedImage})}
                            />
                        }
                        title="Tạo ảnh bìa"
                        comment="Ảnh bìa thể hiện thần thái của team, hãy chọn ảnh thật ngầu nhé ^^"
                        onCancel={() => this.setState({openCoverUploader: false})}
                        onSubmit={this.handleSaveCover}
                        haveFooter={true}
                        haveProBird={true}
                    />
                </Container>
            </section>
        );
    }
}

TeamProfileComponent.propTypes = {};

const mapStateToProps = createStructuredSelector({
    teamInfo: state => state.teamProfileData.teamInfo,
    profile: state => state.auth.profile,
});
const mapDispatchToProps = dispatch => ({
    updateTeamProfile: (updateTeamRequest) => dispatch(updateTeamProfile(updateTeamRequest))
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(TeamProfileComponent);