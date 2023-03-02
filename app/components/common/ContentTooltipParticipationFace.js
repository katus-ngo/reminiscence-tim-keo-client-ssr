import React, {Component} from 'react';
import {
    Typography,
    Card,
    withStyles,
} from "@material-ui/core";
import PropTypes from 'prop-types';
import ParticipationFace from "./ParticipationFace";
import ButtonCustom from "./ButtonCustom";

const styles = theme => {
    return {
        box: {
            width: 268,
            backgroundColor: '#21232B',
            padding: theme.spacing(2)
        },
        rates:{
            width: '100%',
            display: 'flex',
            justifyContent:'space-around',
            marginTop: 16
        },
        rate:{
            display: 'flex',
            width:'100%',
            flexDirection: 'column',
            alignItems:'center'
        },
        action: {
            marginTop: 16,
        }
    }
};

class ContentTooltipParticipationFace extends Component {
    handleAction=()=>{
        this.props.handleAction()
    }
    render() {
        const {
            classes,
            participantType,
            participation,
            avatarSize,
            avatarMagrinBottom,
            nameSize,
            showVerify,
            vertical,
            labelButton,
            backgroundColorButton,
            backgroundColorButtonHover,
        } = this.props;
        return (
            <Card className={classes.box}>
                <ParticipationFace participantType={participantType}
                                   participation={participation}
                                   vertical={vertical}
                                   avatarSize={avatarSize}
                                   avatarMagrinBottom={avatarMagrinBottom}
                                   nameSize={nameSize}
                                   showVerify={showVerify}
                />
                <div className={classes.rates}>
                    <div className={classes.rate}>
                        <Typography variant='body2' color='textPrimary'>Uy tín</Typography>
                        <Typography variant='body1' color='textSecondary'>75%</Typography>
                    </div>
                    <div className={classes.rate}>
                        <Typography variant='body2' color='textPrimary'>Tỉ lệ chơi</Typography>
                        <Typography variant='body1' color='textSecondary'>75%</Typography>
                    </div>
                    <div className={classes.rate}>
                        <Typography variant='body2' color='textPrimary'>Tỉ lệ thắng</Typography>
                        <Typography variant='body1' color='textSecondary'>75%</Typography>
                    </div>
                </div>
                <div className={classes.action}>
                    <ButtonCustom label={labelButton} fullWidth={true}
                                  backgroundColor={backgroundColorButton}
                                  backgroundColorHover={backgroundColorButtonHover}
                    onClick={this.handleAction}/>
                </div>
            </Card>
        );
    }
}

ContentTooltipParticipationFace.defaultProps = {
    participantType: 'team',
    avatarSize: 54,
    nameSize: 14,
    vertical: true,
    avatarMagrinBottom: 8,
    showVerify: false,
    labelButton: 'Tham gia',
    backgroundColorButton:'#10baa8',
};
ContentTooltipParticipationFace.propsTypes = {
    participation: PropTypes.object,
    participantType: PropTypes.oneOf(['team', 'user']),
    avatarSize: PropTypes.number,
    nameSize: PropTypes.number,
    avatarMagrinBottom: PropTypes.number,
    vertical: PropTypes.bool,
    showVerify: PropTypes.bool,
    labelButton: PropTypes.string,
    backgroundColorButton: PropTypes.string,
    backgroundColorButtonHover: PropTypes.string,
    handleAction:PropTypes.func,
};
export default withStyles(styles)(ContentTooltipParticipationFace);