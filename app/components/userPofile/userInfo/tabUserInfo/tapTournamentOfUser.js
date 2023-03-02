import React, {Component} from 'react';
import BriefInfoTournament from "../../../common/BriefInfoTournament";
import {briefInfoTournaments} from 'app/fakeData/briefInfoTournament';
import {
    Grid,
} from '@material-ui/core'
class TapTournamentOfUser extends Component {
    render() {
        return (
            <Grid spacing={3} container>
                {
                    briefInfoTournaments.map((briefInfoTournament,key)=>(
                        <Grid key={key} item xs={12} sm={12} md={6} lg={4} xl={3}>
                            <BriefInfoTournament briefInfoTournament={briefInfoTournament}/>
                        </Grid>
                    ))
                }
            </Grid>
        );
    }
}

export default TapTournamentOfUser;