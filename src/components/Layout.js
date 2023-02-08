import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (<div><Header/>
    <Container className="content">
        <Outlet/>
    </Container>
    </div>);
}
 
export default Layout
