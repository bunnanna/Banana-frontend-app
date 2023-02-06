import { useGetTasksQuery } from "./tasksApiSlice";
import MiniTask from "./MiniTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Nav} from "react-bootstrap";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useGetUsersQuery } from "../users/usersApiSlice";

const ApprovedList = () => {
    // const {pathname} = useLocation()
    // const APPROVEDLIST_REGEX = /^\/main\/joblist\/?$/

    const currentUser = useCurrentUser()
    const {user}=useGetUsersQuery({filter:{username:currentUser.username}},{
        selectFromResult:({data})=>({
            user:data?.entities[data?.ids]
        })
    },"usersList")

    const {data:tasks,
        isLoading,isError,error
    }=useGetTasksQuery({filter:{status:"Submitted",teams:{$in:user?.teams.map(e=>e?._id)}}},{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true},"tasksList")
    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (tasks){
        const {ids} = tasks
        const jobCardList = ids.map(taskId=><MiniTask key={taskId} taskId={taskId}/>)
        content =(<Card>
            <Card.Header >
                <Nav className="p-0 align-items-center justify-content-between">
                <Nav.Item/>
                <Nav.Item>JobList</Nav.Item>
                <Nav.Link href="/main/joblist/new" > <FontAwesomeIcon icon={faFileCirclePlus}/> </Nav.Link>
                </Nav>
            </Card.Header>
            <Card.Body>
              {jobCardList}  
            </Card.Body>
            
            </Card>)
        
    }
    return content

}
export default ApprovedList