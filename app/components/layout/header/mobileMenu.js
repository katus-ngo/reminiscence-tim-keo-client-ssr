import React from 'react';
import {
    Drawer,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    withStyles, Button
} from "@material-ui/core";
import People from '@material-ui/icons/People';
import {
    IconLogout,
} from 'app/components/icon';
import {
    Person,
} from '@material-ui/icons';
import {createStructuredSelector} from "reselect";
import {closeMobileMenu} from "app/containers/layout/actions";
import {compose} from "recompose";
import {connect} from "react-redux";
import {logOut} from "app/containers/AuthProvider/actions";
import Link from 'app/utils/Link';
import {
    openDialogSignIn,
    openDialogSignUp
} from 'app/containers/sign-in-sign-up-dialog/actions'

const styles = theme => {
    return {
        logo: {
            fontFamily: [
                'Vehicle Breaks Down'
            ].join(','),
            color: '#e64a19',
            fontSize: 30
        },
        sectionLogo: {
            height: '60px',
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)'
        },
        btnLogin: {
            backgroundColor: '#e64a19',
            '&:hover': {
                backgroundColor: '#a13311'
            }
        },
        btnRegister: {
            backgroundColor: '#00af00',
            '&:hover': {
                backgroundColor: '#007a00'
            }
        }
    }
};

class MobileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.closeMobileMenu = this.closeMobileMenu.bind(this);
        this.handleLogOut = this.handleLogOut.bind(this);
        this.handleOpenDialogSignIn = this.handleOpenDialogSignIn.bind(this);
        this.handleOpenDialogSignUp = this.handleOpenDialogSignUp.bind(this);
    }

    closeMobileMenu() {
        this.props.closeMobileMenu(false);
    }

    handleLogOut() {
        this.props.logOut();
    }

    handleOpenDialogSignIn() {
        this.props.closeMobileMenu(false);
        this.props.openDialogSignIn(true);
    }

    handleOpenDialogSignUp() {
        this.props.closeMobileMenu(false);
        this.props.openDialogSignUp(true);
    }

    render() {
        const {classes, openMobileMenu, profile} = this.props;
        return (
            <Drawer open={openMobileMenu} onClose={this.closeMobileMenu}>
                <div className={classes.sectionLogo}>
                    <Typography noWrap className={classes.logo}>
                        Tim Keo
                    </Typography>
                </div>
                <List>
                    {profile && <Link routeName={"user-profile"} query={{"id": profile.id}}>
                        <ListItem button onClick={this.closeMobileMenu}>
                            <ListItemIcon>
                                <Person/>
                            </ListItemIcon>
                            <ListItemText primary={'Trang cá nhân'}/>
                        </ListItem>
                    </Link>}
                    {profile && <Link routeName={"user-profile"} query={{"id": profile.id, tab: 'teams'}}>
                        <ListItem button onClick={this.closeMobileMenu}>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary={'Đội của tôi'}/>
                        </ListItem>
                    </Link>}
                    {/*<ListItem button>*/}
                        {/*<ListItemIcon>*/}
                            {/*<Alarm/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={'Các kèo sắp diễn ra'}/>*/}
                    {/*</ListItem>*/}
                    {/*<Link routeName={"create-team"}>*/}
                    {/*    <ListItem button>*/}
                    {/*        <ListItemIcon>*/}
                    {/*            <IconHandShake fontSize='large' translate='translate(-1089 -135)'/>*/}
                    {/*        </ListItemIcon>*/}
                    {/*        <ListItemText primary={'Tạo kèo'}/>*/}
                    {/*    </ListItem>*/}
                    {/*</Link>*/}
                </List>
                <Divider/>
                {profile && <List>
                    {/*<ListItem button>*/}
                        {/*<ListItemIcon>*/}
                            {/*<Key/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={'Đổi mật khẩu'}/>*/}
                    {/*</ListItem>*/}
                    <ListItem button onClick={this.handleLogOut}>
                        <ListItemIcon>
                            <IconLogout/>
                        </ListItemIcon>
                        <ListItemText primary={'Đăng xuất'}/>
                    </ListItem>
                </List>
                }
                {!profile && <List>
                    <ListItem>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.btnLogin}
                            onClick={this.handleOpenDialogSignIn}
                        >
                            Đăng nhập
                        </Button>
                    </ListItem>
                    <ListItem>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.btnRegister}
                            onClick={this.handleOpenDialogSignUp}
                        >
                            Đăng ký
                        </Button>
                    </ListItem>
                </List>
                }

            </Drawer>
        )
    }
}


const mapStateToProps = createStructuredSelector({
    profile: state => state.auth.profile,
    openMobileMenu: state => state.layoutData.openMobileMenu
});
const mapDispatchToProps = dispatch => ({
    closeMobileMenu: (open) => dispatch(closeMobileMenu(open)),
    openDialogSignIn: (open) => dispatch(openDialogSignIn(open)),
    openDialogSignUp: (open) => dispatch(openDialogSignUp(open)),
    logOut: () => dispatch(logOut()),

});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(MobileMenu);