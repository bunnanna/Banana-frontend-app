import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/stores";
import { skillsApiSlice } from "../skills/skillsApiSlice";
import { rolesApiSlice } from "../roles/rolesApiSlice";

const PrefetchA = () => {
    useEffect(()=>{
        store.dispatch(rolesApiSlice.util.prefetch("getRoles","rolesList",{force:true}))
        store.dispatch(skillsApiSlice.util.prefetch("getSkills","skillsList",{force:true}))
    },[])
    return <Outlet/>
}
 
export default PrefetchA;