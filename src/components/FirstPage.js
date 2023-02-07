import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const FirstPage = () => {
    return ( 
        <Card>
            <Card.Header>
                First Page
</Card.Header> 
                <Card.Body><Link to="/login">Login</Link></Card.Body>
            
        </Card>
     );
}
 
export default FirstPage;