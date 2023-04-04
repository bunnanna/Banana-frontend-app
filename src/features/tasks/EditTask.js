import { useParams } from "react-router-dom"
import EditTaskForm from "./EditTaskForm"
import { useGetTasksQuery } from "./tasksApiSlice"

const EditTask = () => {
    const {id}=useParams()
        const {task}=useGetTasksQuery({_id:id},{
        selectFromResult:({data})=>({
            task:data?.entities[id]
        }),
        
    },)
    if(!task) return <p>Notfound</p> 
    const content = <EditTaskForm task={task}/>
    return content;
}
 
export default EditTask;