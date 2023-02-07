import React from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


import { useDeleteRoleMutation, useUpdateRoleMutation } from './rolesApiSlice'

function EditRoleForm({role}) {

    const{id,rolename}=role

    const [updaterole,{isLoading}] = useUpdateRoleMutation()
    const [deleterole]= useDeleteRoleMutation()
    

    const [Role,setRole] = useState(rolename)

    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Role){
            const role = { id, Role}
        await updaterole({...role})
        navigate("/main/role")
        }else{
            console.log("fill");
        }
    
    }
    const onHandleDelete= async (e)=>{
        e.preventDefault()
        await deleterole({id})
        navigate("/main/role")
    }

    let content
    if (isLoading ) return <p>Loading...</p>
        content = (<Form>
            <Card style={{ backgroundColor: "white", color: "black" }}>
                <Card.Body>
                    <Card.Title>
                        <Form.Label>Role Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={e=>setRole(e.target.value)}
                            defaultValue={Role}
                        />
                    </Card.Title>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                    <Button className='m-1' onClick={onHandleDelete}>Delete</Button>
                </Card.Body>
            </Card></Form>
        )
        return content
    }

export default EditRoleForm