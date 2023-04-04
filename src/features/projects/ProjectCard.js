import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Badge, CardGroup, Col, Row } from 'react-bootstrap';
import Card  from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { useGetProjectsQuery } from './projectsApiSlice';

const ProjectCard = ({projectId}) => {

    const {project} = useGetProjectsQuery({_id:projectId},{
        selectFromResult:({data})=>({
            project:data?.entities[projectId]
        })
    })

    let content
    if(project){
    const { projectname, manager, tasks,teams , complete } = project
  content= (
    <Card className='m-2'>
      <Card.Header className="d-flex justify-content-between align-items-center">{projectname} <Link to={`/main/project/${projectId}/edit`}><FontAwesomeIcon icon={faFilePen}/></Link></Card.Header>
      <Card.Body>
        <CardGroup as={Row}>
          <Col>
        <Card.Title className="mb-2">Manager: {manager.username}</Card.Title>
        <Card.Title>Tasks :</Card.Title>
        {tasks.map(task=><Card.Text key={task._id} className="mb-0"><Card.Link style={{fontSize: "1.5rem",padding:"0"}} href={`/main/joblist/${task._id}`}>{task.taskname}</Card.Link></Card.Text>)}
        </Col>
        <Col>
        <CardGroup className="d-flex flex-column align-items-center">
                    <Card.Title>Teams :</Card.Title> 
                    <Card.Text>
                        {teams.map(e => <Badge bg="dark" className="m-1" key={e.teamname}>{e.teamname}</Badge>)}
                    </Card.Text>
                </CardGroup>
        </Col>
        </CardGroup>
      </Card.Body>
      <Card.Footer>
      <Card.Text>
          Status: {complete ? 'Completed' : 'In Progress'}
        </Card.Text>
      </Card.Footer>
    </Card>
  );
};
return content
}
export default ProjectCard;
