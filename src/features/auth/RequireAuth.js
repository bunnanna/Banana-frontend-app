import { Navigate, Outlet, useLocation } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";

const RequireAuth = ({allowedRoles}) => {
    const location = useLocation()
    const {roles} = useCurrentUser()
    const content =(
        roles.some(role=>allowedRoles.includes(role))|| (allowedRoles.some(role=>role==="Employee")&&roles?.length)
        ? <Outlet/>
        :<Navigate to="/login" state={{from:location}} replace/>
    )
    return content
}
 
export default RequireAuth;