import { faFileEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useGetUsersQuery } from './usersApiSlice'

export default function UserList() {

    const {data,
        isLoading
    }=useGetUsersQuery("usersList",{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true}) 

    let content
    if(isLoading)<p>Loading...</p>
    if(data){
        const users = Object.entries(data?.entities).map(ary=>ary[1])
  content= (
   <Table striped bordered hover variant="light">
        <thead>
          <tr>
            <th>username</th>
            <th>roles</th>
            <th>teams</th>
            <th>skills</th>
            <th>active</th>
            <th>Edit</th>

          </tr>
        </thead>
        <tbody>
    {users.map(user => (
          <tr key={user._id}>
            <td>{user.username}</td>
            <td>
              <ul>
                {user.roles.length>0 ? user.roles.map(role => (
                  <li key={role._id}>{role.rolename}</li>
                )):null}
              </ul>
            </td>
            <td>
              <ul>
                {user.teams.length>0?user.teams.map(team => (
                  <li key={team._id}>{team.teamname}</li>
                )):null}
              </ul>
            </td>
            <td>
              <ul>
                {user.skills.length>0?user.skills.map(skill => (
                  <li key={skill._id}>{skill.skillname}</li>
                )):null}
              </ul>
            </td>
            <td>{user.active ? 'Yes' : 'No'}</td>
            <td><Link to={`/user/${user._id}/edit`}><FontAwesomeIcon size='xl' icon={faFileEdit} /></Link></td>
          </tr>
       
    ))}</tbody>
      </Table>
  )}

  return content
}
