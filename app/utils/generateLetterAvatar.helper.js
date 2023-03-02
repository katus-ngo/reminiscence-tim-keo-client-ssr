export const generateLetterAvatar = (text) => {
    text = text || '';
    
    let words, acronym, nextWord;

    words = text.split(' ');
    acronym = "";
    let index = 0;
    while (index < words.length) {
        nextWord = words[index];
        acronym = acronym + nextWord.charAt(0);
        index = index + 1;
    }
    acronym = acronym.length > 1 ? acronym[0]+acronym.substr(-1) : acronym;
    acronym = acronym.toLocaleUpperCase();
    return acronym
};