import React from 'react'
import { useState } from 'react'
import { Button, Card, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { dropDownStyle } from '../../hooks/dropDownStyle'
import { useGetTeamsQuery } from '../teams/teamsApiSlice'
import { useGetUsersQuery } from '../users/usersApiSlice'
import { useAddNewProjectMutation } from './projectsApiSlice'

function NewProject() {
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
    const [addproject,{isLoading}] = useAddNewProjectMutation()

    const [Teams, setTeams] = useState([])
    const [Manager,setManager] = useState()
    const [Project,setProject] = useState("")

    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Project&&Manager&&Teams){
            const project = {projectname:Project,manager:Manager,teams:Teams}
        await addproject({...project})
        navigate("/main/project")
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
        const teamsOption = teams.ids.map(e => {
            return { value: e, label: teams.entities[e].teamname }
        })

        content = (<Form>
            <Card style={{ backgroundColor: "white", color: "black" }}>
                <Card.Body>
                    <Card.Title><Form.Group>
                        <Form.Label>Project Name</Form.Label>
                        <Form.Control
                            required
                            type='text'
                            onChange={e=>setProject(e.target.value)}
                        />
                    </Form.Group> </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><Form.Group>
                        <Form.Label>Manager</Form.Label>
                        <Select
                            options={usersOption}
                            onChange={e=>setManager(e.value)}
                            className="dropdown"
                            styles={dropDownStyle(0)}
                        />
                    </Form.Group> </Card.Subtitle>

                    <Form.Group>
                        <Form.Label>Teams</Form.Label>
                        <Select
                            options={teamsOption}
                            onChange={e => { setTeams(e.map(ele => ele.value)) }}
                            isMulti
                            className="dropdown"
                            styles={dropDownStyle(Teams.length)}
                        />
                    </Form.Group>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                </Card.Body>
            </Card></Form>
        )
    }
    return content
}

export default NewProject