import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useMenu from "../hooks/useMenu";


export default function MainIndex() {
  let content
const menu = useMenu()
    content = (
    <Card>
    <Card.Header>To</Card.Header>
    <Card.Body>
        <Row md={2}>
            {menu.map(e=>(<Col key={e}>
            <Link to={`${e}`} >
            <Card className="m-2">
                <Card.Header className="d-flex justify-content-center capitalize">{e}</Card.Header>
            </Card></Link>
            </Col>))}
        </Row>
    </Card.Body>
</Card>
  )
  return content
}
