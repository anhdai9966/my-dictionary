import { database } from '~/utils/firebase';
import { child, get, ref } from 'firebase/database';

async function getIdDictionary(wordId) {
    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, 'dictionary/' + wordId));
        
        if (!snapshot.exists()) throw new Error('No data available');

        const word = await snapshot.val();
        
        return word;
    } catch (error) {
        console.log(error);
    }
}

export default getIdDictionary;
