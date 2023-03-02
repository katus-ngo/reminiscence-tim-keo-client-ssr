export const generateUpdateTeamRequestFromTeamProfile = (teamProfile, rest) => {
    return Object.assign({},{
        id: teamProfile.id,
        shortName: teamProfile.teamMetaInfo.shortName,
        longName: teamProfile.teamMetaInfo.longName,
        slug: teamProfile.slug,
        game: teamProfile.game,
        description: teamProfile.teamMetaInfo.description,
        slogan: teamProfile.teamMetaInfo.slogan,
        avatarId: teamProfile.teamMetaInfo.avatarId,
        coverId: teamProfile.teamMetaInfo.coverId,
        contactInfo: teamProfile.teamMetaInfo.contactInfo
    }, rest);
};