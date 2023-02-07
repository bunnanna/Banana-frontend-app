import { useState } from "react"
import { Button, Card, Form } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import Select from "react-select"
import { dropDownStyle } from "../../hooks/dropDownStyle"
import { useGetTeamsQuery } from "./teamsApiSlice"
import { useGetUsersQuery } from "../users/usersApiSlice"
import { useDeleteTeamMutation, useUpdateTeamMutation } from "./teamsApiSlice"


export default function EditTeamForm({team}) {
    const {id,teamname,manager,member} = team

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
    const [updateteam,{isLoading:isUpdateLoading}] = useUpdateTeamMutation()
    const [deleteteam]= useDeleteTeamMutation()

    const [Team,setTeam] = useState(teamname)
    const [Manager,setManager] = useState(manager)
    const [Member, setMember] = useState(member)


    const navigate = useNavigate()

    const onHandleSave = async (e)=>{
        e.preventDefault()
        if(Team&&Manager&&Member){
            const team = { id, teamname:Team,manager:Manager,member:Member}
        await updateteam({...team})
        navigate("/main/team")
        }else{
            console.log("fill");
        }
    
    }
    const onHandleDelete= async (e)=>{
        e.preventDefault()
        await deleteteam({id})
        navigate("/main/team")
    }

    let content
    if (isUpdateLoading) return <p>Loading...</p>
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
                            value={Team}
                        />
                    </Form.Group> </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted"><Form.Group>
                        <Form.Label>Manager</Form.Label>
                        <Select
                            options={usersOption}
                            onChange={e=>setManager(e.value)}
                            className="dropdown"
                            styles={dropDownStyle(1.5)}
                            defaultValue= {{value: Manager._id, label: Manager.username} }
                        />
                    </Form.Group> </Card.Subtitle>

                    <Form.Group>
                        <Form.Label>Member</Form.Label>
                        <Select
                            options={usersOption}
                            onChange={e => { setMember(e.map(ele => ele.value)) }}
                            isMulti
                            className="dropdown"
                            styles={dropDownStyle(1)}
                            defaultValue={Member.map(e => {
                                return { value: e._id, label: e.username }
                            })}
                        />
                    </Form.Group>
                    <Button className='m-1' onClick={onHandleSave}>Save</Button>
                    <Button className='m-1' onClick={onHandleDelete} variant="danger">Delete</Button>
                </Card.Body>
            </Card></Form>
        )
    }
    return content
}


