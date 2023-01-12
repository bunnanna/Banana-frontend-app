import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { store } from "../../app/stores";
import { tasksApiSlice } from "../tasks/tasksApiSlice";

const Prefetch = () => {
    useEffect(()=>{
        store.dispatch(tasksApiSlice.util.prefetch("getTasks","tasksList",{force:true}))
    },[])
    return <Outlet/>
}
 
export default Prefetch;