import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const Menu = () => {
    return (<Card className="menu">
        <Card.Header className="title__menu">Menu</Card.Header>
        <Card.Body className="p-0">
            <Card.Text className="m-0">
                <Link to="joblist" >・JOB List</Link>
            </Card.Text>
            <Card.Text className="m-0">
                <Link to="project">・Project</Link>
            </Card.Text>
            <Card.Text className="m-0">
                <Link to="team">・Team</Link>
            </Card.Text>
        </Card.Body></Card>);
}

export default Menu;