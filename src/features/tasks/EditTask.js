import { useParams } from "react-router-dom"
import EditTaskForm from "./EditTaskForm"
import { useGetTasksQuery } from "./tasksApiSlice"

const EditTask = () => {
    const {id}=useParams()
        const {task}=useGetTasksQuery("tasksList",{
        selectFromResult:({data})=>({
            task:data?.entities[id]
        }),
        pollingInterval:60*1000
    })
    if(!task) return <p>Notfound</p> 
    const content = <EditTaskForm task={task}/>
    return content;
}
 
export default EditTask;