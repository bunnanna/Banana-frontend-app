import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
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
      <Card.Header className="d-flex justify-content-between align-items-center">{skillname} <Link to={`/main/skill/${skillId}/edit`}><FontAwesomeIcon icon={faFilePen}/></Link></Card.Header>
    </Card>
  );
};
return content
}
