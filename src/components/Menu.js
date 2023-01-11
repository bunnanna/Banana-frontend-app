import { Link } from "react-router-dom";

const Menu = () => {
    return ( <>        
    <div className="menu">
       <div className="title__menu">Menu</div>
       <div>
        <Link to="joblist">・JOB List</Link>
       </div>
    </div></> );
}
 
export default Menu;