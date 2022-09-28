import { useContext } from 'react';
import Context from './context';

const useStore = function () {
    const { state, dispatch } = useContext(Context);

    return { state, dispatch };
};

export { useStore };
