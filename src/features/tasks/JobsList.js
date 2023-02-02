import { useGetTasksQuery } from "./tasksApiSlice";
import MiniTask from "./MiniTask";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { Card, Nav} from "react-bootstrap";

const JobsList = () => {
    // const {pathname} = useLocation()
    // const JOBSLIST_REGEX = /^\/main\/joblist\/?$/
    const {data:tasks,
        isLoading,isSuccess,isError,error
    }=useGetTasksQuery("tasksList",{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true})
    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (isSuccess){
        const {ids} = tasks
        const jobCardList = ids?.length && ids.map(taskId=><MiniTask key={taskId} taskId={taskId}/>)
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
export default JobsList