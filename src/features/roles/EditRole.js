import { useParams } from "react-router-dom"
import EditRoleForm from "./EditRoleForm"
import { useGetRolesQuery } from "./rolesApiSlice"

export default function EditRole() {
    const {id}=useParams()
        const {role}=useGetRolesQuery({filter:{_id:id}},{
        selectFromResult:({data})=>({
            role:data?.entities[id]
        }),
        pollingInterval:60*1000
    },"rolesList")
    if(!role) return <p>Notfound</p> 
    const content = <EditRoleForm role={role}/>
    return content;
}