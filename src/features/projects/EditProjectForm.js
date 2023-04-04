import { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { dropDownStyle } from "../../hooks/dropDownStyle"
import { useGetTeamsQuery } from "../teams/teamsApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { useDeleteProjectMutation, useUpdateProjectMutation } from "./projectsApiSlice"


export default function EditProjectForm({project}) {
    const {id,projectname,manager,teams:project_teams } = project
    const { data: users,
    } = useGetUsersQuery(null,{
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const { data: teams,
    } = useGetTeamsQuery(null,{
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true
    })
    const [updateproject,{isLoading:isUpdateLoading}] = useUpdateProjectMutation()
    const [deleteproject]= useDeleteProjectMutation()

    const [Teams, setTeams] = useState(project_teams.map(e => e._id))
    const [Manager,setManager] = useState(manager._id)
    const [Project,setProject] = useState(projectname)


    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Project&&Manager&&Teams){
            const project = { id, projectname:Project,manager:Manager,teams:Teams}
        await updateproject({...project})
        navigate("/main/project")
        }else{
            console.log("fill");
        }
    
    }
    const onHandleDelete= async (e)=>{
        e.preventDefault()
        await deleteproject({id})
        navigate("/main/project")
    }

    let content
    if (isUpdateLoading ) return <p>Loading...</p>
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
                            defaultValue={Project}
                        />
                    </Form.Group> </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><Form.Group>
                        <Form.Label>Manager</Form.Label>
                        <Select
                            options={usersOption}
                            onChange={e=>setManager(e.value)}
                            styles={dropDownStyle(1.5)}
                            defaultValue={{value: manager.id, label: manager.username}}
                        />
                    </Form.Group> </Card.Subtitle>

                    <Form.Group>
                        <Form.Label>Teams</Form.Label>
                        <Select
                            options={teamsOption}
                            onChange={e => { setTeams(e.map(ele => ele.value)) }}
                            isMulti
                            styles={dropDownStyle(1)}
                            defaultValue={project_teams.map(e => {
                                return { value: e._id, label: e.teamname }
                            })}
                        />
                    </Form.Group>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                    <Button className='m-1' onClick={onHandleDelete}>Delete</Button>
                </Card.Body>
            </Card></Form>
        )
    }
    return content
}
