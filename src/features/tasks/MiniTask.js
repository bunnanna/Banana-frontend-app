import { Badge, Card, CardGroup, Col, Container, Row } from "react-bootstrap";
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
                <Card.Header>
                    {project.projectname}
                </Card.Header>

                <Card.Body>
                    <Card.Title>
                        {taskname}
                    </Card.Title>
                    <Container>
                        <Row md={2} xs={1}>
                            <Col>
                            <CardGroup className="d-flex flex-column align-items-center">
                    <Card.Title>Teams :</Card.Title> 
                    <Card.Text>
                        {teams.map(e => <Badge bg="dark" className="m-1" key={e.teamname}>{e.teamname}</Badge>)}
                    </Card.Text>
                </CardGroup>
                            </Col>
                            <Col>
                            <CardGroup className="d-flex flex-column align-items-center">
                    <Card.Title>required skill :</Card.Title> 
                    <Card.Text>
                        {skills.map(e => <Badge bg="dark" className="m-1" key={e.skillname}>{e.skillname}</Badge>)}
                    </Card.Text>
                </CardGroup>
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