import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddNewUserMutation } from "../features/users/usersApiSlice";

const Signin = () => {

    const [addNewUser, { isLoading }] = useAddNewUserMutation()
    const userRef = useRef()
    const errRef = useRef()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errMsg, setErrMsg] = useState("")
    const [Teams, setTeams] = useState([""])
    const [Skills, setSkills] = useState([""])

    const navigate = useNavigate()

    // Teams Button Handle 
    const onHandleAddTeams = (e) => {
        e.preventDefault();
        let newTeams = ""
        setTeams([...Teams, newTeams])
    }
    const onHandleChangeTeams = (index, value) => {
        let teams_data = [...Teams]
        teams_data[index] = value
        setTeams(teams_data)
    }

    const onHandleDeleteTeams = (e, index) => {
        e.preventDefault()
        let teams_data = [...Teams]
        teams_data.splice(index, 1)
        if (teams_data?.length === 0) teams_data = [""]
        setTeams(teams_data)
    }

    // Skills Button Handle 
    const onHandleAddSkills = (e) => {
        e.preventDefault();
        let newSkills = ""
        setSkills([...Skills, newSkills])
    }
    const onHandleChangeSkills = (index, value) => {
        let skills_data = [...Skills]
        skills_data[index] = value
        setSkills(skills_data)
    }

    const onHandleDeleteSkills = (e, index) => {
        e.preventDefault()
        let skills_data = [...Skills]
        skills_data.splice(index, 1)
        if (skills_data.length === 0) skills_data = [""]
        setSkills(skills_data)
    }

    useEffect(() => {
        userRef.current.focus()
    }, [])

    useEffect(() => {
        setErrMsg("")
    }, [username, password])

    const handleSignin = async (e) => {
        e.preventDefault()
        const data = {username,
            password,
            teams:Teams,
            skills:Skills}
            console.log(data);
        try {
            addNewUser(data)
            setUsername("")
            setPassword("")
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
    const errClass = errMsg ? "onscreen" : "offscreen"

    if (isLoading) return <p>Loading...</p>
    let content
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
                    <div className="task__teams">
                        <div>
                            <span>Teams <button onClick={e => onHandleAddTeams(e)} className="Add__button">Add</button></span>
                        </div>
                        <div className="teams__element">
                            {Teams.map((input, index) => {
                                return (
                                    <div key={index} className="teams__input">
                                        <input
                                            type="text"
                                            name="Teams"
                                            placeholder="Input Teams"
                                            value={input}
                                            onChange={event => onHandleChangeTeams(index, event.target.value)}
                                        />
                                        <button onClick={e => onHandleDeleteTeams(e, index)}>X</button>
                                    </div>)
                            })}

                        </div>
                    </div>

                    <div className="task__skills">
                        <div>
                            <span>Skill <button onClick={e => onHandleAddSkills(e)} className="Add__button">Add</button></span>
                        </div>

                        <div className="skills__element">
                            {Skills.map((input, index) => {
                                return (
                                    <div key={index} className="skills__input">
                                        <input
                                            type="text"
                                            name="Skills"
                                            placeholder="Input Skills"
                                            value={input}
                                            onChange={event => onHandleChangeSkills(index, event.target.value)}
                                        />
                                        <button onClick={e => onHandleDeleteSkills(e, index)}>X</button>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div>
                        <button className="login__button" onClick={handleSignin}>Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    )
    return content;
}

export default Signin;