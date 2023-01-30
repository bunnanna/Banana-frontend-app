import { memo } from "react";
import { useParams } from "react-router-dom";
import { useGetTasksQuery } from "./tasksApiSlice";
import Task from "./Task";
const TaskComponent = () => {
    
    const {id} =useParams()
    const {task} = useGetTasksQuery({filter:{_id:id}},{
        selectFromResult:({data})=>({
            task:data?.entities[id]
        })
    },"tasksList")

    if(task){
    return <Task key={id} taskId={id}/>
    }else return null

}
const memoTaskComponent = memo(TaskComponent)
export default memoTaskComponent;