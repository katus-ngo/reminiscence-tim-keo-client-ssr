module.exports = [
    {
        name: 'home',
        pathname: '/home',
        as: '/'
    },
    {
        name: 'about',
        pathname: '/about',
        as: '/about'
    },
    {
        name: 'list-team',
        pathname: '/list-team',
        as: '/teams'
    },
    {
        name: 'auth/facebook',
        pathname: '/auth/facebook',
        as: '/auth/facebook'
    },
    {
        name: 'team-profile',
        pathname: '/team-profile',
        as: '/teams/:slug'
    },
    {
        name: 'friendly-id-slug',
        pathname: '/friendly-id-slug',
        as: '/:slug'
    },
    {
        name: 'user-profile',
        pathname: '/user-profile',
        as: '/:slug'
    },

    {
        name: 'tournament-detail',
        pathname: '/tournament-detail',
        as: '/tournaments/:id'
    },
    {
        name: 'notifications',
        pathname: '/notifications',
        as: '/notifications'
    },
    {
        name: 'create-tournament',
        pathname: '/create-tournament',
        as: '/create-tournament'
    },
    {
        name: 'auth-zalo',
        pathname: '/auth/zalo',
        as: '/auth/zalo'
    }
];