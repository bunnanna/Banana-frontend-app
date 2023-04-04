import { useParams } from "react-router-dom"
import EditSkillForm from "./EditSkillForm"
import { useGetSkillsQuery } from "./skillsApiSlice"

export default function EditSkill() {
    const {id}=useParams()
        const {skill}=useGetSkillsQuery({_id:id},{
        selectFromResult:({data})=>({
            skill:data?.entities[id]
        }),
    })
    if(!skill) return <p>Notfound</p> 
    const content = <EditSkillForm skill={skill}/>
    return content;
}