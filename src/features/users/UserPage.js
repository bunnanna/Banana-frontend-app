import { Button } from "react-bootstrap";
import useCurrentUser from "../../hooks/useCurrentUser";
import UserCard from "./UserCard";
import { useGetUsersQuery } from "./usersApiSlice";

const UserPage = () => {

    const { username } = useCurrentUser()

    const {currentUser,isLoading,isSuccess}=useGetUsersQuery({username},{
        selectFromResult:({data,isLoading,isSuccess})=>({
            currentUser:data?.entities[data?.ids],isLoading,isSuccess
        }),
        
    })

    let content
    if(isLoading) content=<p>Loading...</p>
    if(currentUser&&isSuccess) {
        content = (<>
        <UserCard user={currentUser} />
        <Button href="/user/list">User List</Button>
        </>
        )
    }
    return content

}

export default UserPage;