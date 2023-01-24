import { useGetTasksQuery } from "./tasksApiSlice";
import { memo } from "react";
import { useNavigate } from "react-router-dom";

const Task = ({ taskId }) => {
    const { task } = useGetTasksQuery("tasksList", {
        selectFromResult: ({ data }) => ({
            task: data?.entities[taskId]
        })
    })

    const navigate = useNavigate()

    if (task) {

        const { projects, taskname, teams, skills, description, checklists, complete } = task
        const onHandleEdit = () => navigate(`/main/joblist/${taskId}/edit`)
        console.log(task);

        return (<div className={`task__card ${complete ? "completed" : "uncomplete"}`}>
            <div>
                <div>
                    <div className="task__project">
                        {projects}
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
                    {checklists.map((input, index) => {
                        return (
                            <div key={index} className="task__checklists__element">
                                <button className="check__input" name="check" value={input.check}> {input.check ? <span>✔</span> : <span>✕</span>}</button>
                                <span >{input.subtask}</span>
                            </div>)
                    })}
                </div>
            </div>

            <div>
                <div className="task__teams">
                    teams :
                    <div className="card__space">
                        {teams.map(e => <div key={e}>{e}</div>)}
                    </div>
                </div>
                <div className="task__skills">
                    required skill :
                    <div className="card__space">
                        {skills.map(e => <div key={e}>{e}</div>)}
                    </div>
                </div>


                <div className="edit__button">
                    <button onClick={onHandleEdit}>Edit</button>
                </div>
            </div>

        </div>

        );
    } else return null
}
const memoTask = memo(Task)
export default memoTask;