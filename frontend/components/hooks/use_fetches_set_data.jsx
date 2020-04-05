import {useEffect} from 'react';

const useFetchesSetData = (setLoaded, condition, setter, fetch, type, fetchArg) =>{
    useEffect( () => {
        let fetchFunc = fetch(fetchArg);
        Promise.all([fetchFunc])
            .then((data) =>{ 
                setter(Object.values(data[0][`${type}`]));
                setLoaded(true);
            })
    }, condition)
}

export default useFetchesSetData;