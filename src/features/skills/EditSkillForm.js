import React from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


import { useDeleteSkillMutation, useUpdateSkillMutation } from './skillsApiSlice'

function EditSkillForm({skill}) {

    const{id,skillname}=skill

    const [updateskill,{isLoading}] = useUpdateSkillMutation()
    const [deleteskill]= useDeleteSkillMutation()
    

    const [Skill,setSkill] = useState(skillname)

    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Skill){
            const skill = { id, Skill}
        await updateskill({...skill})
        navigate("/main/skill")
        }else{
            console.log("fill");
        }
    
    }
    const onHandleDelete= async (e)=>{
        e.preventDefault()
        await deleteskill({id})
        navigate("/main/skill")
    }

    let content
    if (isLoading ) return <p>Loading...</p>
        content = (<Form>
            <Card style={{ backgroundColor: "white", color: "black" }}>
                <Card.Body>
                    <Card.Title>
                        <Form.Label>Skill Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={e=>setSkill(e.target.value)}
                            defaultValue={Skill}
                        />
                    </Card.Title>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                    <Button className='m-1' onClick={onHandleDelete}>Delete</Button>
                </Card.Body>
            </Card></Form>
        )
        return content
    }

export default EditSkillForm