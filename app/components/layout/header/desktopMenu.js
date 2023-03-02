import React from 'react';
import Menu from '@material-ui/core/Menu';
import {connect} from "react-redux";
import {compose} from 'recompose'
import {createStructuredSelector} from 'reselect';
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from "@material-ui/core";
import {closeDesktopMenu} from "app/containers/layout/actions";
import {
    Person,
    People,
} from '@material-ui/icons';
import {
    IconLogout,
} from 'app/components/icon';
import {logOut} from "app/containers/AuthProvider/actions";
import Link from "../../../utils/Link";

const styles = theme => {
    return {
        menuItem: {
            color: '#a4a4a4'
        }
    }
};

class DesktopMenu extends React.Component {
    constructor(props) {
        super(props);
        this.handleMenuClose = this.handleMenuClose.bind(this);
    }

    handleMenuClose(action) {
        this.props.closeDesktopMenu(null);
        if (action === 'logOut') {
            this.props.logOut();
        }
    }

    render() {
        const {classes, anchorEl, profile} = this.props;
        const isOpen = Boolean(anchorEl);
        const {slug} = profile || {};
        return (
            <Menu
                anchorEl={anchorEl}
                className={classes.menu}
                getContentAnchorEl={null}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                keepMounted
                open={isOpen}
                onClose={this.handleMenuClose}>
                <List>
                    <Link routeName={"user-profile"} query={{"slug": slug}}>
                        <ListItem button onClick={this.handleMenuClose}>
                            <ListItemIcon>
                                <Person/>
                            </ListItemIcon>
                            <ListItemText primary={'Trang cá nhân'}/>
                        </ListItem>
                    </Link>
                    <Link routeName={"user-profile"} query={{"slug": slug, tab: 'teams'}}>
                        <ListItem button onClick={this.handleMenuClose}>
                            <ListItemIcon>
                                <People/>
                            </ListItemIcon>
                            <ListItemText primary={'Đội của tôi'}/>
                        </ListItem>
                    </Link>
                    {/*<ListItem button onClick={this.handleMenuClose}>*/}
                        {/*<ListItemIcon>*/}
                            {/*<Alarm/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={'Các kèo sắp diễn ra'}/>*/}
                    {/*</ListItem>*/}
                    {/*<ListItem button onClick={this.handleMenuClose}>*/}
                        {/*<ListItemIcon>*/}
                            {/*<IconHandShake fontSize='large' translate='translate(-1089 -135)'/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={'Tạo kèo'}/>*/}
                    {/*</ListItem>*/}
                    {/*<ListItem button onClick={this.handleMenuClose}>*/}
                        {/*<ListItemIcon>*/}
                            {/*<Key/>*/}
                        {/*</ListItemIcon>*/}
                        {/*<ListItemText primary={'Đổi mật khẩu'}/>*/}
                    {/*</ListItem>*/}
                    <ListItem button onClick={() => {
                        this.handleMenuClose('logOut')
                    }}>
                        <ListItemIcon>
                            <IconLogout/>
                        </ListItemIcon>
                        <ListItemText primary={'Đăng xuất'}/>
                    </ListItem>
                </List>
            </Menu>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    anchorEl: state => state.layoutData.anchorEl,
    profile: state => state.auth.profile,
});
const mapDispatchToProps = dispatch => ({
    closeDesktopMenu: (anchorEl) => dispatch(closeDesktopMenu(anchorEl)),
    logOut: () => dispatch(logOut()),
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(DesktopMenu);