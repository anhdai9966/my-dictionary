import { PART_OF_SPEECH } from '~/configs';

export function randomNumber(arr = []) {
    const id = arr.length + new Date().getTime().toString(36);
    return id;
}

export function windowHeight() {
    const doc = document.documentElement;
    doc.style.setProperty('--window-height', `${window.innerHeight}px`);
}

export function capitalizeFirstLetter(string) {
    return string.trim().charAt(0).toUpperCase() + string.trim().slice(1);
}

export const convertPartofSpeech = function (eng) {
    const findPOS = PART_OF_SPEECH.find((pos) =>
        pos.eng.toLowerCase().includes(eng.toLowerCase())
    );

    if (!findPOS) return eng;

    return findPOS.vie;
};

export function isEmpty(object) {
    for (let property in object) {
        return false;
    }
    return true;
}

export function addDash(str) {
    if (str.trimStart().charAt(0) === '-') return '';

    return '- ';
}
