import {createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#e64a19',
            // light:'#a13311',
            // dark:'#e64a19',
            contrastText: '#ebeef2',
            // background: '#111217',
            // backgroundInput: '#16161c',
            // backgroundVariant: '#1b1d23',
            // backgroundHeader: '#0f131f',
            // backgroundCard: '#21232b',
            // backgroundTitle: '#27282e',
            // backGroundPopup: '#27282e',
            // avatarNull: '#3b3d44',
            // backgroundCardNotUse: '#5d6170',
            // main: '#e64a19',
            hover: '#a13311',
            // second: '#00af00',
            // secondHover: '#007a00',
            // messageError: '#c43855',
            // textPopup: '#ebeef2',
        },
        secondary: {
            main: '#00af00',
            contrastText: '#ebeef2'

        },
        tournamentStatus:{
            registering: '#00af00',
            waiting: '#10baa8',
            playing: '#bc952c',
            ended: '#c43855',
            trash: '#acacac',
        },
        error: {
            main: '#c43855',
            // light:'#c43855',
            // dark:'#c43855',

        },
        text: {
            primary: '#a4a4a4',
            secondary: '#ebeef2'

        },
        background: {
            // main: '#111217',
            light: '#ebeef2',
            dark: '#111217'
        },
        surface: {
            dark: '#1b1d23'
        },
        input: {
            background: '#16161c'
        },
        achievements: {
            first: '#bc952c',
            second: '#acacac',
            third: '#8c612d'
        },
        links: {
            common: '#5A5A5A'
        },
        type: 'dark',
        divider: '#21232b',

    },
    typography: {
        fontFamily: [
            'Open Sans'
        ].join(','),
        body1: {
            fontSize: 14,
        },
        body2: {
            fontSize: 12,
        }
    },
    overrides: {
        MuiPickersDay: {
            dayDisabled: {
                color: '#ffffff1f',
            },
        },
    }
});

export default theme;
