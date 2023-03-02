import React from 'react';
import {
    Container, Fab,
    Typography,
    withStyles,
} from "@material-ui/core/index";
import PropTypes from 'prop-types';
import {compose} from 'recompose'
import {logOut} from "app/containers/AuthProvider/actions";
import {openDialogCreateTeam} from "app/containers/createTeam/actions";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import {openDialogSignIn} from "app/containers/sign-in-sign-up-dialog/actions";

const styles = theme => {
    return {
        banner: {
            height: '516px',
            width: '100%',
            position: 'relative',
            '&:before': {
                content: '""',
                background: 'rgba(0, 0, 0, 0.8)',
                width: '100%',
                position: 'absolute',
                height: '100%',
            }
        },
        champion: {
            position: 'absolute',
            width: '70%',
            height: '557px',

        },
        advantages: {
            position: 'absolute',
            width: '500px',
            height: '425px',
            right: '32px',
            top: '50%',
            transform: 'translate(0,-50%)'
        },
        advTitle: {
            fontFamily: [
                'Open Sans'
            ].join(','),
            fontSize: 40,
            fontWeight: 800,
            color: 'white',
            textTransform: 'uppercase'
        },
        advContents: {
            '& p': {
                fontFamily: [
                    'Open Sans'
                ].join(','),
                fontSize: 18,
                color: 'white',
                '& span': {
                    color: '#e64a19',
                    textTransform: 'uppercase'
                }
            },
            position: 'relative',
            marginLeft: '25px'

        },
        advContent: {
            display: 'flex',
            alignItems: 'center',
            marginBottom: '30px',
        },
        advContentCircle: {
            width: '11px',
            height: '11px',
            borderRadius: '50%',
            backgroundColor: 'white',
            marginRight: '30px'
        },
        advLine: {
            width: '1px',
            height: '100%',
            backgroundColor: 'white',
            position: 'absolute',
            left: '5px'
        },
        advCta: {
            width: '80%',
            height: '60px',
            display: 'flex',
            justifyContent: 'space-between'
        },
        btnCreateTeam: {
            backgroundColor: '#e64a19',
            color: '#ebeef2',
            fontSize:'1.2rem',
            fontWeight: 'bold',
            '&:hover': {
                backgroundColor: '#a13311'
            },
            height:'100%',
            maxWidth:'48%',
            width: '100%'
        },
        btnCreateChallenge: {
            fontSize:'1.2rem',
            fontWeight: 'bold',
            height:'100%',
            maxWidth:'48%',
            width: '100%'
        }
    }
};

class DesktopBanner extends React.Component {
    constructor(props){
        super(props);
        this.openDialogCreateTeam = this.openDialogCreateTeam.bind(this);
    }
    openDialogCreateTeam(){
        if(this.props.profile){
            this.props.openDialogCreateTeam();
        } else {
            this.props.openDialogSignIn(true);
        }
    }
    render() {
        const {classes, hide} = this.props;
        return (
            <div>
                {!hide &&
                <section className={classes.banner}>
                    <Container fixed style={{position: 'relative', height: '100%'}}>
                        <div className={classes.advantages}>
                            <Typography noWrap className={classes.advTitle}>
                                tìm đối - đặt kèo
                            </Typography>
                            <div className={classes.advContents}>
                                <div className={classes.advLine}></div>
                                <div className={classes.advCircle}>
                                    <div className={classes.advContent}>
                                        <div className={classes.advContentCircle}></div>
                                        <Typography noWrap>
                                            Hoàn toàn <span>miễn phí</span>
                                        </Typography>
                                    </div>
                                    <div className={classes.advContent}>
                                        <div className={classes.advContentCircle}></div>
                                        <Typography noWrap>
                                            Thi đấu <span>online</span> & <span>ofline</span>
                                        </Typography>
                                    </div>
                                    <div className={classes.advContent}>
                                        <div className={classes.advContentCircle}></div>
                                        <Typography noWrap>
                                            Đội ngũ Caster <span>chuyên nghiệp</span>
                                        </Typography>
                                    </div>
                                    <div className={classes.advContent}>
                                        <div className={classes.advContentCircle}></div>
                                        <Typography noWrap>
                                            Tìm đối giao lưu <span>nâng cao trình độ</span>
                                        </Typography>
                                    </div>
                                    <div className={classes.advContent}>
                                        <div className={classes.advContentCircle}></div>
                                        <Typography noWrap>
                                            <span>giải đấu</span> thường niên - <span>phần thưởng</span> hấp dẫn
                                        </Typography>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.advCta}>
                                <Fab variant="extended" className={classes.btnCreateChallenge}>
                                    Tạo kèo
                                </Fab>
                                <Fab variant="extended" className={classes.btnCreateTeam} onClick={this.openDialogCreateTeam}>
                                    Tạo đội
                                </Fab>
                            </div>
                        </div>
                    </Container>
                </section>
                }
            </div>
        )
    }
}

DesktopBanner.propTypes = {
    hide: PropTypes.bool
};
const mapStateToProps = createStructuredSelector({
    profile: state => state.auth.profile,
});
const mapDispatchToProps = dispatch => ({
    logOut: () => dispatch(logOut()),
    openDialogCreateTeam: () => dispatch(openDialogCreateTeam()),
    openDialogSignIn: (open) => dispatch(openDialogSignIn(open)),
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(DesktopBanner);