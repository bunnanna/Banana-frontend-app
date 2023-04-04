import { useParams } from "react-router-dom"
import EditUserForm from "./EditUserForm"
import { useGetUsersQuery } from "./usersApiSlice"

export default function EditUser() {
    const {id}=useParams()
        const {user}=useGetUsersQuery({_id:id},{
        selectFromResult:({data})=>({
            user:data?.entities[id]
        }),
    })
    if(!user) return <p>Notfound</p> 
    const content = <EditUserForm user={user}/>
    return content;
}
