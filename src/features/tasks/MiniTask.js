import { Link } from "react-router-dom";
import { useGetTasksQuery } from "./tasksApiSlice";

const MiniTask = ({taskId}) => {
    const {task} = useGetTasksQuery({filter:{_id:taskId}},{
        selectFromResult:({data})=>({
            task:data?.entities[taskId]
        })
    },"tasksList")

    if(task){
    
    const {project,taskname,teams,skills,complete} = task
    return(<Link to={`/main/joblist/${taskId}`}>
    <div className={`task__card ${complete?"completed":"uncomplete"}`}>
    <div className="task__project">
        {project.projectname}
    </div>
    <div className="task__task">
        {taskname}
    </div>
    <div className="task__teams">
        teams : 
        <div className="card__space">
            {teams.map(e=><span key={e.teamname}>{e.teamname}</span>)}
        </div>
    </div>
    <div className="task__skills">
        required skill :
        <div className="card__space">
            {skills.map(e=><span key={e.skillname}>{e.skillname}</span>)}
        </div>
    </div>
</div>
</Link>
);
}else return null
}

export default MiniTask;