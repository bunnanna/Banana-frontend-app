import { useRef } from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery } from "../features/users/usersApiSlice";

const Login = () => {
    const usernameRef = useRef()
    const passwordRef = useRef()

    const onLogin = e =>{
        e.preventDefault()
        

    }

    return ( 
        <div><h1>Login</h1> 
        <Link to="/main"><h2> Complete!!!?</h2></Link>
        <div className="login__layout">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" value={usernameRef.current}/>

            <label htmlFor="password">Password</label>
            <input type="text" name="password" value={passwordRef.current}/>
        </div>
        <button ></button>
        </div>
     );
}
 
export default Login;