import { useParams } from "react-router-dom"
import EditProjectForm from "./EditProjectForm"
import { useGetProjectsQuery } from "./projectsApiSlice"

export default function EditProject() {
    const {id}=useParams()
        const {project}=useGetProjectsQuery({_id:id},{
        selectFromResult:({data})=>({
            project:data?.entities[id]
        })
    })
    if(!project) return <p>Notfound</p> 
    const content = <EditProjectForm project={project}/>
    return content;
}
