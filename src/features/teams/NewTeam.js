import React from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { dropDownStyle } from '../../hooks/dropDownStyle'
import { useGetTeamsQuery } from './teamsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useAddNewTeamMutation } from './teamsApiSlice'

function NewTeam() {
    const { data: users,
    } = useGetUsersQuery("usersList", {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const { data: teams,
    } = useGetTeamsQuery("teamsList", {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [addteam,{isLoading}] = useAddNewTeamMutation()

    const [Team,setTeam] = useState()
    const [Manager,setManager] = useState()
    const [Member, setMember] = useState([])

    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Team&&Manager&&Member){
            const team = {teamname:Team,manager:Manager,member:Member}
        await addteam({...team})
        navigate("/main/team")
        }else{
            console.log("fill");
        }
    
    }

    let content
    if (isLoading ) return <p>Loading...</p>
    if (teams&&users) {
        const usersOption = users.ids.map(e => {
            return { value: e, label: users.entities[e].username }
        })

        content = (<Form>
            <Card style={{ backgroundColor: "white", color: "black" }}>
                <Card.Body>
                    <Card.Title><Form.Group>
                        <Form.Label>Team Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={e=>setTeam(e.target.value)}
                        />
                    </Form.Group> </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><Form.Group>
                        <Form.Label>Manager</Form.Label>
                        <Select
                            options={usersOption}
                            onChange={e=>setManager(e.value)}
                            styles={dropDownStyle(1.5)}
                        />
                    </Form.Group> </Card.Subtitle>

                    <Form.Group>
                        <Form.Label>Member</Form.Label>
                        <Select
                            options={usersOption}
                            onChange={e => { setMember(e.map(ele => ele.value)) }}
                            isMulti
                            styles={dropDownStyle(1)}
                        />
                    </Form.Group>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                </Card.Body>
            </Card></Form>
        )
    }
    return content
}

export default NewTeam