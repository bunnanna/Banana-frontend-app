import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteTaskMutation, useUpdateTaskMutation } from "./tasksApiSlice";

const EditTaskForm = ({task}) => {
    



    const [updateTask,{isLoading,isSuccess,isError,error}] =useUpdateTaskMutation()
    const [deleteTask,{isLoading:isDelLoading,isSuccess:isDelSuccess,isError:isDelError,error:delError}] =useDeleteTaskMutation()
    const {id,projectname,taskname,teams,skills,description,checklist,complete} = task

    const navigate = useNavigate()

    const [Teams, setTeams] = useState(teams)
    const [Skills, setSkills] = useState(skills)
    const [CheckLists, setCheckLists] = useState(checklist)
    const projectnameRef = useRef(projectname)
    const tasknameRef = useRef(taskname)
    const descriptionRef = useRef(description)


    useEffect(()=>{
        if(isSuccess||isDelSuccess){
            projectnameRef.current.value=""
            tasknameRef.current.value=""
            descriptionRef.current.value=""
            setTeams([""])
            setSkills([""])
            setCheckLists([{ check: false, subtask: "" }])
            setErrmsg("* Field Required")
            navigate("/main/joblist")
        }
    },[isSuccess,isDelSuccess,navigate])

    // Teams Button Handle 
    const onHandleAddTeams = (e) => {
        e.preventDefault();
        let newTeams = ""
        setTeams([...Teams, newTeams])
    }
    const onHandleChangeTeams = (index, value) => {
        let teams_data = [...Teams]
        teams_data[index] = value
        setTeams(teams_data)
    }

    const onHandleDeleteTeams = (e, index) => {
        e.preventDefault()
        let teams_data = [...Teams]
        teams_data.splice(index, 1)
        if (teams_data?.length === 0) teams_data = [""]
        setTeams(teams_data)
    }

    // Skills Button Handle 
    const onHandleAddSkills = (e) => {
        e.preventDefault();
        let newSkills = ""
        setSkills([...Skills, newSkills])
    }
    const onHandleChangeSkills = (index, value) => {
        let skills_data = [...Skills]
        skills_data[index] = value
        setSkills(skills_data)
    }

    const onHandleDeleteSkills = (e, index) => {
        e.preventDefault()
        let skills_data = [...Skills]
        skills_data.splice(index, 1)
        if (skills_data.length === 0) skills_data = [""]
        setSkills(skills_data)
    }

    // CheckLists Button Handle 
    const onHandleAddCheckLists = (e) => {
        e.preventDefault();
        let newCheckLists = { check: false, subtask: "" }
        setCheckLists([...CheckLists, newCheckLists])
    }
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
        const cansave = !!projectnameRef.current.value?.trim()&&!!tasknameRef.current.value?.trim()&& !isLoading
        if(cansave){
            const NewTask = {
            id,
            projectname:projectnameRef.current.value?.trim(),
            taskname:tasknameRef.current.value?.trim(),
            description:descriptionRef.current.value?.trim(),
            teams:Teams.filter(e=>!!(e?.trim())),
            skills:Skills.filter(e=>!!(e?.trim())),
            checklist:CheckLists.filter(e=>!!(e.subtask?.trim())),
            complete
            }
            await updateTask({...NewTask})
        }else{
            setErrmsg("* Field Required")
        }
    }
    const onDelClicked =async (e)=>{
        e.preventDefault()
        const sureDel = window.confirm("Are you sure")
        if(sureDel && !isDelLoading){
            await deleteTask({id})
        }
    }
   
    useEffect(()=>{setErrmsg(error?.data?.message||delError?.data?.message) },[isError,isDelError,error,delError])

    return (<div>
        <p className={errmsg?"onscreen":"offscreen"}>{errmsg}</p>
        <div className={`task__card`}>
        
        <div>
            <div className="task__project">
                <div className="task__project__layout">
                    <label htmlFor="task__project">Project* :</label>
                    <input id="task__project" className="Text__box" type="text" ref={projectnameRef} defaultValue={projectname}/>

                    <label htmlFor="task__task" className="task__task">Task* :</label>
                    <input id="task__task" className="Text__box" type="text" ref={tasknameRef} defaultValue={taskname}/>
                </div>
            </div>
            <div className="task__description">
                <div>
                    Descrition :
                </div>
                <div>
                    <input type="text" ref={descriptionRef} defaultValue={description}/>
                </div>
            </div>
            <div className="task__checklists">
            <div>
                Checklists :<button onClick={e => onHandleAddCheckLists(e)} className="Add__button">Add</button>
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
                <span>Teams <button onClick={e => onHandleAddTeams(e)} className="Add__button">Add</button></span>
            </div>
            <div className="teams__element">
                {Teams.map((input, index) => {
                    return (
                        <div key={index} className="teams__input">
                            <input
                                type="text"
                                name="Teams"
                                placeholder="Input Teams"
                                value={input}
                                onChange={event => onHandleChangeTeams(index, event.target.value)}
                            />
                            <button onClick={e => onHandleDeleteTeams(e, index)}>X</button>
                        </div>)
                })}

            </div>
        </div>


        <div className="task__skills">
            <div>
            <span>required skill <button onClick={e => onHandleAddSkills(e)} className="Add__button">Add</button></span>    
            </div>
            
            <div className="skills__element">
                {Skills.map((input, index) => {
                    return (
                        <div key={index} className="skills__input">
                            <input
                                type="text"
                                name="Skills"
                                placeholder="Input Skills"
                                value={input}
                                onChange={event => onHandleChangeSkills(index, event.target.value)}
                            />
                            <button onClick={e => onHandleDeleteSkills(e, index)}>X</button>
                        </div>)
                })}
            </div>
        </div>

        
        

        </div>

    </div>
    </div>
    
    
    );
}
 
export default EditTaskForm;