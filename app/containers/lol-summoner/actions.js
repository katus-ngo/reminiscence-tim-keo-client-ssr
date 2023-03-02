export const INVALIDATE_LOL_SUMMONER_REQUEST = 'app/containers/lol-summoner/INVALIDATE_LOL_SUMMONER_REQUEST';
export const INVALIDATE_LOL_SUMMONER_RESPONSE = 'app/containers/lol-summoner/INVALIDATE_LOL_SUMMONER_RESPONSE';
export const INVALIDATE_LOL_SUMMONER_ERROR = 'app/containers/lol-summoner/INVALIDATE_LOL_SUMMONER_ERROR';

export const MAKE_CHALLENGE_LOL_REQUEST = 'app/containers/lol-summoner/MAKE_CHALLENGE_LOL_REQUEST';
export const MAKE_CHALLENGE_LOL_RESPONSE = 'app/containers/lol-summoner/MAKE_CHALLENGE_LOL_RESPONSE';
export const MAKE_CHALLENGE_LOL_ERROR = 'app/containers/lol-summoner/MAKE_CHALLENGE_LOL_ERROR';

export const VERIFY_CHALLENGE_LOL_SUMMONER_REQUEST = 'app/containers/lol-summoner/VERIFY_CHALLENGE_LOL_SUMMONER_REQUEST';
export const VERIFY_CHALLENGE_LOL_SUMMONER_RESPONSE = 'app/containers/lol-summoner/VERIFY_CHALLENGE_LOL_SUMMONER_RESPONSE';
export const VERIFY_CHALLENGE_LOL_SUMMONER_ERROR = 'app/containers/lol-summoner/VERIFY_CHALLENGE_LOL_SUMMONER_ERROR';

export const OPEN_DIALOG_ADD_SUMMONER = 'app/containers/lol-summoner/actions/OPEN_DIALOG_ADD_SUMMONER';
export const CLOSE_DIALOG_ADD_SUMMONER = 'app/containers/lol-summoner/actions/CLOSE_DIALOG_ADD_SUMMONER';

export const OPEN_DIALOG_CONFIRM_REMOVE_SUMMONER = 'app/containers/lol-summoner/actions/OPEN_DIALOG_CONFIRM_REMOVE_SUMMONER';
export const CLOSE_DIALOG_CONFIRM_REMOVE_SUMMONER = 'app/containers/lol-summoner/actions/CLOSE_DIALOG_CONFIRM_REMOVE_SUMMONER';

export const CHANGE_SUMMONER = 'app/containers/lol-summoner/CHANGE_SUMMONER';

export const REMOVE_SUMMONER_REQUEST = 'app/containers/lol-summoner/REMOVE_SUMMONER_REQUESR';
export const REMOVE_SUMMONER_RESPONSE = 'app/containers/lol-summoner/REMOVE_SUMMONER_RESPONSE';
export const REMOVE_SUMMONER_ERROR = 'app/containers/lol-summoner/REMOVE_SUMMONER_ERROR';

export const CHANGE_VERIFY = 'app/containers/lol-summoner/CHANGE_VERIFY';

export const BACK_STEP = 'app/containers/lol-summoner/BACK_STEP';

export const invalidateLOLSummoner = () => ({type: INVALIDATE_LOL_SUMMONER_REQUEST});

export const makeChallengeLOLSummoner = (summonerName) => ({
    type: MAKE_CHALLENGE_LOL_REQUEST,
    summonerName
});

export const changeSummoner = (summonerName) => ({
    type: CHANGE_SUMMONER,
    summonerName
});

export const changeVerify = () => ({
    type: CHANGE_VERIFY
});

export const backStep = () => ({
    type: BACK_STEP
});

export const verifyChallengeLOLSummoner = (challengeToken, verifyLater = false) => ({
    type: VERIFY_CHALLENGE_LOL_SUMMONER_REQUEST,
    challengeToken,
    verifyLater
});

export const openDialogAddSummoner = () => ({
    type: OPEN_DIALOG_ADD_SUMMONER,
});

export const closeDialogAddSummoner = () => ({
    type: CLOSE_DIALOG_ADD_SUMMONER,
});

export const openDialogConfirmRemoveSummoner = () => ({
    type: OPEN_DIALOG_CONFIRM_REMOVE_SUMMONER,
});

export const closeDialogConfirmRemoveSummoner = () => ({
    type: CLOSE_DIALOG_CONFIRM_REMOVE_SUMMONER,
});

export const removeLOLSummoner = (lolSummonerId) => ({
    type: REMOVE_SUMMONER_REQUEST,
    lolSummonerId,
});