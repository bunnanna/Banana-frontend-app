import React from 'react';
import { Button } from 'react-bootstrap';
import Card  from 'react-bootstrap/Card';
import { useGetTeamsQuery } from './teamsApiSlice';

const TeamCard = ({teamId}) => {

    const {team} = useGetTeamsQuery({filter:{_id:teamId}},{
        selectFromResult:({data})=>({
            team:data?.entities[teamId]
        })
    },"teamsList")

    let content
    if(team){
    const { teamname, manager, member, project } = team
  content= (
    <Card className='m-2'>
      <Card.Header>{teamname}</Card.Header>
      <Card.Body>
        <Card.Subtitle className="mb-2 text-muted">Manager: {manager.username}</Card.Subtitle>
        { member?.length>0&&<Card.Subtitle>Member</Card.Subtitle> }
        {member.map(user=><Card.Text key={user._id} className="mb-0">{user.username}</Card.Text>)}
        {project?.length>0 && <Card.Subtitle>Project</Card.Subtitle>}
        {project.map(project=><Card.Text key={project._id} className="mb-0"><Card.Link href={`/main/joblist/${project._id}`}>{project.projectname}</Card.Link></Card.Text>)}

      </Card.Body>
      <Card.Footer>
        <Button href={`/main/team/${teamId}/edit`}> Edit </Button>
        
      </Card.Footer>
    </Card>
  );
};
return content
}

export default TeamCard;
