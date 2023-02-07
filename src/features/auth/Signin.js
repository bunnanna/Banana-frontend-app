import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useGetSkillsQuery } from "../skills/skillsApiSlice";
import { useAddNewUserMutation } from "../users/usersApiSlice";

const Signin = () => {

    const [addNewUser, { isLoading }] = useAddNewUserMutation()
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()
    const [Skills, setSkills] = useState([])
    const {data:skills,isSuccess} = useGetSkillsQuery("skillsList")

    const navigate = useNavigate()

    useEffect(() => {
        setErrMsg("")
    }, [username, password])

    const handleSignin = async (e) => {
        e.preventDefault()
        const data = {username,
            password,
            skills:Skills}
            console.log(data);
        try {
            addNewUser(data)
            setUsername("")
            setPassword("")
            setSkills([""])
            navigate("/login")
        } catch (err) {
            console.log(err);
            if (!err.status) {
                setErrMsg("NO Server Response")
            } else if (err.status === 400) {
                setErrMsg("Missing Username or Password")
            } else if (err.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg(err.data?.message)
            }
            errRef.current.focus()
        }
    }

    const onUsernameChange = e => setUsername(e.target.value)
    const onPasswordChange = e => setPassword(e.target.value)
    const onSkillsChange = e => setSkills(e.map(ele=>ele.value))
    
    const errClass = errMsg ? "onscreen" : "offscreen"

    if (isLoading) return <p>Loading...</p>
    let content
    if(isSuccess) {
        const skillsOption = skills.ids.map(e=>{
            return{value:e,label:skills.entities[e].skillname}
        })
    content = (
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
                    <div>
                        skills
                    </div>
                <Select 
                options={skillsOption}
                isMulti
                onChange={onSkillsChange}
                className="dropdown"
                />
                </div>
                    <div>
                        <button className="login__button" onClick={handleSignin}>Sign in</button>
                    </div>
            </div>
        </div>
    )}
    return content;
}

export default Signin;