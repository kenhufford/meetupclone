import {useEffect} from 'react';

function useFetches(setLoaded,...args){
    useEffect( () => {
        console.log(args)
        Promise.all(args.map(arg=>{ 
            if(typeof arg === "function"){
                return arg();
            } else {
                let [foo, param] = arg;
                return foo(param);
            }
        }))
            .then(() => setLoaded(true))
    }, [])
}

export default useFetches;