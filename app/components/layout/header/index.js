import React from 'react';
import {
    AppBar,
    Container,
    Hidden
} from "@material-ui/core";
import DesktopHeader from "./desktopHeader";
import MobileHeader from "./mobileHeader";
import DesktopBanner from "./desktopBanner";
import {
    withStyles,

} from "@material-ui/core/index";
import PropTypes from 'prop-types';
import SignInDialogComponent from "app/components/sign-in-sign-up-dialog/signInDialogComponent";
import SignUpDialogComponent from "app/components/sign-in-sign-up-dialog/signUpDialogComponent";
import CreateTeamDialog from "app/components/createTeam/createTeamDialog";
import Link from 'app/utils/Link';

const styles = theme => {
    return {
        sectionTop: {
            backgroundSize: 'cover',
            background: 'url(/static/images/home/demacia.jpg) no-repeat',
        },
        champion: {
            position: 'absolute',
            width: '50%',
            height: '557px',
            bottom: '0',
            backgroundImage: 'url("/static/images/home/riven.png")',
            backgroundPositionX: 'right',
            backgroundPositionY: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
        }
    }
};

class Header extends React.Component {
    render() {
        const {classes, hide} = this.props;
        return (
            <section>
                <Hidden smDown>
                <section style={{position: 'relative'}} className={classes.sectionTop}>
                    <DesktopHeader/>
                    <DesktopBanner hide={hide}/>
                    {
                        !hide && <Link routeName={"home"}><div className={classes.champion}></div></Link>
                    }
                </section>
                </Hidden>

                <Hidden mdUp>
                <MobileHeader/>
                </Hidden>
                <SignInDialogComponent/>
                <SignUpDialogComponent/>
                <CreateTeamDialog/>
            </section>
        )
    }
}

Header.propTypes = {
    hide: PropTypes.bool
};
export default withStyles(styles)(Header);
