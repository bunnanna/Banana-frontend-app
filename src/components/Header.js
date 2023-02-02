import { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";
import useCurrentUser from "../hooks/useCurrentUser";

const Header = () => {
    const {username}=useCurrentUser()
    const navigate = useNavigate()
    const [sendLogout, {
        isSuccess,
    }] = useSendLogoutMutation()
    
    useEffect(() => {
        if (isSuccess) navigate('/')
    }, [isSuccess, navigate])

    return ( 
        <Container className="m-0 p-0" >
        <Navbar expand="mg" bg="white">
            <Navbar.Brand>
                <Link to="/main"><span>Banana Job Card Apuri</span></Link> 
               </Navbar.Brand> 

        <Nav className="d-flex flex-row ">
            <Nav.Link href="/user" className="mx-2">{username}</Nav.Link>
            <Nav.Item className="mx-2"><Button onClick={sendLogout}>Log Out</Button></Nav.Item>
        </Nav> 
            
        </Navbar>   
    </Container>
     );
}
 
export default Header;