import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../features/auth/authApiSlice";
import { setCredentials } from "../features/auth/authSlice";


const Login = () => {
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login,{isLoading}] = useLoginMutation()

    useEffect(()=>{
        userRef.current.focus()
    },[])

    useEffect(()=>{
        setErrMsg("")
    },[username,password])

    const handleLogin = async(e)=>{
        e.preventDefault()
        try {
            const {accessToken} = await login({username,password}).unwrap()
            dispatch(setCredentials({accessToken}))
            setUsername("")
            setPassword("")
            navigate("/main")
        } catch (err) {
            console.log(err);
            if(!err.status){
                setErrMsg("NO Server Response")
            }else if(err.status === 400){
                setErrMsg("Missing Username or Password")
            }else if(err.status === 401){
                setErrMsg("Unauthorized")
            }else{
                setErrMsg(err.data?.message)
            }
            errRef.current.focus()
        }
    }
    const handleSignin = e =>navigate("/signin")

    const onUsernameChange = e => setUsername(e.target.value)
    const onPasswordChange = e => setPassword(e.target.value)
    const errClass=errMsg?"onscreen":"offscreen"

    if(isLoading)return <p>Loading...</p>
    return (
        <div>
            <h1>Login</h1>
            <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
            <div className="login__layout">
                <div className="login__form">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="login__input" name="username" ref={userRef} value={username} onChange={onUsernameChange} />

                    <label htmlFor="password">Password</label>
                    <input type="password" className="login__input" name="password" value={password} onChange={onPasswordChange} />
                </div>
                <div>
                    <button onClick={handleLogin} className="login__button">Login</button>
                    <button onClick={handleSignin} className="login__button">Sign in</button>
                </div>

            </div>

        </div>
    );
}

export default Login;