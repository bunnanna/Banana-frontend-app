import { useGetTasksQuery, useUpdatecheckTaskMutation, useUpdateTaskMutation } from "./tasksApiSlice";
import { memo, } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import { Accordion, Badge, Button, Card, CardGroup, Col, Container, Form, Row } from "react-bootstrap";
import useCurrentUser from "../../hooks/useCurrentUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilePen } from "@fortawesome/free-solid-svg-icons";

const Task = ({ taskId }) => {
    const { task } = useGetTasksQuery({ filter: { _id: taskId } }, {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId]
        })
    }, "tasksList")
    const [updatecheckTask] = useUpdatecheckTaskMutation()
    const [updateTask] = useUpdateTaskMutation()
    const [CheckLists, setCheckLists] = useState(task?.checklists)

    const navigate = useNavigate()
    const debouncedCheckLists = useDebounce(CheckLists, 100);

    useEffect(() => {
        if (task?.checklists !== debouncedCheckLists) {
            // console.log(debouncedCheckLists)
            updatecheckTask({ id: taskId, checklists: debouncedCheckLists });
        }
        // eslint-disable-next-line
    }, [debouncedCheckLists]);

    const currentUser = useCurrentUser()

    const onHandleCheckMark = (e, input, index) => {
        e.preventDefault()
        let checkLists_data = [...CheckLists]
        let { check, subtask } = checkLists_data[index]
        check = !input.check
        checkLists_data[index] = { check, subtask }
        setCheckLists(checkLists_data)
        e.target.check = !e.target.check
    }
    const onHandleSubmit = async (e, status) => {
        e.preventDefault()
        await updateTask({ id: taskId, status, activity: { username: currentUser.id, action: `${status} This Task` } })
        navigate("/main/joblist")
    }
    const onHandleComplete = async (e, status) => {
        e.preventDefault()
        await updateTask({ id: taskId, status, activity: { username: currentUser.id, action: `${status} This Task` }, complete: true })
        navigate("/main/joblist")
    }


    if (task) {

        const { project, taskname, teams, skills, description, activity, dateline, status } = task
        const DateLine = new Date(dateline)
        let next_button
        if (status === "assign") next_button = <Button className="m-2" onClick={e => onHandleSubmit(e, "Submitted")}>Submit</Button>
        if (status === "Submitted") next_button = <Button className="m-2" onClick={e => onHandleComplete(e, "Complete")}>Approve</Button>

        const activity_C = activity?.length > 0 ? (<Accordion >
            <Accordion.Header>Activity</Accordion.Header>
            {activity.map((e, i) => <Accordion.Body className="p-0 m-1" key={`activity ${i}`}>{e?.username?.username} {e?.action}</Accordion.Body>)}
        </Accordion>) : null


        return (<Card className={`m-2`}>

            <Card.Header className="p-0 d-flex align-items-center justify-content-between">

                {project.projectname} {`Status:${status}`}<Link to={`/main/joblist/${taskId}/edit`}><FontAwesomeIcon size="xl" className="m-2" icon={faFilePen} /></Link>

            </Card.Header>


            <Card.Body as={Row}>
                <Col>
                    <Card.Title>
                        {taskname}
                    </Card.Title>
                    <Card.Subtitle>
                        {description ? "Descrition :" : ""}
                    </Card.Subtitle>
                    <Card.Text>
                        {description}
                    </Card.Text>
                    <Card.Title>
                        DateLine :
                    </Card.Title>
                    <Card.Text>
                        {DateLine.toLocaleString()}
                    </Card.Text>
                    <div>
                        Checklist :
                    </div>
                    <Form>
                        {CheckLists.map((input, index) => {
                            return (
                                <Form.Check
                                    key={index}
                                    type="checkbox"
                                    className="d-flex align-items-center p-0"
                                    >
                                    <Form.Check.Input
                                        type="checkbox"
                                        onClick={e => onHandleCheckMark(e, input, index)}
                                        checked={input.check}
                                        className="mx-2 p-0"
                                        readOnly
                                    />
                                    <Form.Check.Label>{input.subtask}</Form.Check.Label>
                                </Form.Check>
                            )
                        }
                        )}
                    </Form>
                </Col>
                <Col>
                    {activity_C}
                </Col>

            </Card.Body>
            <Card.Footer as={Container}>
                <Row md={2}>
                    <CardGroup className="d-flex flex-column align-items-center">
                        <Card.Title>teams :</Card.Title>
                        <Card.Text>
                            {teams.map(e => <Badge bg="dark" key={e.teamname}>{e.teamname}</Badge>)}
                        </Card.Text>
                    </CardGroup>
                    <CardGroup className="d-flex flex-column align-items-center">
                        <Card.Title>required skill :</Card.Title>
                        <Card.Text>
                            {skills.map(e => <Badge bg="dark" className="m-1" key={e.skillname}>{e.skillname}</Badge>)}
                        </Card.Text>
                    </CardGroup>
                </Row>
                {next_button}


            </Card.Footer>

        </Card>

        );
    } else return null
}
const memoTask = memo(Task)
export default memoTask;