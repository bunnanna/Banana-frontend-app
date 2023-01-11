import { Link } from "react-router-dom";

const FirstPage = () => {
    return ( 
        <div className="homepage">
            <div className="homepage__text">
                <h1>First Page</h1> 
                <Link to="/login"><h2>Login</h2> </Link>
            </div> 
        </div>
     );
}
 
export default FirstPage;