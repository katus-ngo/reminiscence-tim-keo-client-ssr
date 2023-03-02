import React from 'react';
import {compose} from 'recompose'
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {injectIntl} from "react-intl";
import {
    withStyles,
    Typography,
    Container,
    Avatar,
    Grid,
    Card,
    CardContent,
    CardActionArea,
    ListItem,
    ListItemIcon,
    ListItemText,
    List,
} from "@material-ui/core";
import RatingCustom from "/app/components/common/ratingCustom";
import {
    IconVersusGame
} from 'app/components/icon';
import {
    Cake,
    BubbleChart,
} from '@material-ui/icons';
import moment from 'moment';
import 'moment/locale/vi';
import Link from 'app/utils/Link';
import {
    listTeamsRequest
} from 'app/containers/listTeam/actions'
import {createStructuredSelector} from 'reselect'
import {generateLetterAvatar} from "../../utils/generateLetterAvatar.helper";
import {generateImageUrl} from "../../utils/ImageHelper";

const stylesTeamOverview = theme => {
    return {
        teamCard: {
            backgroundSize: 'cover',
            background: 'url(/static/images/home/demacia-01.jpg) no-repeat',
            position: 'relative',
            '&:before': {
                content: '""',
                background: 'rgba(0, 0, 0, 0.7)',
                width: '100%',
                position: 'absolute',
                height: '100%',
            },
            '&:hover': {
                boxShadow: '0px 1px 16px #e4ff24'
            },
            transition: 'all 0.3s'
        },
        top: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
        },
        whiteColor: {
            color: 'white'
        },
        nameTeam: {
            color: '#e64a19',
            fontSize: '20px',
            marginLeft: '10px'
        },
        avatar: {
            backgroundColor: '#e64a19',
            '&:hover': {
                cursor: 'pointer',
                backgroundColor: '#a13311'
            },
        },
    }
};

class TeamOverview extends React.Component {
    render() {
        const {
            classes,
            dataListTeam
        } = this.props;
        return (
            <Grid spacing={3} container>
                {
                    dataListTeam.content.map((team, key) => {
                        const {rate,} = team;
                        const {game, slug} = team;
                        const {avatar, longName, shortName} = team.teamMetaInfo;
                        const letterAvatar = generateLetterAvatar(shortName).toLocaleUpperCase();
                        const createDate = moment(team.createdAt).locale('vi').format("DD-MM-YYYY");
                        return (
                            <Link routeName={"team-profile"} query={{"slug": slug}} key={key}>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <Card className={classes.teamCard} raised>
                                        <CardActionArea>
                                            <CardContent>
                                                <div className={classes.top}>
                                                    <div style={{display: 'flex', alignItems: 'center'}}>
                                                        {
                                                            avatar && <Avatar alt={shortName} src={generateImageUrl(avatar.original)}
                                                                              className={classes.avatar}/>
                                                        }
                                                        {
                                                            !avatar && <Avatar alt={shortName}
                                                                               className={classes.avatar}>{letterAvatar}</Avatar>
                                                        }
                                                        <Typography className={classes.nameTeam}>
                                                            {shortName}
                                                        </Typography>
                                                    </div>
                                                    <RatingCustom max={5} value={rate} color='#19e627'/>
                                                </div>
                                                <List className={classes.mid}>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <BubbleChart className={classes.whiteColor}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.whiteColor}
                                                                      primary={longName}/>
                                                    </ListItem>
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <Cake className={classes.whiteColor}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.whiteColor}
                                                                      primary={createDate}/>
                                                    </ListItem>
                                                    {/*<ListItem>*/}
                                                    {/*    <ListItemIcon>*/}
                                                    {/*        <Group className={classes.whiteColor}/>*/}
                                                    {/*    </ListItemIcon>*/}
                                                    {/*    <ListItemText className={classes.whiteColor}*/}
                                                    {/*                  primary={member + ' thành viên'}/>*/}
                                                    {/*</ListItem>*/}
                                                    {/*<ListItem>*/}
                                                    {/*    <ListItemIcon>*/}
                                                    {/*        <IconRank className={classes.whiteColor}/>*/}
                                                    {/*    </ListItemIcon>*/}
                                                    {/*    <ListItemText className={classes.whiteColor}*/}
                                                    {/*                  primary={<ConvertRank gameId={gameId}*/}
                                                    {/*                                        rankNumber={rank}*/}
                                                    {/*                                        title='Rank'/>}/>*/}
                                                    {/*</ListItem>*/}
                                                    <ListItem>
                                                        <ListItemIcon>
                                                            <IconVersusGame className={classes.whiteColor}/>
                                                        </ListItemIcon>
                                                        <ListItemText className={classes.whiteColor} primary={game}/>
                                                    </ListItem>
                                                </List>
                                            </CardContent>
                                        </CardActionArea>
                                    </Card>
                                </Grid>
                            </Link>
                        )
                    })
                }
            </Grid>
        )
    }
}

TeamOverview.propTypes = {
    dataListTeam: PropTypes.object,
};
TeamOverview = withStyles(stylesTeamOverview)(injectIntl(TeamOverview));

const styles = theme => {
    return {
        titleSection: {
            margin: '50px 0 30px 0'
        },
        title: {
            textTransform: 'uppercase',
            fontSize: '30px',
            color: 'white',
        }
    }
};

class ListTeamComponent extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.listTeamsRequest();
    }

    render() {
        const {classes, dataListTeam} = this.props;
        return (
            <section>
                <Container>
                    <section className={classes.titleSection}>
                        <Typography className={classes.title} gutterBottom align='center'>
                            danh sách đội
                        </Typography>
                    </section>
                    <section>
                        <TeamOverview dataListTeam={dataListTeam}/>
                    </section>
                </Container>
            </section>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    dataListTeam: state => state.listTeamData.dataListTeam
});
const mapDispatchToProps = dispatch => ({
    listTeamsRequest: () => dispatch(listTeamsRequest())
});
export default compose(
    withStyles(styles),
    connect(mapStateToProps, mapDispatchToProps),
)(ListTeamComponent);