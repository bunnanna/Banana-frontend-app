import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { useGetProjectsQuery } from "../projects/projectsApiSlice";
import { useGetSkillsQuery } from "../skills/skillsApiSlice";
import { useGetTeamsQuery } from "../teams/teamsApiSlice";
import { useAddNewTaskMutation } from "./tasksApiSlice";

const NewTask = () => {

    const [addNewTask,{isLoading,isSuccess,isError,error}] = useAddNewTaskMutation()

    const navigate = useNavigate()

    const [Teams, setTeams] = useState([""])

    const [CheckLists, setCheckLists] = useState([{ check: false, subtask: "" }])
    const [Projects, setProjects] = useState([""])
    const tasknameRef = useRef("")
    const descriptionRef = useRef("")
    const [Skills, setSkills] = useState([""])
    const {data:skills,isSuccess:isSkillSuccess} = useGetSkillsQuery("skillsList")
    const {data:projects,isSuccess:isProjectSuccess} = useGetProjectsQuery("projectsList")
    const {data:teams,isSuccess:isTeamSuccess} = useGetTeamsQuery("teamsList")



    useEffect(()=>{
        if(isSuccess){
            setProjects("")
            tasknameRef.current.value=""
            descriptionRef.current.value=""
            setTeams([""])
            setSkills([""])
            setCheckLists([{ check: false, subtask: "" }])
            setErrmsg("* Field Required")
            navigate("/main/joblist")
        }
    },[isSuccess,navigate])

    // CheckLists Button Handle 
    
    
    useEffect(()=>{
        const onHandleAddCheckLists = () => {
        let newCheckLists = { check: false, subtask: "" }
        setCheckLists([...CheckLists, newCheckLists])
        }

        if(CheckLists.at(-1)["subtask"]){
            onHandleAddCheckLists()
        }
            
        
    },[CheckLists])

    const onHandleChangeCheckLists = (index, event) => {
        let checkLists_data = [...CheckLists]
        checkLists_data[index]["subtask"] = event.target.value
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
        checkLists_data[index]["check"] = !input.check
        setCheckLists(checkLists_data)
    }

    const [errmsg,setErrmsg] = useState("")

    const onSaveClicked= async (e)=>{
        e.preventDefault()
        const cansave = !!Projects?.trim()&&!!tasknameRef.current.value?.trim()&& !isLoading
        if(cansave){
            const NewTask = {
            project:Projects?.trim(),
            taskname:tasknameRef.current.value?.trim(),
            description:descriptionRef.current.value?.trim(),
            teams:Teams.filter(e=>!!(e?.trim())),
            skills:Skills.filter(e=>!!(e?.trim())),
            checklists:CheckLists.filter(e=>!!(e.subtask?.trim())),
            }
            console.log({...NewTask});
            await addNewTask({...NewTask})
        }else{
            setErrmsg("* Field Required")
        }
    }
   
    useEffect(()=>{setErrmsg(error?.data?.message) },[isError,error])
    let content
    if(isProjectSuccess&&isSkillSuccess&&isTeamSuccess){
        const skillsOption = skills.ids.map(e=>{
            return{value:e,label:skills.entities[e].skillname}
        })
        const projectsOption = projects.ids.map(e=>{
            return{value:e,label:projects.entities[e].projectname}
        })
        const teamsOption = teams.ids.map(e=>{
            return{value:e,label:teams.entities[e].teamname}
        })
    content=(
    <div>
        <p className={errmsg?"onscreen":"offscreen"}>{errmsg}</p>
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
                />  
                    </div>
                    
                    

                    <label htmlFor="task__task" className="task__task">Task* :</label>
                    <input id="task__task" className="Text__box" type="text" ref={tasknameRef} />
                </div>
            </div>
            <div className="task__description">
                <div>
                    Descrition :
                </div>
                <div>
                    <input type="text" className="task__description__input" ref={descriptionRef} />
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
                <button className="save__button" onClick={e=>onSaveClicked(e)}>Save</button>
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
                className="task__teams__dropdown"
                />
                
        </div>


        <div className="task__skills">
            <div>
            <span>required skill</span>    
            </div>
            
            <Select 
                options={skillsOption}
                isMulti
                onChange={e=>setSkills(e.map(ele=>ele.value))}
                className="task__skills__dropdown"
                />
        </div>

        
        

        </div>

    </div>
    </div>
    
    );
                }
    return content

}

export default NewTask;