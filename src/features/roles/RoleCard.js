import React from 'react'
import { Button, Card } from 'react-bootstrap';
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
      <Card.Header>{rolename}</Card.Header>

      <Card.Footer>
        <Button href={`/main/role/${roleId}/edit`}> Edit </Button>    
      </Card.Footer>
    </Card>
  );
};
return content
}
