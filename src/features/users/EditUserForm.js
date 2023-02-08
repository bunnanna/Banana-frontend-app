import { faSave } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useState } from 'react'
import { Card, Form, InputGroup, ListGroup, ListGroupItem } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { dropDownStyle } from '../../hooks/dropDownStyle'
import { useGetRolesQuery } from '../roles/rolesApiSlice'
import { useGetSkillsQuery } from '../skills/skillsApiSlice'
import { useGetTeamsQuery } from '../teams/teamsApiSlice'
import { useUpdateUserMutation } from './usersApiSlice'

export default function EditUserForm({user}) {

    const[username,setUsername]=useState(user.username)
    const[password, setPassword]=useState()
    const[prvpassword, setPrvPassword]=useState(user.passwords)
    const[roles,setRoles]=useState(user.roles.map(e => e._id))
    const[teams,setTeams]=useState(user.teams.map(e => e._id))
    const[skills,setSkills]=useState(user.skills.map(e => e._id))
    const[active,setActive]=useState(user.active)

    const { data: all_skills, isSuccess: isSkillSuccess } = useGetSkillsQuery("skillsList")
    const { data: all_roles, isSuccess: isRoleSuccess } = useGetRolesQuery("projectsList")
    const { data: all_teams, isSuccess: isTeamSuccess } = useGetTeamsQuery("teamsList")

    const [updateUser, { isLoading}] = useUpdateUserMutation()
    
    const navigate = useNavigate()

    const onHandleSave=async(e)=>{
        e.preventDefault()
        const cansave = !!username && !isLoading
        if (cansave) {
            const UpdateUser = {
                id:user._id,
                username,
                prvpassword,
                password,
                roles,
                teams,
                skills,
                active
            }
            await updateUser({ ...UpdateUser })
            navigate("/user")
        }
    }
    let content
    if(isLoading) return <p>Loading...</p>
    if(isSkillSuccess&&isRoleSuccess&&isTeamSuccess){
        const skillsOption = all_skills.ids.map(e => {
            return { value: e, label: all_skills.entities[e].skillname }
        })
        const rolesOption = all_roles.ids.map(e => {
            return { value: e, label: all_roles.entities[e].projectname }
        })
        const teamsOption = all_teams.ids.map(e => {
            return { value: e, label: all_teams.entities[e].teamname }
        })

  content = (
    <Card className="mb-3">
    <Card.Header className="d-flex justify-content-between align-items-center">{user.username} <Link onClick={e=>onHandleSave(e)}><FontAwesomeIcon icon={faSave}/></Link></Card.Header>
    <ListGroup>
        <ListGroupItem>
        <InputGroup className="p-2">
                        <InputGroup.Text htmlFor="username">Username</InputGroup.Text>
                        <Form.Control type="text" onChange={e=>setUsername(e.target.value)} />
                    </InputGroup>
                    <InputGroup className="p-2">
                        <InputGroup.Text htmlFor="password">Old Password</InputGroup.Text>
                        <Form.Control type="password" onChange={e=>setPrvPassword(e.target.value)} />
                        </InputGroup>
                    <InputGroup className="p-2">
                        <InputGroup.Text htmlFor="password">New Password</InputGroup.Text>
                        <Form.Control type="password" onChange={e=>setPassword(e.target.value)} />
                        </InputGroup>
        </ListGroupItem>
      <ListGroupItem>
      <InputGroup className="p-2">
                        <InputGroup.Text>
                            roles
                        </InputGroup.Text>
                        <Select
                                    options={rolesOption}
                                    isMulti
                                    styles={dropDownStyle(1)}
                                    defaultValue={user.roles.map(e => {
                                        return { value: e._id, label: e.rolename }
                                    })}
                                    onChange={e => setRoles(e.map(ele => ele.value))}
                                />
                    </InputGroup>


      </ListGroupItem>
      <ListGroupItem>
      <InputGroup className="p-2">
                        <InputGroup.Text>
                            teams
                        </InputGroup.Text>
                        <Select
                                    options={teamsOption}
                                    isMulti
                                    styles={dropDownStyle(1)}
                                    defaultValue={user.teams.map(e => {
                                        return { value: e._id, label: e.teamname }
                                    })}
                                    onChange={e => setTeams(e.map(ele => ele.value))}
                                />
                    </InputGroup>
      </ListGroupItem>
      <ListGroupItem>
      <InputGroup className="p-2">
                        <InputGroup.Text>
                            skills
                        </InputGroup.Text>
                        <Select
                                    options={skillsOption}
                                    isMulti
                                    styles={dropDownStyle(1)}
                                    defaultValue={user.skills.map(e => {
                                        return { value: e._id, label: e.skillname }
                                    })}
                                    onChange={e => setSkills(e.map(ele => ele.value))}
                                />
                    </InputGroup>
      </ListGroupItem>
      <ListGroupItem>
      <InputGroup className="p-2">
                        <InputGroup.Text>
                            Active
                        </InputGroup.Text>

                        <InputGroup.Checkbox
                        onChange={e=>setActive(!active)}
                        defaultChecked={user.active}
                        readOnly
                        className='m-0 '
                        />
                    </InputGroup>
      </ListGroupItem>
    </ListGroup>
    
  </Card>
  )}

  return content
}
