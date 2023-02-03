import { useParams } from "react-router-dom"
import EditProjectForm from "./EditProjectForm"
import { useGetProjectsQuery } from "./projectsApiSlice"

export default function EditProject() {
    const {id}=useParams()
        const {project}=useGetProjectsQuery({filter:{_id:id}},{
        selectFromResult:({data})=>({
            project:data?.entities[id]
        }),
        pollingInterval:60*1000
    },"projectsList")
    if(!project) return <p>Notfound</p> 
    const content = <EditProjectForm project={project}/>
    return content;
}
