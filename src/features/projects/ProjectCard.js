import React from 'react';
import { Accordion, Button, CardGroup, Col, Row } from 'react-bootstrap';
import Card  from 'react-bootstrap/Card';
import { useGetProjectsQuery } from './projectsApiSlice';

const ProjectCard = ({projectId}) => {

    const {project} = useGetProjectsQuery({filter:{_id:projectId}},{
        selectFromResult:({data})=>({
            project:data?.entities[projectId]
        })
    },"projectsList")

    let content
    if(project){
    const { projectname, manager, tasks,teams , complete } = project
  content= (
    <Card className='m-2'>
      <Card.Header>{projectname}</Card.Header>
      <Card.Body>
        <CardGroup as={Row}>
          <Col>
        <Card.Subtitle className="mb-2 text-muted">Manager: {manager.username}</Card.Subtitle>
        {tasks.map(task=><Card.Text key={task._id} className="mb-0"><Card.Link href={`/main/joblist/${task._id}`}>{task.taskname}</Card.Link></Card.Text>)}
        <Card.Text>
          Status: {complete ? 'Completed' : 'In Progress'}
        </Card.Text>
        </Col>
        <Col>
        <Accordion className='p-0'>
          <Accordion.Header className='p-0'>Teams</Accordion.Header>
          {teams.map(team=><Accordion.Body className='p-1' key={team._id}>{team.teamname}</Accordion.Body>)}
        </Accordion>
        </Col>
        </CardGroup>
      </Card.Body>
      <Card.Footer>
        <Button href={`/main/project/${projectId}/edit`}> Edit </Button>
        
      </Card.Footer>
    </Card>
  );
};
return content
}
export default ProjectCard;
