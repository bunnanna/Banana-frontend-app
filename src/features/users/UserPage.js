import useCurrentUser from "../../hooks/useCurrentUser";
import UserProfile from "./UserProfile";
import { useGetUsersQuery } from "./usersApiSlice";

const UserPage = () => {
    const {id} = useCurrentUser()
    const {currentUser}=useGetUsersQuery("usersList",{
        selectFromResult:(({data})=>({
            currentUser: data?.entities[id]
        }))
    })
    return <UserProfile user={currentUser}/>
    
}
 
export default UserPage;