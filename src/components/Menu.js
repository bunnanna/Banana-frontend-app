import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import useMenu from "../hooks/useMenu";

const Menu = () => {
    const menu = useMenu()
    return (<Card className="menu">
        <Card.Header className="title__menu">Menu</Card.Header>
        <Card.Body className="p-0">
            {menu.map(m=>
            (<Card.Text className="m-0 capitalize" key={m} >
                <Link to={m.replace(/\s+/g, '')} >{`・${m}`}</Link>
            </Card.Text>))}
        </Card.Body></Card>);
}

export default Menu;