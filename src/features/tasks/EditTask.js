import { useParams } from "react-router-dom"
import EditTaskForm from "./EditTaskForm"
import { useGetTasksQuery } from "./tasksApiSlice"

const EditTask = () => {
    const {id}=useParams()
        const {task}=useGetTasksQuery({filter:{_id:id}},{
        selectFromResult:({data})=>({
            task:data?.entities[id]
        }),
        pollingInterval:60*1000
    },"tasksList")
    if(!task) return <p>Notfound</p> 
    const content = <EditTaskForm task={task}/>
    return content;
}
 
export default EditTask;