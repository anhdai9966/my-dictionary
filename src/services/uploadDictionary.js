import { AJAX, capitalizeFirstLetter, addDash } from '~/utils'
import { API_URL } from '~/configs';

const uploadDictionary = async function (newWord) {
    try {
        const addTranslation = Object.entries(newWord)
            .filter((entry) => entry[0].startsWith('addTranslation'))
            .map(
                (addTrans) =>
                    addDash(addTrans[1]) + capitalizeFirstLetter(addTrans[1])
            )
            .join('@enter');

        const example = Object.entries(newWord)
            .filter(
                (entry) =>
                    entry[0].startsWith('example') ||
                    entry[0].startsWith('translationExample')
            )
            .reduce((prevEx, curEx, index, array) => {
                if (index % 2 === 0) {
                    curEx[1] =
                        addDash(curEx[1]) +
                        capitalizeFirstLetter(curEx[1]) +
                        ': @split';
                } else {
                    array.length - 1 === index
                        ? (curEx[1] = capitalizeFirstLetter(curEx[1]))
                        : (curEx[1] =
                              capitalizeFirstLetter(curEx[1]) + '@enter');
                }
                return prevEx + curEx[1];
            }, '');

        const word = {
            word: capitalizeFirstLetter(newWord.word),
            partOfSpeech: newWord.partOfSpeech,
            translation: capitalizeFirstLetter(newWord.translation),
            addTranslation: addTranslation,
            example: example,
        };

        const data = await AJAX(API_URL, word);

        return data;
    } catch (err) {
        throw err;
    }
};

export default uploadDictionary

// dictionary : true
// message: "Thêm dữ liệu thành công."
// post: true
// status: "success"
// word:
// addTranslation:
// createdAt:
// example:
// id: "4l89f9f2f"
// partOfSpeech: "Idiom"
// translation: "Khẩn trương lên"
// updatedAt: ""
// word: "Shake a leg"
