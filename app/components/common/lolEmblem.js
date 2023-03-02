import React from "react";
import PropTypes from 'prop-types';
import {Tooltip, Typography, withStyles} from "@material-ui/core";
import {CheckCircleOutlined} from '@material-ui/icons';

const styles = theme => ({
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    summonerName: {
        display: 'flex',
        marginTop: theme.spacing(1),
        '& >p': {
            fontWeight: 'bold',
            fontSize: '1.1em'
        },
        '& >*': {
            marginLeft: theme.spacing(1)
        }
    },
    verified: {
        color: ''
    }
});

const emblems = {
    'CHALLENGER': {
        vn: 'Thách đấu',
        src: '/static/images/lol_emblems/Emblem_Challenger.png'
    },
    'GRANDMASTER': {
        vn: 'Đại cao thủ',
        src: '/static/images/lol_emblems/Emblem_Grandmaster.png'
    },
    'MASTER': {
        vn: 'Cao thủ',
        src: '/static/images/lol_emblems/Emblem_Master.png'
    },
    'DIAMOND': {
        vn: 'Kim cương',
        src: '/static/images/lol_emblems/Emblem_Diamond.png'
    },
    'PLATINUM': {
        vn: 'Bạch kim',
        src: '/static/images/lol_emblems/Emblem_Platinum.png'
    },
    'GOLD': {
        vn: 'Vàng',
        src: '/static/images/lol_emblems/Emblem_Gold.png'
    },
    'SILVER': {
        vn: 'Bạc',
        src: '/static/images/lol_emblems/Emblem_Silver.png'
    },
    'BRONZE': {
        vn: 'Đồng',
        src: '/static/images/lol_emblems/Emblem_Bronze.png'
    },
    'IRON': {
        vn: 'Sắt',
        src: '/static/images/lol_emblems/Emblem_Iron.png'
    }
};

const queues = {
    'RANKED_SOLO_5x5': 'Xếp hạng đơn/đôi',
    'RANKED_TEAM_5x5': 'Xếp hạng team',
    'RANKED_FLEX_SR': 'Xếp hạng linh hoạt',
    'RANKED_FLEX_TT': 'Xếp hạng 3vs3',
    'RANKED_TFT': 'Đấu trường chân lý'
};

class LOLEmblem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {queue, tier, division, summonerName, classes, verified} = this.props;
        let title;

        if (['CHALLENGER', 'GRANDMASTER', 'MASTER'].indexOf(tier) >-1) {
            title = `${emblems[tier].vn}`
        } else {
            title = `${emblems[tier].vn} ${division}`;
        }

        return (
            <div className={classes.wrapper}>
                <img width='100%' src={emblems[tier].src} alt={title}/>
                <div className={classes.summonerName}>
                    <Typography>{summonerName}</Typography>
                    {
                        verified ?
                            <Tooltip title='Đã xác thực tài khoản chính chủ' placement="top-start"><CheckCircleOutlined htmlColor='#19E627'/></Tooltip>:
                            <Tooltip title='Tài khoản chưa xác thực chính chủ' placement="top-start"><CheckCircleOutlined color='disabled'/></Tooltip>
                    }
                </div>
                <Typography color='textPrimary'>{title}</Typography>
                <Typography color='textPrimary'>({queues[queue]})</Typography>
            </div>
        );
    }
}

LOLEmblem.propTypes = {
    queue: PropTypes.oneOf([
        'RANKED_SOLO_5x5',
        'RANKED_TEAM_5x5',
        'RANKED_FLEX_SR',
        'RANKED_FLEX_TT',
        'RANKED_TFT']),
    tier: PropTypes.oneOf([
        'CHALLENGER',
        'GRANDMASTER',
        'MASTER',
        'DIAMOND',
        'PLATINUM',
        'GOLD',
        'SILVER',
        'BRONZE',
        'IRON'
    ]),
    division: PropTypes.oneOf([
      'I',
      'II',
      'III',
      'IV'
    ]),
    summonerName: PropTypes.string,
    verified: PropTypes.bool
};



export default withStyles(styles)(LOLEmblem);