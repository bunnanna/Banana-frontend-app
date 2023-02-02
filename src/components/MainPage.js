import { Outlet } from "react-router-dom";
import Menu from "./Menu";

const MainPage = () => {
    return ( <div className="main__content">
        <div className="menu__zone"><Menu/></div>
        <div>
            <Outlet/>
            </div>
    </div> );
}
 
export default MainPage;