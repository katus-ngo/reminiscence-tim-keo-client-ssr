
const GET_USER_PROFILE_REQUEST = 'app/containers/userProfile/actions/GET_USER_PROFILE_REQUEST';
const GET_USER_PROFILE_SUCCESS = 'app/containers/userProfile/actions/GET_USER_PROFILE_SUCCESS';
const GET_USER_PROFILE_ERROR = 'app/containers/userProfile/actions/GET_USER_PROFILE_ERROR';

const OPEN_DIALOG_MEMBER_INVITATION = 'app/containers/userProfile/actions/OPEN_DIALOG_MEMBER_INVITATION';
const CLOSE_DIALOG_MEMBER_INVITATION = 'app/containers/userProfile/actions/CLOSE_DIALOG_MEMBER_INVITATION';

const MEMBER_INVITATION_REQUEST = 'app/containers/userProfile/actions/MEMBER_INVITATION_REQUEST';
const MEMBER_INVITATION_SUCCESS = 'app/containers/userProfile/actions/MEMBER_INVITATION_SUCCESS';

const CHANGE_TAB_INDEX = 'app/containers/userProfile/actions/CHANGE_TAB_INDEX';



export {
    GET_USER_PROFILE_ERROR,
    GET_USER_PROFILE_REQUEST,
    GET_USER_PROFILE_SUCCESS,

    OPEN_DIALOG_MEMBER_INVITATION,
    CLOSE_DIALOG_MEMBER_INVITATION,

    MEMBER_INVITATION_REQUEST,
    MEMBER_INVITATION_SUCCESS,
    CHANGE_TAB_INDEX
}


export const getUserProfile  = (slug, tabName) => ({
    type: GET_USER_PROFILE_REQUEST,
    slug,
    tabName
});

export const openDialogMemberInvitation = (open) => ({
    type: OPEN_DIALOG_MEMBER_INVITATION,
    open
});

export const closeDialogMemberInvitation = (open) => ({
    type: OPEN_DIALOG_MEMBER_INVITATION,
    open
});

export const memberInvitation = (teamId, receiverId) => ({
    type: MEMBER_INVITATION_REQUEST,
    teamId,
    receiverId
});
export const changeTab = (tabName) => ({
    type: CHANGE_TAB_INDEX,
    tabName,
});