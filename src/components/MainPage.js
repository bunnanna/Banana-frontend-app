import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const MainPage = () => {
    return ( <div className="main__content m-2">
        <div className="d-flex justify-content-center"><Menu/></div>
        <div>
            <Outlet/>
            </div>
    </div> );
}
 
export default MainPage;