import {useEffect, useState} from 'react';

function useFetch(fetcher, params) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reloadCount, setReloadCount] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function loadData() {
            setLoading(true);
            setError('');
            setData(null);

            try {
                const result = await fetcher(params, controller.signal);
                if (!controller.signal.aborted) {
                    setData(result);
                }
            } catch (requestError) {
                if (requestError.name !== 'AbortError') {
                    setError(requestError.message || 'Не вдалося завантажити дані.');
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadData();
        return () => controller.abort();
    }, [fetcher, params, reloadCount]);

    function retry() {
        setReloadCount((count) => count + 1);
    }

    return {data, loading, error, retry};
}

export default useFetch;
