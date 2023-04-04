import { useEffect, useRef, useState } from "react";
import { Button, Card, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { dropDownStyle } from "../../hooks/dropDownStyle";
import { useGetSkillsQuery } from "../skills/skillsApiSlice";
import { useAddNewUserMutation } from "./usersApiSlice";

const SignUp = () => {

    const [addNewUser, { isLoading }] = useAddNewUserMutation()
    const errRef = useRef()
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()
    const [errMsg, setErrMsg] = useState()
    const [Skills, setSkills] = useState([])
    const { data: skills, isSuccess } = useGetSkillsQuery()

    const navigate = useNavigate()

    useEffect(() => {
        setErrMsg("")
    }, [username, password])

    const handleSignUp = async (e) => {
        e.preventDefault()
        const data = {
            username,
            password,
            skills: Skills
        }
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
    const onSkillsChange = e => setSkills(e.map(ele => ele.value))

    const errClass = errMsg ? "onscreen" : "offscreen"

    if (isLoading) return <p>Loading...</p>
    let content
    if (isSuccess) {
        const skillsOption = skills.ids.map(e => {
            return { value: e, label: skills.entities[e].skillname }
        })
        content = (
            <Card>
                <Card.Header>Sign up</Card.Header>
                <p ref={errRef} className={errClass} aria-live="assertive">{errMsg}</p>
                <Card.Body as={Form}>
                    <InputGroup className="p-2">
                        <InputGroup.Text htmlFor="username">Username</InputGroup.Text>
                        <Form.Control type="text" onChange={onUsernameChange} />
                    </InputGroup>
                    <InputGroup className="p-2">
                        <InputGroup.Text htmlFor="password">Password</InputGroup.Text>
                        <Form.Control type="password" onChange={onPasswordChange} />
                    </InputGroup>
                    <InputGroup className="p-2">
                        <InputGroup.Text>
                            skills
                        </InputGroup.Text>
                        <Select
                            options={skillsOption}
                            isMulti
                            onChange={onSkillsChange}
                            className="m-0"
                            styles={dropDownStyle(1)}
                        />
                    </InputGroup>
                        <Button onClick={handleSignUp}>Sign up</Button>
                </Card.Body>
            </Card>
        )
    }
    return content;
}

export default SignUp;