import { useGetTasksQuery, useUpdatecheckTaskMutation } from "./tasksApiSlice";
import { memo, } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";
import { Accordion, Badge, Button, Card, CardGroup, Container, Form, Row } from "react-bootstrap";

const Task = ({ taskId }) => {
    const { task } = useGetTasksQuery({ filter: { _id: taskId } }, {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId]
        })
    }, "tasksList")
    const [updatecheckTask] = useUpdatecheckTaskMutation()
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

    const onHandleCheckMark = (e, input, index) => {
        e.preventDefault()
        let checkLists_data = [...CheckLists]
        let { check, subtask } = checkLists_data[index]
        check = !input.check
        checkLists_data[index] = { check, subtask }
        setCheckLists(checkLists_data)
        e.target.check = !e.target.check
    }
    const onHandleEdit = () => navigate(`/main/joblist/${taskId}/edit`)
    if (task) {
        
        const { project, taskname, teams, skills, description, activity } = task
        
    const activity_C = activity?.length>0 ?(<Accordion className="task_activity">
    <Accordion.Header>Activity</Accordion.Header>
{activity.map((e, i) => <Accordion.Body className="p-1 " key={`activity ${i}`}>{e.username.username} {e.action}</Accordion.Body>)}
</Accordion>) : null


        return (<Card className={`m-2`}>

            <Card.Header className="task__project">
                {project.projectname}
            </Card.Header>
            

            <Card.Body>
                <Card.Title className="task__task">
                {taskname}
            </Card.Title>
                <Card.Subtitle>
                    {description?"Descrition :":""}
                </Card.Subtitle>
                <Card.Text>
                 {description}   
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
                            onClick={e => onHandleCheckMark(e, input, index)} 
                            label={input.subtask}
                            checked={input.check}
                            readOnly
                            /> 
                        )}
                    )}
                    </Form>
                        {activity_C}
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
                <Button onClick={onHandleEdit}>Edit</Button>


            </Card.Footer>

        </Card>

        );
    } else return null
}
const memoTask = memo(Task)
export default memoTask;