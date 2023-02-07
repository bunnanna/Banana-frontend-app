import { useGetTeamsQuery } from "./teamsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import TeamCard from "./TeamCard";
import { Card, Form, Nav } from "react-bootstrap";
import { useState } from "react";
import { useEffect } from "react";

const TeamsList = () => {
    // const {pathname} = useLocation()
    // const TEAMSLIST_REGEX = /^\/main\/teamlist\/?$/
    const [Search, setSearch] = useState("")
    const [SearchReg, setSearchReg] = useState(new RegExp(Search, "i"))
    useEffect(()=>{
        setSearchReg(new RegExp(Search, "i"))
    },[Search])
    
    const {data:teams,
        isLoading,isError,error
    }=useGetTeamsQuery("teamsList",{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true})

    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (teams){
        const ids = Object.entries(teams?.entities).filter(([ids, data]) => SearchReg.test(data.teamname)).map(ary=>ary[0])
        const teamCardList = ids?.length>0 ? ids?.map(teamId=><TeamCard key={teamId} teamId={teamId}/>) : "No Team Found"
        content =(<Card>
            <Card.Header className="title__menu">
            <Nav className="p-0 align-items-center justify-content-between">
            <Nav.Item><Form.Control onChange={e=>setSearch(e.target.value)} placeholder="Teams Search"/></Nav.Item>
                <Nav.Item> TeamList</Nav.Item>
                <Nav.Link href="/main/team/new" > <FontAwesomeIcon icon={faFileCirclePlus}/> </Nav.Link>
            </Nav>
            </Card.Header>
            {teamCardList}
            </Card>)
        
    }
    return content

}
export default TeamsList