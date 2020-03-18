import {useEffect} from 'react';

function useFetches(setLoaded,...args){
    useEffect( () => {
        console.log(args)
        Promise.all(args.map(arg=> arg()))
            .then(() => setLoaded(true))
    }, [])
}

export default useFetches;