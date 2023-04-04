import { useParams } from "react-router-dom"
import EditTeamForm from "./EditTeamForm"
import { useGetTeamsQuery } from "./teamsApiSlice"

export default function EditTeam() {
    const {id}=useParams()
        const {team}=useGetTeamsQuery({_id:id},{
        selectFromResult:({data})=>({
            team:data?.entities[id]
        }),
    })
    if(!team) return <p>Notfound</p> 
    const content = <EditTeamForm team={team}/>
    return content;
}
