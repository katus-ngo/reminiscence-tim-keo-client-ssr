import React from 'react';
import {Container, Typography, withStyles} from "@material-ui/core";

const styles = theme => {
    return {
        countElement: {
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            '& div': {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }
        },
        countNumber: {
            fontSize: '30px',
            color: 'white',
            marginBottom:'20px'
        },
        countName: {
            fontSize: '20px',
            color: '#a4a4a4'
        }
    }
};

class CountDataComponent extends React.Component {
    render() {
        const {classes} = this.props;
        return (
            <section style={{marginTop: '50px'}}>
                <Container fixed className={classes.countElement}>
                    <div>
                        <Typography noWrap className={classes.countNumber}>
                            333
                        </Typography>
                        <Typography noWrap className={classes.countName}>
                            Team thành lập
                        </Typography>
                    </div>
                    <div>
                        <Typography noWrap className={classes.countNumber}>
                            333
                        </Typography>
                        <Typography noWrap className={classes.countName}>
                            Thành viên
                        </Typography>
                    </div>
                    <div>
                        <Typography noWrap className={classes.countNumber}>
                            333
                        </Typography>
                        <Typography noWrap className={classes.countName}>
                            Kèo đang chờ
                        </Typography>
                    </div>
                    <div>
                        <Typography noWrap className={classes.countNumber}>
                            333
                        </Typography>
                        <Typography noWrap className={classes.countName}>
                            Kèo đã xong
                        </Typography>
                    </div>
                </Container>
            </section>
        )
    }
}

export default withStyles(styles)(CountDataComponent)
