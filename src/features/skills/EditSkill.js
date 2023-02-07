import { useParams } from "react-router-dom"
import EditSkillForm from "./EditSkillForm"
import { useGetSkillsQuery } from "./skillsApiSlice"

export default function EditSkill() {
    const {id}=useParams()
        const {skill}=useGetSkillsQuery({filter:{_id:id}},{
        selectFromResult:({data})=>({
            skill:data?.entities[id]
        }),
        pollingInterval:60*1000
    },"skillsList")
    if(!skill) return <p>Notfound</p> 
    const content = <EditSkillForm skill={skill}/>
    return content;
}