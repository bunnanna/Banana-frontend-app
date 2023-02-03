import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "./tasksApiSlice";
import Select from "react-select"
import { useGetSkillsQuery } from "../skills/skillsApiSlice";
import { useGetProjectsQuery } from "../projects/projectsApiSlice";
import { useGetTeamsQuery } from "../teams/teamsApiSlice";
import { Button, Card, Col, Container, Form, FormGroup, FormLabel, InputGroup, ListGroup, Row } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { dropDownStyle } from "../../hooks/dropDownStyle";
import CheckList from "./CheckList";
import useDebounce from "../../hooks/useDebounce";
import DateTimePicker from 'react-datetime-picker'


const EditTaskForm = ({ task }) => {

    const { id: userid } = useCurrentUser()

    const [updateTask, { isLoading, isSuccess, isError, error }] = useUpdateTaskMutation()
    const [deleteTask, { isLoading: isDelLoading, isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteTaskMutation()
    const { id, project, taskname, teams, skills, description, checklists, complete, dateline } = task

    const navigate = useNavigate()

    const [CheckLists, setCheckLists] = useState(checklists)
    const [Projects, setProjects] = useState(project._id)
    const tasknameRef = useRef(taskname)
    const descriptionRef = useRef(description)
    const [Skills, setSkills] = useState(skills.map(e => e._id))
    const [Teams, setTeams] = useState(teams.map(e => e._id))
    const [DateLine,setDateLine]=useState(new Date(dateline))
    const { data: all_skills, isSuccess: isSkillSuccess } = useGetSkillsQuery("skillsList")
    const { data: all_projects, isSuccess: isProjectSuccess } = useGetProjectsQuery("projectsList")
    const { data: all_teams, isSuccess: isTeamSuccess } = useGetTeamsQuery("teamsList")

    const debouncedCheckLists = useDebounce(CheckLists, 100);

    useEffect(() => {
        // eslint-disable-next-line
    }, [debouncedCheckLists]);
    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setProjects("")
            tasknameRef.current.value = ""
            descriptionRef.current.value = ""
            setTeams([""])
            setSkills([""])
            setCheckLists([{ check: false, subtask: "" }])
            setErrmsg("* Field Required")
            navigate(`/main/joblist/${id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isDelSuccess, navigate])

    // CheckLists Button Handle 
    const onHandleChangeCheckLists = (index, event) => {
        let checkLists_data = [...CheckLists]
        let { check, subtask } = checkLists_data[index]
        subtask = event.target.value
        checkLists_data[index] = { check, subtask }
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
        let { check, subtask } = checkLists_data[index]
        check = !input.check
        checkLists_data[index] = { check, subtask }
        setCheckLists(checkLists_data)
    }

    const [errmsg, setErrmsg] = useState("")

    const onSaveClicked = async (e) => {
        e.preventDefault()
        const cansave = !!Projects && !!tasknameRef.current.value?.trim() && !isLoading
        if (cansave) {
            const UpdateTask = {
                id,
                project: Projects,
                taskname: tasknameRef.current.value?.trim(),
                description: descriptionRef.current.value?.trim(),
                teams: Teams.filter(e => !!(e?.trim())),
                skills: Skills.filter(e => !!(e?.trim())),
                checklists: CheckLists.filter(e => !!(e.subtask?.trim())),
                complete,
                dateline:DateLine,
                activity: { username: userid, action: `update task ` }
            }
            await updateTask({ ...UpdateTask })
        } else {
            setErrmsg("* Field Required")
        }
    }
    const onDelClicked = async (e) => {
        e.preventDefault()
        const sureDel = window.confirm("Are you sure")
        if (sureDel && !isDelLoading) {
            await deleteTask({ id })
        }
    }
    useEffect(() => {
        const onHandleAddCheckLists = () => {
            let newCheckLists = { check: false, subtask: "" }
            setCheckLists([...CheckLists, newCheckLists])
        }

        if (CheckLists.at(-1)["subtask"]) {
            onHandleAddCheckLists()
        }

    }, [CheckLists])

    useEffect(() => { setErrmsg(error?.data?.message || delError?.data?.message) }, [isError, isDelError, error, delError])
    let content
    if (isProjectSuccess && isSkillSuccess && isTeamSuccess) {
        if (isProjectSuccess && isSkillSuccess && isTeamSuccess) {
            const skillsOption = all_skills.ids.map(e => {
                return { value: e, label: all_skills.entities[e].skillname }
            })
            const projectsOption = all_projects.ids.map(e => {
                return { value: e, label: all_projects.entities[e].projectname }
            })
            const teamsOption = all_teams.ids.map(e => {
                return { value: e, label: all_teams.entities[e].teamname }
            })
            if (!Projects) setProjects(project._id)
            content = (<Card>
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
                                    defaultValue={{ value: project._id, label: project.projectname }}
                                />
                            </Col>
                        </FormGroup>
                    </CardHeader>
                    <InputGroup className="p-2">
                        <InputGroup.Text>Task* :</InputGroup.Text>
                        <Form.Control type="text" ref={tasknameRef} defaultValue={taskname} className="w-auto" />
                    </InputGroup>

                    <InputGroup className="p-2">
                        <InputGroup.Text>
                            Descrition :
                        </InputGroup.Text>
                        <Form.Control as="textarea" rows={3} ref={descriptionRef} defaultValue={description} />
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
                    <div>
                      <DateTimePicker
                                value={DateLine}
                                onChange={e=> setDateLine(e)}
                                />  
                    </div>
                    
                    <Button variant="primary" className="m-1" onClick={onSaveClicked}>Save</Button>
                    <Button variant="danger" className="m-1" onClick={onDelClicked}>Delete</Button>
                    <Card.Footer as={Container}>
                        <Row md={3}>
                            <FormGroup as={Col} className="d-flex flex-column align-items-center">
                                <Form.Label>Teams</Form.Label>
                                <Select
                                    options={teamsOption}
                                    isMulti
                                    onChange={e => setTeams(e.map(ele => ele.value))}
                                    defaultValue={teams.map(e => {
                                        return { value: e._id, label: e.teamname }
                                    })}
                                    className="task__teams__dropdown"
                                    styles={dropDownStyle(teams.length)}
                                />

                            </FormGroup>


                            <FormGroup as={Col} className="d-flex flex-column align-items-center">

                                <Form.Label>required Skills</Form.Label>


                                <Select
                                    options={skillsOption}
                                    isMulti
                                    styles={dropDownStyle(teams.length)}
                                    defaultValue={skills.map(e => {
                                        return { value: e._id, label: e.skillname }
                                    })}
                                    onChange={e => setSkills(e.map(ele => ele.value))}
                                    className="task__skills__dropdown"
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
}

export default EditTaskForm;