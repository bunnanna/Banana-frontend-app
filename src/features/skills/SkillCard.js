import React from 'react'
import { Button, Card } from 'react-bootstrap';
import { useGetSkillsQuery } from './skillsApiSlice';

export default function SkillCard({skillId}) {
    const {skill} = useGetSkillsQuery({filter:{_id:skillId}},{
        selectFromResult:({data})=>({
            skill:data?.entities[skillId]
        })
    },"skillsList")

    let content
    if(skill){
    const { skillname} = skill
  content= (
    <Card className='m-2'>
      <Card.Header>{skillname}</Card.Header>

      <Card.Footer>
        <Button href={`/main/skill/${skillId}/edit`}> Edit </Button>    
      </Card.Footer>
    </Card>
  );
};
return content
}
