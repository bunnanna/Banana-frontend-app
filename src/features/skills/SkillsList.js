import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect } from "react"
import { useState } from "react"
import { Card, Form, Nav } from "react-bootstrap"
import SkillCard from "./SkillCard"
import { useGetSkillsQuery } from "./skillsApiSlice"


export default function SkillsList() {
    const [Search, setSearch] = useState("")
    const [SearchReg, setSearchReg] = useState(new RegExp(Search, "i"))
    useEffect(()=>{
        setSearchReg(new RegExp(Search, "i"))
    },[Search])

    const {data:skills,
        isLoading,isError,error 
    }=useGetSkillsQuery("skillsList",{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true})

    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (skills){
        const ids = Object.entries(skills?.entities).filter(([ids, data]) => SearchReg.test(data.skillname)).map(ary=>ary[0])
        const skillCardList = ids?.length>0 ? ids?.map(skillId=><SkillCard key={skillId} skillId={skillId}/>)  : "No Skill Found"
        content =(<Card>
            <Card.Header className="title__menu">
            <Nav className="p-0 align-items-center justify-content-between">
            <Nav.Item><Form.Control onChange={e=>setSearch(e.target.value)} placeholder="Skills Search"/></Nav.Item>
                <Nav.Item> SkillList</Nav.Item>
                <Nav.Link href="/main/skill/new" > <FontAwesomeIcon icon={faFileCirclePlus}/> </Nav.Link>
            </Nav>
            </Card.Header>
            {skillCardList}
            </Card>)
        
    }
    return content

}
