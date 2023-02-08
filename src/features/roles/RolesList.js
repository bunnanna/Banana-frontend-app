import { faFileCirclePlus } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useEffect, useState } from "react"
import { Card, Col, Form, Nav, Row } from "react-bootstrap"
import RoleCard from "./RoleCard"
import { useGetRolesQuery } from "./rolesApiSlice"


export default function RolesList() {
    const [Search, setSearch] = useState("")
    const [SearchReg, setSearchReg] = useState(new RegExp(Search, "i"))
    useEffect(()=>{
        setSearchReg(new RegExp(Search, "i"))
    },[Search])

    const {data:roles,
        isLoading,isError,error 
    }=useGetRolesQuery("rolesList",{
        pollingInterval:60*1000,
        refetchOnFocus:true,
        refetchOnMountOrArgChange:true})

    let content
    if(isLoading){content=<p>Loading</p>}
    if(isError){content = <p>Something went wrong {error?.data?.message}</p>}
    if (roles){
        const ids = Object.entries(roles?.entities).filter(([ids, data]) => SearchReg.test(data.rolename)).map(ary=>ary[0])
        const roleCardList = ids?.length>0 ? ids?.map(roleId=><Col><RoleCard key={roleId} roleId={roleId}/></Col>) : "No Role Found"
        content =(<Card>
            <Card.Header>
            <Nav className="p-0 align-items-center justify-content-between">
            <Nav.Item><Form.Control onChange={e=>setSearch(e.target.value)} placeholder="Roles Search"/></Nav.Item>
                <Nav.Item> RoleList</Nav.Item>
                <Nav.Link href="/main/role/new" > <FontAwesomeIcon icon={faFileCirclePlus}/> </Nav.Link>
            </Nav>
            </Card.Header>
            <Row md={2}>
                {roleCardList}
            </Row>
            
            </Card>)
        
    }
    return content

}
