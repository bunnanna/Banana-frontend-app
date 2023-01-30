import React from 'react';
import { Card } from 'react-bootstrap';
import { useGetProjectsQuery } from './projectsApiSlice';

const ProjectCard = ({projectId}) => {
    const {project} = useGetProjectsQuery({filter:{_id:projectId}},{
        selectFromResult:({data})=>({
            project:data?.entities[projectId]
        })
    },"projectsList")

    let content
    if(project){
    const { projectname, manager, complete } = project
  content= (
    <Card style={{ width: '18rem',backgroundColor:"white",color:"black"}}>
      <Card.Body>
        <Card.Title>{projectname}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">Manager: {manager}</Card.Subtitle>
        <Card.Text>
          Status: {complete ? 'Completed' : 'In Progress'}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
return content
}
export default ProjectCard;
