import React from 'react';
import Layout from 'app/components/layout';
import {withStyles} from '@material-ui/core/styles';
import CreateTeamContainer from 'app/containers/createTeam'
import {routerPush, routerRedirectServer} from "app/utils/Router";
import defaultPage from "/hocs/defaultPage";
import {openDialogSignIn} from "app/containers/sign-in-sign-up-dialog/actions";
import {closeMobileMenu} from "app/containers/layout/actions";

const styles = theme => {
    return {
        text: {
            color: 'red',
        },
    }
};

class CreateTeam extends React.Component {
    constructor(props){
        super(props);
    }
    static async getInitialProps({store,isLogged, res}) {
        if (!isLogged) {
            store.dispatch(closeMobileMenu(false));
            store.dispatch(openDialogSignIn(true,{name:'create-team'}));
            if (res) {
                routerRedirectServer(res, 'home');
            } else {
                routerPush('home');
            }
        }
    }
    render() {
        return (
            <Layout>
                <CreateTeamContainer/>
            </Layout>
        )
    }
}

export default withStyles(styles)(defaultPage(CreateTeam))