import React from 'react';
import {withStyles} from "@material-ui/core";

const styles = theme => {
    return {
        gameLogos: {
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                justifyContent: 'space-around'
            }
        },
        gameLogo: {
            paddingRight: '30px',
            paddingLeft: '30px',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12);',
            [theme.breakpoints.down('xs')]: {
                paddingRight: 'unset',
                paddingLeft: 'unset',
            }
        },
    }
};

class GameLogosComponent extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <section className={classes.gameLogos}>
                <div className={classes.gameLogo} style={{display: 'flex', alignItems: 'center'}}>
                    <img src="/static/images/home/aoe-logo.png"/>
                </div>
                <div className={classes.gameLogo}>
                    <img src="/static/images/home/lol-logo.svg"/>
                </div>
                <div className={classes.gameLogo}>
                    <img src="/static/images/home/fo4-logo.svg"/>
                </div>
            </section>
        )
    }
}

export default withStyles(styles)(GameLogosComponent)
