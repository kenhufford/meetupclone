import {useEffect} from 'react';

const useFetches = (setLoaded, condition,...args) =>{
    useEffect( () => {
        Promise.all(args.map(arg=>{ 
            if(typeof arg === "function"){
                return arg();
            } else {
                let [foo, param] = arg;
                return foo(param);
            }
        })).then(() => setLoaded(true))
    }, condition)
}

export default useFetches;