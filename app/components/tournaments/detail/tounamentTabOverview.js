import React, {Component} from 'react';
import {
    Grid,
    Typography,
    Divider,
    withStyles
} from "@material-ui/core";

import {injectIntl} from 'react-intl';
import {
    IconTrophy,
    IconVersusGame,
} from "app/components/icon";
import {
    Public
} from "@material-ui/icons"
import PropTypes from "prop-types";
import moment from "moment";
import 'moment/locale/vi';
import LinkM from "@material-ui/core/Link/Link";

const styles = theme => {
    return {
        formatTounaments: {},
        formatTounament: {
            display: 'flex',
            borderLeft: "3px solid" + theme.palette.divider,
            alignItems: 'center',
            paddingLeft: theme.spacing(2),
            [theme.breakpoints.down('xs')]:{
                paddingLeft: 'unset',
                borderLeft: 'unset',
            }
        },
        iconFormat: {
            color: theme.palette.background.light,
        },
        formatContent: {
            marginLeft: theme.spacing(2),
        },
        fontWeightBold:{
            fontWeight: 'bold'
        },
        listContent: {
            '& li': {
                color: theme.palette.text.primary,
                marginBottom: theme.spacing(1)
            }
        },
        divider: {
            marginBottom: theme.spacing(5),
            marginTop: theme.spacing(5),
        },
        description: {
            color: theme.palette.text.primary,
            fontFamily: 'Open Sans'
        }
    }
};

class TounamentTabOverview extends Component {
    render() {
        const {classes, prize, registerDate,competitionDate,description} = this.props;
        const registerStartAt= moment(registerDate.startAt).locale('vi').format("HH:ss dddd DD-MM-YYYY");
        const registerEndAt= moment(registerDate.endAt).locale('vi').format("HH:ss dddd DD-MM-YYYY");
        const competitionStartAt = moment(competitionDate.startAt).locale('vi').format("HH:ss ddd DD-MM-YYYY");
        const prizePool = this.props.intl.formatNumber(prize.prizePool, {maximumFractionDigits: 0});
        return (
            <div>
                <Grid spacing={3} container className={classes.formatTounaments}>
                    <Grid item xs={12} sm={4}>
                        <div className={classes.formatTounament}>
                            <Public className={classes.iconFormat}/>
                            <div className={classes.formatContent}>
                                <Typography component="p" color='textPrimary' variant='body2'>
                                    Game & Khu vực
                                </Typography>
                                <Typography component="p" color='textSecondary' variant='body1'>
                                    LOL, Toàn quốc
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <div className={classes.formatTounament}>
                            <IconTrophy className={classes.iconFormat}/>
                            <div className={classes.formatContent}>
                                <Typography component="p" color='textPrimary' variant='body2'>
                                    Giải thưởng
                                </Typography>
                                <Typography component="p" color='textSecondary' variant='body1'>
                                    {prizePool} VNĐ
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={6} sm={4}>
                        <div className={classes.formatTounament}>
                            <IconVersusGame className={classes.iconFormat}/>
                            <div className={classes.formatContent}>
                                <Typography component="p" color='textPrimary' variant='body2'>
                                    Thể thức
                                </Typography>
                                <Typography component="p" color='textSecondary' variant='body1'>
                                    5v5, BO1-BO5
                                </Typography>
                            </div>
                        </div>
                    </Grid>
                </Grid>
                <Divider className={classes.divider}/>
                <div className={classes.description} dangerouslySetInnerHTML={{__html: description}}></div>
                {/*<div>*/}
                {/*    <Typography component="h6" color='textSecondary' variant='h6' className={classes.fontWeightBold}>*/}
                {/*        Thời gian*/}
                {/*    </Typography>*/}
                {/*    <ul className={classes.listContent}>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Thời gian đăng ký: từ <span*/}
                {/*                style={{fontWeight: 900, color: '#e64a19'}}>{registerStartAt}</span> đến*/}
                {/*                <span style={{*/}
                {/*                    fontWeight: 900,*/}
                {/*                    color: '#e64a19'*/}
                {/*                }}>{registerEndAt}</span>*/}
                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Thời gian bắt đầu thi đấu: từ <span*/}
                {/*                style={{fontWeight: 900, color: '#e64a19'}}>{competitionStartAt}</span>*/}
                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {/*<Divider className={classes.divider}/>*/}
                {/*<div>*/}
                {/*    <Typography component="h6" color='textSecondary' variant='h6' className={classes.fontWeightBold}>*/}
                {/*        Điều kiện tham dự*/}
                {/*    </Typography>*/}
                {/*    <ul className={classes.listContent}>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Tham gia group facebook:*/}
                {/*                <LinkM href={'https://www.facebook.com/groups/TimKeoVN.Official/'}*/}
                {/*                       color="inherit">*/}
                {/*                    <span*/}
                {/*                        style={{fontWeight: 900, color: '#e64a19'}}> TimKeoVn</span>*/}
                {/*                </LinkM>*/}

                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Đăng ký vào tạo đội trên hệ thống Website:*/}
                {/*                <LinkM href={'https://www.facebook.com/groups/TimKeoVN.Official/'}*/}
                {/*                       color="inherit">*/}
                {/*                    <span*/}
                {/*                        style={{fontWeight: 900, color: '#e64a19'}}> Timkeo.com</span>*/}
                {/*                </LinkM>*/}

                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*    </ul>*/}
                {/*</div>*/}
                {/*<Divider className={classes.divider}/>*/}
                {/*<div>*/}
                {/*    <Typography component="h6" color='textSecondary' variant='h6' className={classes.fontWeightBold}>*/}
                {/*        Luật thi đấu*/}
                {/*    </Typography>*/}
                {/*    <ul className={classes.listContent}>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Không đầu hàng*/}
                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Muộn 10 phút sẽ bị xử thua*/}
                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Không sử dụng phần mềm thứ 3*/}
                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*        <li>*/}
                {/*            <Typography component="p" color='textPrimary'>*/}
                {/*                Tham gia đúng theo tên ingame đã đăng kí*/}
                {/*            </Typography>*/}
                {/*        </li>*/}
                {/*        <Typography noWrap>*/}
                {/*            <LinkM href={'/'} color="inherit">*/}
                {/*                <Typography component="span" color='textPrimary'>*/}
                {/*                    Xem thêm ...*/}
                {/*                </Typography></LinkM>*/}
                {/*        </Typography>*/}
                {/*    </ul>*/}
                {/*</div>*/}
            </div>
        )
    }
}

TounamentTabOverview.propTypes = {
    prize: PropTypes.object,
    registerDate: PropTypes.object,
    competitionDate: PropTypes.object,
    description: PropTypes.string,
};
export default withStyles(styles)(injectIntl(TounamentTabOverview));