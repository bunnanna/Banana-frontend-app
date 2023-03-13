import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, FormGroup, FormLabel, InputGroup, ListGroup, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { dropDownStyle } from "../../hooks/dropDownStyle";
import { useGetProjectsQuery } from "../projects/projectsApiSlice";
import { useGetSkillsQuery } from "../skills/skillsApiSlice";
import { useGetTeamsQuery } from "../teams/teamsApiSlice";
import CheckList from "./CheckList";
import { useAddNewTaskMutation } from "./tasksApiSlice";
import DateTimePicker from 'react-datetime-picker'

const NewTask = () => {

    const [addNewTask,{isLoading,isSuccess,isError,error}] = useAddNewTaskMutation()

    const navigate = useNavigate()

    const [Teams, setTeams] = useState([])

    const [CheckLists, setCheckLists] = useState([{ check: false, subtask: "" }])
    const [Projects, setProjects] = useState([])
    const tasknameRef = useRef()
    const descriptionRef = useRef()
    const [Skills, setSkills] = useState([])
    const [DateLine,setDateLine]=useState(new Date())
    const {data:skills,isSuccess:isSkillSuccess} = useGetSkillsQuery("skillsList")
    const {data:projects,isSuccess:isProjectSuccess} = useGetProjectsQuery("projectsList")
    const {data:teams,isSuccess:isTeamSuccess} = useGetTeamsQuery("teamsList")



    useEffect(()=>{
        if(isSuccess){
            setProjects("")
            tasknameRef.current.value=""
            descriptionRef.current.value=""
            setTeams([""])
            setSkills([""])
            setCheckLists([{ check: false, subtask: "" }])
            setErrmsg("* Field Required")
            navigate("/main/joblist")
        }
    },[isSuccess,navigate])

    // CheckLists Button Handle 
    
    
    useEffect(()=>{
        const onHandleAddCheckLists = () => {
        let newCheckLists = { check: false, subtask: "" }
        setCheckLists([...CheckLists, newCheckLists])
        }

        if(CheckLists.at(-1)["subtask"]){
            onHandleAddCheckLists()
        }
            
        
    },[CheckLists])

    const onHandleChangeCheckLists = (index, event) => {
        let checkLists_data = [...CheckLists]
        checkLists_data[index]["subtask"] = event.target.value
        setCheckLists(checkLists_data)
    }

    const onHandleDeleteCheckLists = (e, index) => {
        e.preventDefault()
        let checkLists_data = [...CheckLists]
        checkLists_data.splice(index, 1)
        if (checkLists_data.length === 0) checkLists_data = [{ check: false, subtask: "" }]
        setCheckLists(checkLists_data)
    }

    const onHandleCheckMark = (e, input, index) => {
        e.preventDefault()
        let checkLists_data = [...CheckLists]
        checkLists_data[index]["check"] = !input.check
        setCheckLists(checkLists_data)
    }

    const [errmsg,setErrmsg] = useState("")

    const onSaveClicked= async (e)=>{
        e.preventDefault()
        const cansave = !!Projects?.trim()&&!!tasknameRef.current.value?.trim()&& !isLoading
        if(cansave){
            const NewTask = {
            project:Projects?.trim(),
            taskname:tasknameRef.current.value?.trim(),
            description:descriptionRef.current.value?.trim(),
            teams:Teams.filter(e=>!!(e?.trim())),
            skills:Skills.filter(e=>!!(e?.trim())),
            checklists:CheckLists.filter(e=>!!(e.subtask?.trim())),
            dateline:DateLine,
            }
            console.log({...NewTask});
            await addNewTask({...NewTask})
        }else{
            setErrmsg("* Field Required")
        }
    }
   
    useEffect(()=>{setErrmsg(error?.data?.message) },[isError,error])
    let content
    if(isProjectSuccess&&isSkillSuccess&&isTeamSuccess){
        const skillsOption = skills.ids.map(e=>{
            return{value:e,label:skills.entities[e].skillname}
        })
        const projectsOption = projects.ids.map(e=>{
            return{value:e,label:projects.entities[e].projectname}
        })
        const teamsOption = teams.ids.map(e=>{
            return{value:e,label:teams.entities[e].teamname}
        })
    content=(<Card>
        <p className={errmsg ? "onscreen" : "offscreen"}>{errmsg}</p>
        <Form>
            <CardHeader>
                <FormGroup as={Row}>
                    <FormLabel column sm={2}>Project* :</FormLabel>
                    <Col sm={10}>
                        <Select
                            options={projectsOption}
                            onChange={e => setProjects(e.value)}
                            className="dropdown"
                            styles={dropDownStyle(1)}
                        />
                    </Col>
                </FormGroup>
            </CardHeader>
            <InputGroup className="p-2">
                <InputGroup.Text>Task* :</InputGroup.Text>
                <Form.Control type="text" ref={tasknameRef} className="w-auto" />
            </InputGroup>

            <InputGroup className="p-2">
                <InputGroup.Text>
                    Descrition :
                </InputGroup.Text>
                <Form.Control as="textarea" rows={3} ref={descriptionRef} />
            </InputGroup>
            <FormGroup className="p-2">
                <Form.Label> Checklists :</Form.Label>
                <ListGroup>
                    {CheckLists.map((input, index) => {
                        return (
                            <CheckList key={index} prop={{input,index,onHandleCheckMark,onHandleChangeCheckLists,onHandleDeleteCheckLists}}/>
                        )})}
                </ListGroup>
            </FormGroup>
            <DateTimePicker
                                value={DateLine}
                                onChange={e=> setDateLine(e)}
                                />  
            <Button variant="primary" className="m-1" onClick={onSaveClicked}>Save</Button>
            <Card.Footer as={Container}>
                <Row md={2}>
                    <FormGroup as={Col} className="d-flex flex-column align-items-center">
                        <Form.Label>Teams</Form.Label>
                        <Select
                            options={teamsOption}
                            isMulti
                            onChange={e => setTeams(e.map(ele => ele.value))}
                            styles={dropDownStyle(1)}
                        />

                    </FormGroup>


                    <FormGroup as={Col} className="d-flex flex-column align-items-center">

                        <Form.Label>required Skills</Form.Label>


                        <Select
                            options={skillsOption}
                            isMulti
                            styles={dropDownStyle(1)}
                            onChange={e => setSkills(e.map(ele => ele.value))}
                        />
                    </FormGroup>




                </Row>
            </Card.Footer>
        </Form>
    </Card>


    );
                }
    return content

}

export default NewTask;