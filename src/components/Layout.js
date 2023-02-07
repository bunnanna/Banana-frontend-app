import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
    return (<><Header/>
    <div className="d-flex justify-content-center align-content-center">
        <Outlet/>
    </div>
    </>);
}
 
export default Layout
