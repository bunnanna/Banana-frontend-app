import CheckList from "./CheckList"

const Task = () => {
    const {projectname,taskname,teams,skills,description,checklist,complete} = {
        _id: "63bcc811e45a86bbdb5f3ea5",
        projectname: "Create Web",
        taskname: "Make task",
        teams: [
            "banana-end"
        ],
        skills: [
            "javascript"
        ],
        description: "To make Job card",
        checklist: [
            {
                "check": false,
                "subtask": "Postman test",
                "_id": "63bcc811e45a86bbdb5f3ea6"
            },
            {
                "check": false,
                "subtask": "Insert Task",
                "_id": "63bcc811e45a86bbdb5f3ea7"
            }
        ],
        complete: false,
        __v: 0
    }
    
    return ( <div className="task__card">
        <div className="task__project">
            {projectname}
        </div>
        <div className="task__task">
            {taskname}
        </div>
        <div className="task__teams">
            {teams.join()}
        </div>
        <div className="task__skills">
            {skills.join()}
        </div>
        <div className="task__description">
            {description}
        </div>
        <div className="task__checklist">
            {checklist.map(Clist => <CheckList key={Clist.subtask} Clist={Clist} /> )}
        </div>
    </div> );
}
 
export default Task;