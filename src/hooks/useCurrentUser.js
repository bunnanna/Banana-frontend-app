import jwtDecode from "jwt-decode";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";

const useCurrentUser = () => {
    const token = useSelector(selectCurrentToken)
    if (token){
        const decode = jwtDecode(token)
        const {username, roles,teams,id}=decode.UserInfo
        return{username, roles,teams, id}
    }
    return{username:"", roles:[],teams:[],id:null}
}
 
export default useCurrentUser;