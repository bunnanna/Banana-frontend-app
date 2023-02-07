import React from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


import { useAddNewRoleMutation } from './rolesApiSlice'

function NewRole() {

    const [addrole,{isLoading}] = useAddNewRoleMutation()

    const [Role,setRole] = useState()

    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Role){
            const role = {rolename:Role}
        await addrole({...role})
        navigate("/main/role")
        }else{
            console.log("fill");
        }
    
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
                        />
                    </Card.Title>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                </Card.Body>
            </Card></Form>
        )
        return content
    }

export default NewRole