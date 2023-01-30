import { useGetTasksQuery, useUpdatecheckTaskMutation} from "./tasksApiSlice";
import { memo, } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

import useDebounce from "../../hooks/useDebounce";

const Task = ({ taskId }) => {
    const { task } = useGetTasksQuery({filter:{_id:taskId}}, {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId]
        })
    },"tasksList")
    const [updatecheckTask] = useUpdatecheckTaskMutation()
    const [CheckLists, setCheckLists] = useState(task?.checklists)
    
    const navigate = useNavigate()
    const debouncedCheckLists = useDebounce(CheckLists, 1000);

    useEffect(() => {
        if(task?.checklists !== debouncedCheckLists){
        // console.log(debouncedCheckLists)
        updatecheckTask({ id: taskId, checklists: debouncedCheckLists });
        }
        // eslint-disable-next-line
    }, [debouncedCheckLists]);

    const onHandleCheckMark = (e, input, index) => {
        e.preventDefault()
        let checkLists_data = [...CheckLists]
        let {check,subtask} = checkLists_data[index]
        check = !input.check
        checkLists_data[index] = {check,subtask}
        setCheckLists(checkLists_data)
    }

    if (task) {
        const { project, taskname, teams, skills, description, activity, complete } = task
        const onHandleEdit = () => navigate(`/main/joblist/${taskId}/edit`)


        
        return (<div className={`task__card ${complete ? "completed" : "uncomplete"}`}>
            <div>
                <div>
                    <div className="task__project">
                        {project.projectname}
                    </div>
                    <div className="task__task">
                        {taskname}
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
                    {CheckLists.map((input, index) => {
                        return (
                            <div key={index} className="task__checklists__element">
                                <button className="check__input" name="check" onClick={e => onHandleCheckMark(e, input, index)} value={input.check}> {input.check ? <span>✔</span> : <span>✕</span>}</button>
                                <span >{input.subtask}</span>
                            </div>)
                    })}
                </div>
            </div>

            <div>
                <div className="task__teams">
                    teams :
                    <div className="card__space">
                        {teams.map(e => <div key={e.teamname}>{e.teamname}</div>)}
                    </div>
                </div>
                <div className="task__skills">
                    required skill :
                    <div className="card__space">
                        {skills.map(e => <div key={e.skillname}>{e.skillname}</div>)}
                    </div>
                </div>
                <div className="edit__button">
                    <button onClick={onHandleEdit}>Edit</button>
                </div>
                <div className="task_activity">
                    {activity.map((e,i)=><div key={`activity ${i}`}>{e.username.username} {e.action}</div>)}
                </div>
            </div>

        </div>

        );
    } else return null
}
const memoTask = memo(Task)
export default memoTask;