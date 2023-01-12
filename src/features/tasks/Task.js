import { useGetTasksQuery } from "./tasksApiSlice";
import CheckList from "../../components/CheckList"

const Task = ({taskId}) => {
    const {task} = useGetTasksQuery("tasksList",{
        selectFromResult:({data})=>({
            task:data?.entities[taskId]
        })
    })

    if(task){
    
    const {projectname,taskname,teams,skills,description,checklist,complete} = task
    
    return ( <div className={`task__card ${complete?"completed":"uncomplete"}`}>
        <div className="task__project">
            {projectname}
        </div>
        <div className="task__task">
            {taskname}
        </div>
        <div className="task__teams">
            teams : 
            <div className="card__space">
                {teams.map(e=><span key={e}>{e}</span>)}
            </div>
        </div>
        <div className="task__skills">
            required skill :
            <div className="card__space">
                {skills.map(e=><span key={e}>{e}</span>)}
            </div>
        </div>
        <div className="task__description">
            <div>
                Descrition :
            </div>
            <div>
                {description}
            </div>
        </div>
        <div className="task__checklist">
            <div>
                Checklist :
            </div>
            {checklist.map(Clist => <CheckList key={Clist.subtask} Clist={Clist} /> )}
        </div>
    </div> );
    }else return null
}
 
export default Task;