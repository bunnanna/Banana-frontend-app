import { useGetTeamsQuery } from "./teamsApiSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons";
import TeamCard from "./TeamCard";
import { Card, Nav } from "react-bootstrap";

const TeamsList = () => {
    // const {pathname} = useLocation()
    // const TEAMSLIST_REGEX = /^\/main\/teamlist\/?$/

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
        const {ids} = teams
        const teamCardList = ids?.map(teamId=><TeamCard key={teamId} teamId={teamId}/>)
        content =(<Card>
            <Card.Header className="title__menu">
            <Nav className="p-0 align-items-center justify-content-between">
                <Nav.Item/>
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