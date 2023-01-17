import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const useCurrentUser = () => {
    const token = useSelector(selectCurrentToken)
    if (token){
        const decode = jwtDecode(token)
        const {username, roles,teams}=decode.UserInfo

        return{username, roles,teams}
    }
    return{username:"", roles:[],teams:[]}
}
 
export default useCurrentUser;