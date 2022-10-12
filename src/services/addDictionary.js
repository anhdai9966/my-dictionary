import { ref, set } from 'firebase/database';
import { database } from '~/utils/firebase';
import { v4 } from 'uuid';

async function addDictionary(dictionary) {
    try {
        const {
            word,
            partOfSpeech,
            translation,
            addTranslations,
            examples,
            translationExamples,
        } = dictionary;
    
        const wordData = {
            id: v4(),
            word: word,
            partOfSpeech: partOfSpeech,
            translation: translation,
            addTranslations: addTranslations || [],
            examples: examples || [],
            translationExamples: translationExamples || [],
            createdAt: new Date().getTime(),
            // updatedAt: '',
        };
    
        await set(ref(database, 'dictionary/' + wordData.id), wordData);
    
        return wordData;
    } catch (error) {
        throw error
    }
}

export default addDictionary;
