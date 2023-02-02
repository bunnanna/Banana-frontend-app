import { useGetProjectsQuery } from "./projectsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./ProjectCard";
import { Card, Nav } from "react-bootstrap";

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
        const projectCardList = ids?.length && ids?.map(projectId=><ProjectCard key={projectId} projectId={projectId}/>)
        content =(<Card>
            <Card.Header className="title__menu">
            <Nav className="p-0 align-items-center justify-content-between">
                <Nav.Item/>
                <Nav.Item> ProjectList</Nav.Item>
                <Nav.Link to="/main/project/new" > <FontAwesomeIcon icon={faFileCirclePlus}/> </Nav.Link>
            </Nav>
            </Card.Header>
            {projectCardList}
            </Card>)
        
    }
    return content

}
export default ProjectsList