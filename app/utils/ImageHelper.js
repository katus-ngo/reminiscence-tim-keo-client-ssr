import config from 'app/config'

export const generateImageUrl = (imagePath, defaultImageUrl = '') => {
    return imagePath ? config.DATA_URL + "/" + imagePath: defaultImageUrl;
};

export const generateCoverUrl = (cover) => {
    cover = cover || {original: ''};

    return generateImageUrl(cover.original, '/static/images/team/cover-default.jpg');
};