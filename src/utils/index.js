
export const getIdForGenre = val => {
    switch (val.toLowerCase()) {
        case 'action':
            return 1;
        case 'adventure':
            return 2;
        case 'comedy':
            return 4;
        case 'mystery':
            return 7;
        case 'drama':
            return 8;
        case 'ecchi':
            return 9;
        case 'fantasy':
            return 10;
        case 'game':
            return 11;
        case 'hentai':
            return 12;
        case 'hystorical':
            return 13;
        case 'horror':
            return 14;
        case 'magic':
            return 16;
        case 'mecha':
            return 18;
        case 'parody':
            return 20;
        case 'school':
            return 23;
        case 'scifi':
            return 24;
        case 'shounen':
            return 27;
        case 'space':
            return 29;
        case 'sports':
            return 30;
        case 'sport':
            return 30;
        default:
            return 1;
    }
}