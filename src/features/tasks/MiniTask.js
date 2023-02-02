import { Card, Col, Container, ListGroup, ListGroupItem, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useGetTasksQuery } from "./tasksApiSlice";

const MiniTask = ({ taskId }) => {
    const { task } = useGetTasksQuery({ filter: { _id: taskId } }, {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId]
        })
    }, "tasksList")

    if (task) {

        const { project, taskname, teams, skills } = task
        return (<Link to={`/main/joblist/${taskId}`}>
            <Card className={`m-2`}>
                <Card.Header className>
                    {project.projectname}
                </Card.Header>

                <Card.Body>
                    <Card.Title className>
                        {taskname}
                    </Card.Title>
                    <Container>
                        <Row md={2} xs={1}>
                            <Col>
                            <ListGroup as="ul" className="m-2">
                                <ListGroupItem active>teams :</ListGroupItem> 
                                    {teams.map(e => <ListGroupItem key={e.teamname}>{e.teamname}</ListGroupItem>)}
                            </ListGroup>
                            </Col>
                            <Col>
                            <ListGroup as="ul" className="m-2" >
                            <ListGroupItem active>required skill :</ListGroupItem>
                                    {skills.map(e => <ListGroupItem key={e.skillname}>{e.skillname}</ListGroupItem>)}
                            </ListGroup>
                            </Col>
                        </Row>
                    </Container>
                </Card.Body>
            </Card>
        </Link>
        );
    } else return null
}

export default MiniTask;