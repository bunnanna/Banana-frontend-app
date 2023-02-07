import { Button } from "react-bootstrap";
import useCurrentUser from "../../hooks/useCurrentUser";
import UserProfile from "./UserProfile";
import { useGetUsersQuery } from "./usersApiSlice";

const UserPage = () => {

    const { username } = useCurrentUser()

    const {currentUser,isLoading,isSuccess}=useGetUsersQuery({filter:{username}},{
        selectFromResult:({data,isLoading,isSuccess})=>({
            currentUser:data?.entities[data?.ids],isLoading,isSuccess
        }),
        
    },"usersList")

    let content
    if(isLoading) content=<p>Loading...</p>
    if(currentUser&&isSuccess) {
        content = (<>
        <UserProfile user={currentUser} />
        <Button href="/user/list">User List</Button>
        </>
        )
    }
    return content

}

export default UserPage;