import {useEffect} from 'react';

const useFetches = (setLoaded, condition,...args) =>{
    const setters = [];
    useEffect( () => {
        Promise.all(args.map((arg, i)=>{ 
            if(typeof arg === "function"){
                return arg();
            } else {
                let [foo, param, ...settersArgs] = arg;
                settersArgs.forEach(setterArg => setters.push([setterArg,i]))
                return foo(param);
            }
        })).then((data) => {
            setters.forEach(setterArr => {
                let [setter, index] = setterArr;
                if (setter.key2) setter.foo(data[index][`${setter.key}`][`${setter.key2}`]);
                else setter.foo(data[i][`${setter.key}`]);
            });
            setLoaded(true);
        })
    }, condition)
}

export default useFetches;