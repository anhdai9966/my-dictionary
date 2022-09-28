import { API_URL } from '~/configs';
import { AJAX } from '~/utils';

const loadDictionary = async (url) => {
    try {
        const data = await AJAX(`${API_URL}?${url}`);

        return data;
    } catch (error) {
        throw error;
    }
};

export default loadDictionary;
