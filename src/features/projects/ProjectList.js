import { useGetProjectsQuery } from "./projectsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import ProjectCard from "./ProjectCard";
import { Card, Form, Nav } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const ProjectsList = () => {
    // const {pathname} = useLocation()
    // const PROJECTSLIST_REGEX = /^\/main\/projectlist\/?$/
    const [Search, setSearch] = useState("")
    const [SearchReg, setSearchReg] = useState(new RegExp(Search, "i"))
    useEffect(()=>{
        setSearchReg(new RegExp(Search, "i"))
    },[Search])

    const {data:projects,
        isLoading,isError,error
    }=useGetProjectsQuery(null,{
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true})
        
    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (projects){
        const ids = Object.entries(projects?.entities).filter(([ids, data]) => SearchReg.test(data.projectname)).map(ary=>ary[0])
        const projectCardList = ids?.length>0 ?ids?.map(projectId=><ProjectCard key={projectId} projectId={projectId}/>) : "No Project Found"
        content =(<Card>
            <Card.Header>
            <Nav className="p-0 align-items-center justify-content-between">
                <Nav.Item><Form.Control onChange={e=>setSearch(e.target.value)} placeholder="Project Search"/></Nav.Item>
                <Nav.Item> ProjectList</Nav.Item>
                <Nav.Link href="/main/project/new" ><FontAwesomeIcon icon={faFileCirclePlus}/> </Nav.Link>
            </Nav>
            </Card.Header>
            {projectCardList}
            </Card>)
        
    }
    return content

}
export default ProjectsList