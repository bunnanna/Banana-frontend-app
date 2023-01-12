import { useGetTasksQuery } from "../features/tasks/tasksApiSlice";
import Task from "../features/tasks/Task";

const JobsList = () => {
    const {data:tasks,
        isLoading,isSuccess,isError,error
    }=useGetTasksQuery("tasksList",{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true
    })
    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (isSuccess){
        const {ids} = tasks
        const jobCardList = ids?.length && ids.map(taskId=><Task key={taskId} taskId={taskId}/>)
        content =jobCardList
        
    }
    return content
}
export default JobsList