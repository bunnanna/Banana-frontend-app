import { useEffect, useRef, useState } from "react";
import { Button, Card, Form } from "react-bootstrap";
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
    const handleSignup = e =>navigate("/signup")

    const onUsernameChange = e => setUsername(e.target.value)
    const onPasswordChange = e => setPassword(e.target.value)
    const errClass=errMsg?"onscreen":"offscreen"

    if(isLoading)return <p>Loading...</p>
    return (
        <Card>
            <Card.Header>Login</Card.Header>
            <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
            <Card.Body >
                <Form.Group>
                    <Form.Label htmlFor="username">Username</Form.Label>
                    <Form.Control type="text"  name="username" ref={userRef} value={username} onChange={onUsernameChange} />

                    <Form.Label htmlFor="password">Password</Form.Label>
                    <Form.Control type="password"  name="password" value={password} onChange={onPasswordChange} />
                </Form.Group>
                <Form.Group>
                    <Button onClick={handleLogin} className="m-2">Login</Button>
                    <Button onClick={handleSignup} className="m-2">Sign up</Button>
                </Form.Group>

            </Card.Body>

        </Card>
    );
}

export default Login;