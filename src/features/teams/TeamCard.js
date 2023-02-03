import React from 'react';
import Card  from 'react-bootstrap/Card';
import { useGetTeamsQuery } from './teamsApiSlice';

const TeamCard = ({teamId}) => {

    const {team} = useGetTeamsQuery({filter:{_id:teamId}},{
        selectFromResult:({data})=>({
            team:data?.entities[teamId]
        })
    },"teamsList")

    let content
    console.log(team);
    if(team){
    const { teamname, manager, member, project } = team
  content= (
    <Card className='m-2'>
      <Card.Header>{teamname}</Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Manager: {manager.username}</Card.Subtitle>
        {member.map(task=><Card.Text key={task._id} className="mb-0"><Card.Link href={`/main/joblist/${task._id}`}>{task.taskname}</Card.Link></Card.Text>)}
        <Card.Text>
        {project.map(project=><Card.Text key={project._id} className="mb-0"><Card.Link href={`/main/joblist/${project._id}`}>{project.projectname}</Card.Link></Card.Text>)}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};
return content
}

export default TeamCard;
