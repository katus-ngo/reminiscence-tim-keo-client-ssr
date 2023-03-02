import React, {Component} from 'react';
import {
    Grid,
    Typography,
    Button,
    withStyles
} from '@material-ui/core';
import {
    DoneRounded
} from '@material-ui/icons'

const styles = theme => {
    return {
        fullWidth: {
            width: '100%',
            height: '100%',
            marginBottom: theme.spacing(5),
            [theme.breakpoints.down('xs')]: {
                marginTop: theme.spacing(3),
            }
        },
        container:{
            [theme.breakpoints.down('xs')]: {
                flexDirection: 'column-reverse'
            }
        },
        slogan:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            paddingTop: theme.spacing(2),
            paddingBottom: theme.spacing(2),
        },
        colorIcon: {
            color: theme.palette.secondary.main,
            fontSize: '24px',
            marginRight: theme.spacing(1)
        },
        sloganItem: {
            display: 'flex'
        },
        sloganContent: {
            fontSize: '16px',
        },
        guide: {
            display: 'flex',
            justifyContent: 'flex-end',
            [theme.breakpoints.down('xs')]: {
                justifyContent: 'center',
            }
        },
        guideContent: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            paddingRight: theme.spacing(2),
            paddingLeft: theme.spacing(2)
        },
    }
}

class HeaderCreateTournamentComponent extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.fullWidth}>
                <Grid container className={classes.container}>
                    <Grid item xs={12} sm={6} md={6} className={classes.slogan}>
                        <div className={classes.sloganItem}>
                            <DoneRounded className={classes.colorIcon}/>
                            <Typography className={classes.sloganContent} color='textPrimary'>Uy tín</Typography>
                        </div>
                        <div className={classes.sloganItem}>
                            <DoneRounded className={classes.colorIcon}/>
                            <Typography className={classes.sloganContent} color='textPrimary'>Hấp dẫn</Typography>
                        </div>
                        <div className={classes.sloganItem}>
                            <DoneRounded className={classes.colorIcon}/>
                            <Typography className={classes.sloganContent} color='textPrimary'>Nhiệt tình</Typography>
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} className={classes.guide}>
                        <div className={classes.proBird}>
                            <img src="/static/images/bird-fun.svg"/>
                        </div>
                        <div className={classes.guideContent}>
                            <Typography variant='body1' color='textPrimary'>Đây có phải thứ bạn cần?</Typography>
                            <Button variant="contained" color='secondary'>HƯỚNG DẪN</Button>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(HeaderCreateTournamentComponent);