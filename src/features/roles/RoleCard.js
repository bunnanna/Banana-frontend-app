import { faFilePen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGetRolesQuery } from './rolesApiSlice';

export default function RoleCard({roleId}) {
    const {role} = useGetRolesQuery({filter:{_id:roleId}},{
        selectFromResult:({data})=>({
            role:data?.entities[roleId]
        })
    },"rolesList")

    let content
    if(role){
    const { rolename} = role
  content= (
    <Card className='m-2'>
      <Card.Header className="d-flex justify-content-between align-items-center">{rolename} <Link to={`/main/role/${roleId}/edit`}><FontAwesomeIcon icon={faFilePen}/></Link></Card.Header>
    </Card>
  );
};
return content
}
