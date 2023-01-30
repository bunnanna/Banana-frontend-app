import { useGetProjectsQuery } from "./projectsApiSlice";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./ProjectCard";

const ProjectsList = () => {
    // const {pathname} = useLocation()
    // const PROJECTSLIST_REGEX = /^\/main\/projectlist\/?$/
    const {data:projects,
        isLoading,isSuccess,isError,error
    }=useGetProjectsQuery("projectsList",{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true})
    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (isSuccess){
        const {ids} = projects
        const projectCardList = ids?.length && ids.map(projectId=><ProjectCard key={projectId} projectId={projectId}/>)
        content =(<>
            <div className="title__menu">
                projectList
                <Link to="/main/projectlist/new" > <FontAwesomeIcon icon={faFileCirclePlus}/> </Link>
            </div>
            {projectCardList}
            </>)
        
    }
    return content

}
export default ProjectsList