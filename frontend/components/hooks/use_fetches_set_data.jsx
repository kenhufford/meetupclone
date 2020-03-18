import {useEffect} from 'react';

function useFetchesSetData(setLoaded, setter, fetch, type, fetchArg){
    useEffect( () => {
        let fetchFunc = fetch(fetchArg);
        Promise.all([fetchFunc])
            .then((data) =>{ 
                setter(Object.values(data[0][`${type}`]));
                setLoaded(true);
            })
    }, [])
}

export default useFetchesSetData;