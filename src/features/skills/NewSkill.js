import React from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'


import { useAddNewSkillMutation } from './skillsApiSlice'

function NewSkill() {

    const [addskill,{isLoading}] = useAddNewSkillMutation()

    const [Skill,setSkill] = useState()

    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Skill){
            const skill = {skillname:Skill}
        await addskill({...skill})
        navigate("/main/skill")
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
                        <Form.Label>Skill Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={e=>setSkill(e.target.value)}
                        />
                    </Card.Title>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                </Card.Body>
            </Card></Form>
        )
        return content
    }

export default NewSkill