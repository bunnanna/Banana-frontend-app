import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useCurrentUser from "../hooks/useCurrentUser";

const Header = () => {
    const {username}=useCurrentUser()
    const navigate = useNavigate()
    const [sendLogout, {
        isSuccess,
    }] = useSendLogoutMutation()
    
    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    return ( 
        <header className="header__content">
            <div className="page__header">
                <Link to="/main"><span>Banana Job Card Apuri</span></Link> 
        <nav>
            <span><Link to="/user">{username}</Link></span>
            <button onClick={sendLogout}>Log Out</button>
            <button >1234</button>
        </nav> 
        
            </div>
        </header>   
     );
}
 
export default Header;