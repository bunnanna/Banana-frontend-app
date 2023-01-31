import React from 'react';
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
    const { projectname, manager, tasks, complete } = project
  content= (
    <Card className='m-2'>
      <Card.Header>{projectname}</Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Manager: {manager.username}</Card.Subtitle>
        {tasks.map(task=><Card.Text key={task._id} className="mb-0"><Card.Link href={`/main/joblist/${task._id}`}>{task.taskname}</Card.Link></Card.Text>)}
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
