import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";


export default function MainIndex() {
  let content
const menu = ["joblist","project","team","complete"]
    content = (
    <Card>
    <Card.Header>To</Card.Header>
    <Card.Body>
        <Row md={2}>
            {menu.map(e=>(<Col key={e}>
            <Link to={`${e}`} >
            <Card className="m-2">
                <Card.Header className="d-flex justify-content-center">{e}</Card.Header>
            </Card></Link>
            </Col>))}
        </Row>
    </Card.Body>
</Card>
  )
  return content
}
