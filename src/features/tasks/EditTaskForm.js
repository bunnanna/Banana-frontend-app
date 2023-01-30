import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useCurrentUser from "../../hooks/useCurrentUser";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "./tasksApiSlice";
import Select from "react-select"
import { useGetSkillsQuery } from "../skills/skillsApiSlice";
import { useGetProjectsQuery } from "../projects/projectsApiSlice";
import { useGetTeamsQuery } from "../teams/teamsApiSlice";
const EditTaskForm = ({ task }) => {

    const {id:userid} = useCurrentUser()

    const [updateTask, { isLoading, isSuccess, isError, error }] = useUpdateTaskMutation()
    const [deleteTask, { isLoading: isDelLoading, isSuccess: isDelSuccess, isError: isDelError, error: delError }] = useDeleteTaskMutation()
    const { id, project, taskname, teams, skills, description, checklists, complete } = task

    const navigate = useNavigate()

    const [CheckLists, setCheckLists] = useState(checklists)
    const [Projects, setProjects] = useState(project._id)
    const tasknameRef = useRef(taskname)
    const descriptionRef = useRef(description)
    const [Skills, setSkills] = useState(skills.map(e=>e._id))
    const [Teams, setTeams] = useState(teams.map(e=>e._id))
    const {data:all_skills,isSuccess:isSkillSuccess} = useGetSkillsQuery("skillsList")
    const {data:all_projects,isSuccess:isProjectSuccess} = useGetProjectsQuery("projectsList")
    const {data:all_teams,isSuccess:isTeamSuccess} = useGetTeamsQuery("teamsList")


    useEffect(() => {
        if (isSuccess || isDelSuccess) {
            setProjects("")
            tasknameRef.current.value = ""
            descriptionRef.current.value = ""
            setTeams([""])
            setSkills([""])
            setCheckLists([{ check: false, subtask: "" }])
            setErrmsg("* Field Required")
            navigate(`/main/joblist/${id}`)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess, isDelSuccess, navigate])

    // CheckLists Button Handle 
    const onHandleChangeCheckLists = (index, event) => {
        let checkLists_data = [...CheckLists]
        let {check,subtask} = checkLists_data[index]
        subtask = event.target.value
        checkLists_data[index]={check,subtask}
        setCheckLists(checkLists_data)
    }

    const onHandleDeleteCheckLists = (e, index) => {
        e.preventDefault()
        let checkLists_data = [...CheckLists]
        checkLists_data.splice(index, 1)
        if (checkLists_data.length === 0) checkLists_data = [{ check: false, subtask: "" }]
        setCheckLists(checkLists_data)
    }

    const onHandleCheckMark = (e, input, index) => {
        e.preventDefault()
        let checkLists_data = [...CheckLists]
        let {check,subtask} = checkLists_data[index]
        check = !input.check
        checkLists_data[index] = {check,subtask}
        setCheckLists(checkLists_data)
    }

    const [errmsg, setErrmsg] = useState("")

    const onSaveClicked = async (e) => {
        e.preventDefault()
        const cansave = !!Projects && !!tasknameRef.current.value?.trim() && !isLoading 
        if (cansave) {
            const UpdateTask = {
                id,
                project: Projects,
                taskname: tasknameRef.current.value?.trim(),
                description: descriptionRef.current.value?.trim(),
                teams: Teams.filter(e => !!(e?.trim())),
                skills: Skills.filter(e => !!(e?.trim())),
                checklists: CheckLists.filter(e => !!(e.subtask?.trim())),
                complete,
                activity:{username:userid,action:`update task `}
            }
            await updateTask({ ...UpdateTask })
        } else {
            setErrmsg("* Field Required")
        }
    }
    const onDelClicked = async (e) => {
        e.preventDefault()
        const sureDel = window.confirm("Are you sure")
        if (sureDel && !isDelLoading) {
            await deleteTask({ id })
        }
    }
    useEffect(()=>{
        const onHandleAddCheckLists = () => {
        let newCheckLists = { check: false, subtask: "" }
        setCheckLists([...CheckLists, newCheckLists])
        }

        if(CheckLists.at(-1)["subtask"]){
            onHandleAddCheckLists()
        }
    },[CheckLists])

    useEffect(() => { setErrmsg(error?.data?.message || delError?.data?.message) }, [isError, isDelError, error, delError])
    let content
    if(isProjectSuccess&&isSkillSuccess&&isTeamSuccess){
        if(isProjectSuccess&&isSkillSuccess&&isTeamSuccess){
            const skillsOption = all_skills.ids.map(e=>{
                return{value:e,label:all_skills.entities[e].skillname}
            })
            const projectsOption = all_projects.ids.map(e=>{
                return{value:e,label:all_projects.entities[e].projectname}
            })
            const teamsOption = all_teams.ids.map(e=>{
                return{value:e,label:all_teams.entities[e].teamname}
            })
            if(!Projects) setProjects(project._id)
    content= (<div>
        <p className={errmsg ? "onscreen" : "offscreen"}>{errmsg}</p>
        <div className={`task__card__edit`}>
            <div>
                <div className="task__project">
                    <div className="task__project__layout">
                    <div>Project* :</div>
                    <div>
                      <Select 
                options={projectsOption}
                onChange={e=>setProjects(e.value)}
                className="dropdown"
                defaultValue={{value:project._id,label:project.projectname}}
                />  
                    </div>

                        <label htmlFor="task__task" className="task__task">Task* :</label>
                        <input id="task__task" className="Text__box" type="text" ref={tasknameRef} defaultValue={taskname} />
                    </div>
                </div>
                <div className="task__description">
                    <div>
                        Descrition :
                    </div>
                    <div>
                        <input type="text" ref={descriptionRef} defaultValue={description} />
                    </div>
                </div>
                <div className="task__checklists">
                    <div>
                        Checklists :
                        <div className="card__space">
                            {CheckLists.map((input, index) => {
                                return (
                                    <div key={index} className="task__checklists__element">
                                        <button className="check__input" name="check" onClick={e => onHandleCheckMark(e, input, index)} value={input.check}> {input.check ? <span>✔</span> : <span>✕</span>}</button>
                                        <input
                                            type="text"
                                            name="subtask"
                                            className="subtask__input"
                                            placeholder="Input CheckLists"
                                            value={input.subtask}
                                            onChange={event => onHandleChangeCheckLists(index, event)}
                                        />
                                        <button onClick={e => onHandleDeleteCheckLists(e, index)}>X</button>
                                    </div>)
                            })}
                        </div>
                    </div>
                    <div>
                        <button className="save__button" onClick={onSaveClicked}>Save</button>
                        <button className="del__button" onClick={onDelClicked}>Delete</button>
                    </div>
                </div>

            </div>
            <div>
            <div className="task__teams">
            <div>
                <span>Teams</span>
            </div>
            <Select 
                options={teamsOption}
                isMulti
                onChange={e=>setTeams(e.map(ele=>ele.value))}
                defaultValue={teams.map(e=>{
                    return {value:e._id,label:e.teamname}
                })}
                className="task__teams__dropdown dropdown"
                />
                
        </div>


        <div className="task__skills">
            <div>
            <span>required skill</span>    
            </div>
            
            <Select 
                options={skillsOption}
                isMulti
                styles={{
                    indicatorsContainer:base=>({
                        ...base,
                        padding:0
                    }),

                }}
                defaultValue={skills.map(e=>{
                    return {value:e._id,label:e.skillname}
                })}
                onChange={e=>setSkills(e.map(ele=>ele.value))}
                className="task__skills__dropdown dropdown"
                />
        </div>




            </div>

        </div>
    </div>


    );}
    return content
}
}

export default EditTaskForm;