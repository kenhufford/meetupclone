import {useEffect} from 'react';

// useFetches(setLoaded, 
//      [], 
//      fetchLocations, 
//      fetchCategories);

// useFetches(setLoaded,
//     [allPage, allLimit, userPage, userLimit],
//     [fetchGroups,
//         { allPage, allLimit, userPage, userLimit },
//         { foo: setMaxAllGroups, key: "groups", key2: "allGroupsCount" },
//         { foo: setMaxUserGroups, key: "groups", key2: "userGroupsCount" }]);

// useFetches(setLoaded,
//     [selectedLocationId, allPage, allLimit],
//     fetchLocations,
//     [fetchGroups,
//         { allPage, allLimit, userPage: 1, userLimit: 0, location_id: selectedLocationId },
//         { foo: setMaxGroups, key: "groups", key2: "allGroupsCount" }]);


//Issue #1: Components from rendering before fetches retrieve info successfully
//Issue #2: Repetitive code for Promise.all with fetches
//Issue #3: Setter callbacks for implementing pagination


const useFetches = (setLoaded, condition, ...fetchArgs) =>{
    const setters = [];
    useEffect(()=>{  
        Promise.all(fetchArgs.map((fetchArg, i)=>{ 
            if (typeof fetchArg === "function") return fetchArg();
            else {
                const [foo, param, ...settersArgs] = fetchArg;
                settersArgs.forEach(setterArg => setters.push([setterArg,i]));
                return foo(param);
            }
        })).then((data) => {
            setters.forEach(setterArr => {
                const [setter, index] = setterArr;
                if (setter.key2) setter.foo(data[index][`${setter.key}`][`${setter.key2}`]);
                else setter.foo(data[i][`${setter.key}`]);
            });
            setLoaded(true);
        })
    }, condition)
}

export default useFetches;