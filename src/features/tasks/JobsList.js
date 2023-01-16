import { useGetTasksQuery } from "./tasksApiSlice";
import Task from "./Task";
import { Link } from "react-router-dom";

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
        const jobCardList = ids?.length && ids.map(taskId=><Task key={taskId} taskId={taskId}/>)
        content =(<>
            <div className="title__menu">
                jobList
                <Link to="/main/joblist/new" >Create</Link>
            </div>
            {jobCardList}
            </>)
        
    }
    return content

}
export default JobsList