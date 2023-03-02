import React from 'react';
import Layout from 'app/components/layout';
import {withStyles} from '@material-ui/core/styles';
import ListTeamContainer from 'app/containers/listTeam'
import defaultPage from "hocs/defaultPage";

const styles = theme => {
    return {
        text: {
            color: 'red',
        },
    }
};

class ListTeam extends React.Component {
    render() {

        const {classes} = this.props;
        return (
            <Layout>
                <ListTeamContainer/>
            </Layout>
        )
    }
}

export default withStyles(styles)(defaultPage(ListTeam))