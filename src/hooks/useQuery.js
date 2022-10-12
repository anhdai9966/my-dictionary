import { async } from "@firebase/util";
import { endAt, get, orderByChild, query, ref, startAt } from "firebase/database";
import { useCallback } from "react";
import { useState } from "react";
import { database } from "~/utils";

function UseQuery() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const sendRequest = useCallback(async (requestConfig, applySnapshot) => {
        setIsLoading(true);
        setError(null);

        try {
            const queryConfig = query(
                ref(database, requestConfig.path),
                orderByChild(requestConfig.order),
                startAt(requestConfig.queryText),
                endAt(requestConfig.queryText + '\uf8ff')
            );
            const snapshot = await get(queryConfig)

            applySnapshot(Object.values(snapshot.val()))
        } catch (error) {
            setError(error)
        }
        setIsLoading(false);
    }, [])

    return {
        isLoading,
        error,
        sendRequest
    }
}

export default UseQuery